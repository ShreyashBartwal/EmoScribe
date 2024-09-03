const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth'); // Importing the auth middleware

const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ msg: 'Please fill in all fields' });
    }

    // Check for existing user
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Create new user
    user = new User({
      name,
      email,
      password,
    });

    // Hash password with salt
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save user to database
    await user.save();

    // Prepare response data
    const payload = { id: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'your_jwt_secret', { expiresIn: '1h' });

    res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (err) {
    console.error('Detailed Error:', err); // Log the full error object

    // Handle specific errors (optional)
    if (err.code === 11000) { // Handle Mongo duplicate key error
      return res.status(400).json({ msg: 'Email already exists' });
    }

    res.status(500).send('Server error'); // More informative message
  }
});


// User login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Compare password hashes
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Prepare response data
    const payload = { id: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'your_jwt_secret', { expiresIn: '1h' });

    res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (err) {
    console.error(err.message); // Log detailed error message
    res.status(500).send('Server error'); // More informative message
  }
});

// Protected route: Get user profile
router.get('/profile', auth, async (req, res) => {
  try {
    // Find user by ID (assuming auth middleware sets req.user)
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ msg: 'User not found' }); // Handle missing user
    }

    res.json(user);
  } catch (err) {
    console.error(err.message); // Log detailed error message
    res.status(500).send('Server error'); // More informative message
  }
});

module.exports = router;
