import React from 'react';
import { Box, Typography, Paper, Divider } from '@mui/material';

const NewsFeed = () => {
  return (
    <Box sx={{ py: 2 }}>
      <Typography variant="h5" gutterBottom>
        News Feed
      </Typography>
      <Divider sx={{ my: 2 }} />
      {[1, 2, 3].map((post) => (
        <Paper key={post} sx={{ p: 2, mb: 2, borderRadius: 1, boxShadow: 1 }}>
          <Typography variant="h6">Post {post}</Typography>
          <Typography variant="body1" color="text.secondary">
            This is a placeholder for a post content in the news feed.
          </Typography>
        </Paper>
      ))}
    </Box>
  );
};

export default NewsFeed;
