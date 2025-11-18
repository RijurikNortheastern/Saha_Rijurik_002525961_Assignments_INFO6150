const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 5000;
const SECRET_KEY = 'your-secret-key-change-this';

app.use(cors());
app.use(bodyParser.json());

const users = [
  {
    id: 1,
    username: 'admin',
    password: 'admin123',
    email: 'admin@example.com',
    name: 'Admin User',
    type: 'admin'
  },
  {
    id: 2,
    username: 'employee1',
    password: 'emp123',
    email: 'employee1@example.com',
    name: 'John Employee',
    type: 'employee'
  },
  {
    id: 3,
    username: 'employee2',
    password: 'emp123',
    email: 'employee2@example.com',
    name: 'Jane Worker',
    type: 'employee'
  },
  {
    id: 4,
    username: 'manager',
    password: 'admin123',
    email: 'manager@example.com',
    name: 'Manager Admin',
    type: 'admin'
  }
];

let jobs = [
  {
    id: 1,
    companyName: 'Tech Corp',
    jobTitle: 'Senior Developer',
    description: 'Looking for experienced developer with 5+ years experience',
    salary: '$120,000'
  },
  {
    id: 2,
    companyName: 'Marketing Inc',
    jobTitle: 'Digital Marketer',
    description: 'SEO and social media marketing expert needed',
    salary: '$80,000'
  }
];

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

const requireAdmin = (req, res, next) => {
  if (req.user.type !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
};

const requireEmployee = (req, res, next) => {
  if (req.user.type !== 'employee') {
    return res.status(403).json({ message: 'Employee access required' });
  }
  next();
};

const requireEmployeeOrAdmin = (req, res, next) => {
  if (req.user.type !== 'employee' && req.user.type !== 'admin') {
    return res.status(403).json({ message: 'Employee or Admin access required' });
  }
  next();
};

app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  
  console.log('Login attempt:', username);
  
  const user = users.find(u => u.username === username && u.password === password);
  
  if (user) {
    const token = jwt.sign(
      { 
        id: user.id, 
        username: user.username,
        type: user.type
      },
      SECRET_KEY,
      { expiresIn: '24h' }
    );
    
    res.json({
      success: true,
      token: token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        name: user.name,
        type: user.type
      }
    });
  } else {
    res.status(401).json({
      success: false,
      message: 'Invalid username or password'
    });
  }
});

app.post('/api/user/create', authenticateToken, requireAdmin, (req, res) => {
  const { username, password, email, name, type } = req.body;

  if (!['admin', 'employee'].includes(type)) {
    return res.status(400).json({ 
      success: false, 
      message: 'Invalid user type. Must be "admin" or "employee"' 
    });
  }

  const existingUser = users.find(u => u.username === username);
  if (existingUser) {
    return res.status(400).json({ 
      success: false, 
      message: 'Username already exists' 
    });
  }

  const newUser = {
    id: users.length + 1,
    username,
    password,
    email,
    name,
    type
  };

  users.push(newUser);

  res.json({
    success: true,
    message: 'User created successfully',
    user: {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      name: newUser.name,
      type: newUser.type
    }
  });
});

app.get('/api/users', authenticateToken, requireAdmin, (req, res) => {
  const usersWithoutPasswords = users.map(({ password, ...user }) => user);
  res.json(usersWithoutPasswords);
});

app.get('/api/jobs', authenticateToken, requireEmployeeOrAdmin, (req, res) => {
  res.json(jobs);
});

app.post('/api/create/job', authenticateToken, requireAdmin, (req, res) => {
  const { companyName, jobTitle, description, salary } = req.body;

  if (!companyName || !jobTitle || !description || !salary) {
    return res.status(400).json({
      success: false,
      message: 'All fields are required'
    });
  }

  const newJob = {
    id: jobs.length + 1,
    companyName,
    jobTitle,
    description,
    salary
  };

  jobs.push(newJob);

  res.json({
    success: true,
    message: 'Job created successfully',
    job: newJob
  });
});

app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

app.get('/api/companies', authenticateToken, (req, res) => {
  const companies = [
    { 
      id: 1, 
      name: "Tech Innovators Inc.", 
      image: "https://picsum.photos/400/200?random=1", 
      description: "Leading technology solutions provider" 
    },
    { 
      id: 2, 
      name: "Digital Marketing Pro", 
      image: "https://picsum.photos/400/200?random=2", 
      description: "Expert digital marketing agency" 
    },
    { 
      id: 3, 
      name: "Design Studios", 
      image: "https://picsum.photos/400/200?random=3", 
      description: "Creative design and branding" 
    },
    { 
      id: 4, 
      name: "Data Analytics Corp", 
      image: "https://picsum.photos/400/200?random=4", 
      description: "Big data and analytics solutions" 
    },
    { 
      id: 5, 
      name: "Customer First Services", 
      image: "https://picsum.photos/400/200?random=5", 
      description: "Customer service excellence" 
    },
    { 
      id: 6, 
      name: "Project Solutions Ltd", 
      image: "https://picsum.photos/400/200?random=6", 
      description: "Project management consultancy" 
    }
  ];
  
  res.json(companies);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log('\n=== Available Test Users ===');
  console.log('Admin users:');
  console.log('  Username: admin | Password: admin123');
  console.log('  Username: manager | Password: admin123');
  console.log('\nEmployee users:');
  console.log('  Username: employee1 | Password: emp123');
  console.log('  Username: employee2 | Password: emp123');
});