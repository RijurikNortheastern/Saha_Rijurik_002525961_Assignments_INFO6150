const User = require('../models/User');
const bcrypt = require('bcrypt');
const fs = require('fs').promises;
const path = require('path');

// Create a new user
const createUser = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    // Create new user
    const user = new User({
      fullName,
      email,
      password
    });

    await user.save();
    res.status(201).json({ message: 'User created successfully.' });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update user details
const updateUser = async (req, res) => {
  try {
    const { email, fullName, password } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required to update user' });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Update fields
    if (fullName) user.fullName = fullName;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();
    res.status(200).json({ message: 'User updated successfully.' });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Delete associated image if exists
    if (user.imagePath) {
      const imagePath = path.join(__dirname, '../../', user.imagePath);
      try {
        await fs.unlink(imagePath);
      } catch (err) {
        console.error('Error deleting image:', err);
      }
    }

    await User.deleteOne({ email });
    res.status(200).json({ message: 'User deleted successfully.' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, 'fullName email password');

    const formattedUsers = users.map(user => ({
      fullName: user.fullName,
      email: user.email,
      password: user.password // This will be the hashed password
    }));

    res.status(200).json({ users: formattedUsers });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Upload image
const uploadImage = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      // Delete uploaded file if email not provided
      if (req.file) {
        await fs.unlink(req.file.path);
      }
      return res.status(400).json({ error: 'Email is required' });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'Image file is required' });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      // Delete uploaded file if user not found
      await fs.unlink(req.file.path);
      return res.status(404).json({ error: 'User not found.' });
    }

    // Check if user already has an image
    if (user.imagePath) {
      // Delete the newly uploaded file
      await fs.unlink(req.file.path);
      return res.status(400).json({ error: 'Image already exists for this user.' });
    }

    // Save image path to user
    user.imagePath = `/images/${req.file.filename}`;
    await user.save();

    res.status(201).json({
      message: 'Image uploaded successfully.',
      filePath: user.imagePath
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    // Clean up uploaded file on error
    if (req.file) {
      try {
        await fs.unlink(req.file.path);
      } catch (err) {
        console.error('Error deleting file:', err);
      }
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};
// Authenticate user (login)
const authenticateUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Compare password
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Authentication successful
    res.status(200).json({
      message: 'Authentication successful',
      user: {
        fullName: user.fullName,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Error authenticating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getAllUsers,
  uploadImage,
  authenticateUser
};