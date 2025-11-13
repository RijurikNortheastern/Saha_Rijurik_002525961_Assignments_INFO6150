const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 5000;
const SECRET_KEY = 'your-secret-key-change-this';

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Mock user database
const users = [
  {
    id: 1,
    username: 'testuser',
    password: 'password123',
    email: 'test@example.com'
  },
  {
    id: 2,
    username: 'admin',
    password: 'admin123',
    email: 'admin@example.com'
  }
];

// Login endpoint
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  
  console.log('Login attempt:', username);
  
  const user = users.find(u => u.username === username && u.password === password);
  
  if (user) {
    const token = jwt.sign(
      { id: user.id, username: user.username },
      SECRET_KEY,
      { expiresIn: '24h' }
    );
    
    res.json({
      success: true,
      token: token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    });
  } else {
    res.status(401).json({
      success: false,
      message: 'Invalid username or password'
    });
  }
});

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

// Company images endpoint
app.get('/api/companies', (req, res) => {
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
  console.log(`Test the API at http://localhost:${PORT}/api/test`);
});