const express = require('express');
const router = express.Router();
const profileRouter = require('./routes/profile');
const dialogsRouter = require('./routes/dialogs');

// Mount profile routes
router.use('/profile', profileRouter);

// Mount dialogs routes
router.use('/dialogs', dialogsRouter);

module.exports = router;
