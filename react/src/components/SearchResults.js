import React from 'react';
import { Box, Typography, CircularProgress, List, ListItem, ListItemAvatar, ListItemText, Avatar, Divider, Paper } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

function SearchResults({ results, loading, error, onProfileClick }) {
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ py: 5, textAlign: 'center' }}>
        <Typography variant="body1" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  if (results.length === 0) {
    return (
      <Box sx={{ py: 5, textAlign: 'center' }}>
        <Typography variant="body1" color="text.secondary">
          No results found. Try a different search.
        </Typography>
      </Box>
    );
  }

  return (
    <Paper elevation={1} sx={{ borderRadius: 1, overflow: 'hidden', border: '1px solid #e0e0e0' }}>
      <List>
        {results.map((user, index) => (
          <React.Fragment key={user.id}>
            <ListItem
              onClick={() => onProfileClick(user.id)}
              sx={{
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: '#f5f5f5',
                },
              }}
            >
              <ListItemAvatar>
                <Avatar
                  src={user.avatar || ''}
                  sx={{ width: 50, height: 50, mr: 2, border: '1px solid #e0e0e0' }}
                >
                  {!user.avatar && <PersonIcon sx={{ color: '#5181b8' }} />}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={`${user.firstName} ${user.lastName}`}
                secondary={user.status || 'Online'}
                primaryTypographyProps={{
                  fontWeight: '500',
                  color: '#2a5885',
                  fontSize: '16px',
                }}
                secondaryTypographyProps={{
                  color: user.status === 'Online' ? '#4bb34b' : '#888',
                  fontSize: '14px',
                }}
              />
            </ListItem>
            {index < results.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </Paper>
  );
}

export default SearchResults;
