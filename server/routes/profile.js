const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const User = require('../models/User');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/avatars/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Get user profile
router.get('/', async (req, res) => {
  try {
    // Mock user data or fetch from DB based on authentication
    const user = await User.findOne(); // Replace with actual user ID from auth
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Update user profile
router.put('/', async (req, res) => {
  try {
    const { firstName, lastName, email, bio, avatar } = req.body;
    const user = await User.findOneAndUpdate(
      {}, // Replace with actual user ID from auth
      { firstName, lastName, email, bio, avatar },
      { new: true, upsert: true }
    );
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Upload avatar
router.post('/avatar', upload.single('avatar'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }
    const avatarUrl = `/uploads/avatars/${req.file.filename}`;
    const user = await User.findOneAndUpdate(
      {}, // Replace with actual user ID from auth
      { avatar: avatarUrl },
      { new: true, upsert: true }
    );
    res.json({ success: true, data: { avatarUrl } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
