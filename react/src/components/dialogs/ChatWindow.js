import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Avatar,
  Divider,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const ChatWindow = ({ messages, selectedDialog, onSendMessage }) => {
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && message.trim()) {
      handleSend();
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Chat Header */}
      <Box sx={{ padding: 2, borderBottom: '1px solid #e0e0e0', backgroundColor: '#fff' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          {selectedDialog.user.name}
        </Typography>
      </Box>

      {/* Messages Area */}
      <Box
        sx={{
          flex: 1,
          padding: 2,
          overflowY: 'auto',
          backgroundColor: '#fff',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {messages.length === 0 ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <Typography sx={{ color: '#888' }}>No messages yet</Typography>
          </Box>
        ) : (
          messages.map((msg) => (
            <Box
              key={msg.id}
              sx={{
                marginBottom: 2,
                display: 'flex',
                flexDirection: msg.isSentByMe ? 'row-reverse' : 'row',
                alignItems: 'flex-start',
              }}
            >
              <Avatar
                src={msg.isSentByMe ? '' : selectedDialog.user.avatar}
                alt={msg.isSentByMe ? 'Me' : selectedDialog.user.name}
                sx={{ marginRight: msg.isSentByMe ? 0 : 1, marginLeft: msg.isSentByMe ? 1 : 0 }}
              />
              <Box
                sx={{
                  maxWidth: '70%',
                  padding: 1.5,
                  borderRadius: 2,
                  backgroundColor: msg.isSentByMe ? '#5181b8' : '#f0f2f5',
                  color: msg.isSentByMe ? '#fff' : '#000',
                }}
              >
                <Typography variant="body2">{msg.content}</Typography>
                <Typography
                  variant="caption"
                  sx={{ display: 'block', marginTop: 0.5, opacity: 0.7 }}
                >
                  {msg.timestamp}
                </Typography>
              </Box>
            </Box>
          ))
        )}
        <div ref={messagesEndRef} />
      </Box>

      {/* Message Input */}
      <Divider />
      <Box sx={{ padding: 2, backgroundColor: '#fff' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <TextField
            placeholder="Write a message..."
            variant="standard"
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            InputProps={{ disableUnderline: true }}
            sx={{ marginRight: 1 }}
          />
          <IconButton onClick={handleSend} disabled={!message.trim()} color="primary">
            <SendIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatWindow;
