const express = require('express');
const router = express.Router();
const profileRouter = require('./routes/profile');

// Mount profile routes
router.use('/profile', profileRouter);

module.exports = router;
