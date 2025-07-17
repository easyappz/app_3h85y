const express = require('express');
const router = express.Router();
const profileRouter = require('./routes/profile');
const dialogsRouter = require('./routes/dialogs');
const searchRouter = require('./routes/search');
const authRouter = require('./routes/auth');

// Mount auth routes
router.use('/auth', authRouter);

// Mount profile routes
router.use('/profile', profileRouter);

// Mount dialogs routes
router.use('/dialogs', dialogsRouter);

// Mount search routes
router.use('/search', searchRouter);

module.exports = router;