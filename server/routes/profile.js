const express = require('express');
const router = express.Router();
const UserProfile = require('../models/UserProfile');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, '../uploads/avatars');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

// Update user profile data
router.put('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { firstName, lastName, description } = req.body;

    let profile = await UserProfile.findOne({ userId });

    if (!profile) {
      profile = new UserProfile({
        userId,
        firstName: firstName || '',
        lastName: lastName || '',
        description: description || '',
      });
    } else {
      if (firstName !== undefined) profile.firstName = firstName;
      if (lastName !== undefined) profile.lastName = lastName;
      if (description !== undefined) profile.description = description;
    }

    await profile.save();
    res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

// Upload user avatar
router.post('/:userId/avatar', upload.single('avatar'), async (req, res) => {
  try {
    const { userId } = req.params;
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded',
      });
    }

    let profile = await UserProfile.findOne({ userId });

    if (!profile) {
      profile = new UserProfile({
        userId,
        avatarUrl: `/uploads/avatars/${req.file.filename}`,
      });
    } else {
      // Delete old avatar if exists
      if (profile.avatarUrl) {
        const oldAvatarPath = path.join(__dirname, '../', profile.avatarUrl);
        if (fs.existsSync(oldAvatarPath)) {
          fs.unlinkSync(oldAvatarPath);
        }
      }
      profile.avatarUrl = `/uploads/avatars/${req.file.filename}`;
    }

    await profile.save();
    res.status(200).json({
      success: true,
      data: {
        avatarUrl: profile.avatarUrl,
      },
    });
  } catch (error) {
    console.error('Error uploading avatar:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

// Get user profile by ID
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const profile = await UserProfile.findOne({ userId });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found',
      });
    }

    res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

module.exports = router;
