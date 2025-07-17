import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import PostList from '../components/PostList';
import { fetchPosts } from '../services/postService';

function NewsFeed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        const data = await fetchPosts();
        setPosts(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load posts. Please try again later.');
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 2, maxWidth: '100%', margin: '0 auto' }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#45668e' }}>
        News Feed
      </Typography>
      <PostList posts={posts} onPostUpdate={setPosts} />
    </Box>
  );
}

export default NewsFeed;
