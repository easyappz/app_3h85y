const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Mock data (replace with real MongoDB models in production)
const dialogs = [
  { id: '1', user: { name: 'John Doe', avatar: '/uploads/john.jpg' }, lastMessage: { content: 'Hey, how are you?', timestamp: '10:30' }, unreadCount: 2 },
  { id: '2', user: { name: 'Jane Smith', avatar: '/uploads/jane.jpg' }, lastMessage: { content: 'See you tomorrow!', timestamp: '09:15' }, unreadCount: 0 },
];

const messages = {
  '1': [
    { id: 'm1', content: 'Hey, how are you?', timestamp: '10:30', isSentByMe: false },
    { id: 'm2', content: 'I am fine, thanks!', timestamp: '10:32', isSentByMe: true },
  ],
  '2': [
    { id: 'm3', content: 'See you tomorrow!', timestamp: '09:15', isSentByMe: false },
  ],
};

// Get all dialogs
router.get('/', (req, res) => {
  res.json(dialogs);
});

// Get messages for a specific dialog
router.get('/:dialogId/messages', (req, res) => {
  const { dialogId } = req.params;
  const dialogMessages = messages[dialogId] || [];
  res.json(dialogMessages);
});

// Send a message in a specific dialog
router.post('/:dialogId/messages', (req, res) => {
  const { dialogId } = req.params;
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ success: false, message: 'Message content is required' });
  }

  const newMessage = {
    id: `m${Date.now()}`,
    content,
    timestamp: new Date().toLocaleTimeString().slice(0, 5),
    isSentByMe: true,
  };

  if (!messages[dialogId]) {
    messages[dialogId] = [];
  }
  messages[dialogId].push(newMessage);

  // Update last message in dialogs
  const dialogIndex = dialogs.findIndex((d) => d.id === dialogId);
  if (dialogIndex !== -1) {
    dialogs[dialogIndex].lastMessage = newMessage;
  }

  res.json(newMessage);
});

module.exports = router;
