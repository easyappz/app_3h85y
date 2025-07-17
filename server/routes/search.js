const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Search users by query (firstName or lastName)
router.get('/', async (req, res) => {
  try {
    const query = req.query.query || '';
    if (!query) {
      return res.status(400).json({ message: 'Query parameter is required' });
    }

    // Simple search by splitting query into parts to match firstName or lastName
    const queryParts = query.split(' ');
    let searchConditions = [];

    if (queryParts.length > 1) {
      searchConditions.push({
        $and: [
          { firstName: { $eq: queryParts[0] } },
          { lastName: { $eq: queryParts[1] } },
        ],
      });
    } else {
      searchConditions.push({ firstName: { $eq: query } });
      searchConditions.push({ lastName: { $eq: query } });
    }

    const users = await User.find({
      $or: searchConditions,
    }).limit(10);

    res.json(users);
  } catch (error) {
    console.error('Error searching users:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
