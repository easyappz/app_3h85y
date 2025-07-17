import React from 'react';
import { Box, Typography, Divider, List, ListItem, ListItemText, Paper } from '@mui/material';

const Messages = () => {
  return (
    <Box sx={{ py: 2 }}>
      <Typography variant="h5" gutterBottom>
        Messages
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Paper sx={{ p: 2, borderRadius: 1, boxShadow: 1 }}>
        <List>
          {[1, 2, 3].map((msg) => (
            <ListItem key={msg} divider>
              <ListItemText primary={`User ${msg}`} secondary="Hey, how are you?" />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default Messages;
