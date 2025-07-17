import React from 'react';
import { List, ListItem, ListItemText, ListItemAvatar, Avatar, Typography, Box } from '@mui/material';

const DialogList = ({ dialogs, selectedDialog, onSelectDialog }) => {
  return (
    <Box sx={{ padding: 0, backgroundColor: '#fff' }}>
      <Typography variant="h6" sx={{ padding: 2, fontWeight: 'bold', borderBottom: '1px solid #e0e0e0' }}>
        Messages
      </Typography>
      <List sx={{ padding: 0 }}>
        {dialogs.length === 0 ? (
          <Box sx={{ padding: 2, textAlign: 'center', color: '#888' }}>
            No dialogs found
          </Box>
        ) : (
          dialogs.map((dialog) => (
            <ListItem
              key={dialog.id}
              onClick={() => onSelectDialog(dialog)}
              selected={selectedDialog && selectedDialog.id === dialog.id}
              sx={{
                padding: 2,
                borderBottom: '1px solid #e0e0e0',
                backgroundColor: selectedDialog && selectedDialog.id === dialog.id ? '#f0f2f5' : 'transparent',
                '&:hover': {
                  backgroundColor: '#f0f2f5',
                  cursor: 'pointer',
                },
              }}
            >
              <ListItemAvatar>
                <Avatar src={dialog.user.avatar} alt={dialog.user.name} />
              </ListItemAvatar>
              <ListItemText
                primary={<Typography sx={{ fontWeight: 'bold' }}>{dialog.user.name}</Typography>}
                secondary={dialog.lastMessage ? dialog.lastMessage.content : 'No messages yet'}
                sx={{ marginLeft: 1 }}
              />
              {dialog.unreadCount > 0 && (
                <Box
                  sx={{
                    backgroundColor: '#5181b8',
                    color: '#fff',
                    borderRadius: 1,
                    padding: '0px 6px',
                    fontSize: '0.75rem',
                    marginLeft: 'auto',
                  }}
                >
                  {dialog.unreadCount}
                </Box>
              )}
            </ListItem>
          ))
        )}
      </List>
    </Box>
  );
};

export default DialogList;
