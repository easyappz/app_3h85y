import React from 'react';
import { Box } from '@mui/material';
import PostItem from './PostItem';

function PostList({ posts, onPostUpdate }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 2 }}>
      {posts.length > 0 ? (
        posts.map((post) => (
          <PostItem key={post._id} post={post} onPostUpdate={onPostUpdate} />
        ))
      ) : (
        <Box sx={{ textAlign: 'center', padding: 2 }}>
          No posts available.
        </Box>
      )}
    </Box>
  );
}

export default PostList;
