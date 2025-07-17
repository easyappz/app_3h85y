const express = require('express');
const router = express.Router();
const authController = require('./controllers/authController');
const userController = require('./controllers/userController');
const postController = require('./controllers/postController');
const messageController = require('./controllers/messageController');
const authMiddleware = require('./middleware/authMiddleware');

// Auth Routes
router.post('/register', authController.register);
router.post('/login', authController.login);

// User Routes
router.get('/users/search', authMiddleware, userController.searchUsers);
router.get('/users/:userId', authMiddleware, userController.getUserProfile);

// Post Routes
router.post('/posts', authMiddleware, postController.createPost);
router.get('/posts/feed', authMiddleware, postController.getFeed);
router.post('/posts/:postId/like', authMiddleware, postController.likePost);

// Message Routes
router.post('/messages', authMiddleware, messageController.sendMessage);
router.get('/messages/:userId', authMiddleware, messageController.getMessages);

module.exports = router;
