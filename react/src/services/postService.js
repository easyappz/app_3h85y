import axios from 'axios';

// Set base URL for API requests
const API_URL = '/';

// Fetch all posts
export const fetchPosts = async () => {
  try {
    const response = await axios.get(`${API_URL}api/posts`);
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

// Like a post
export const likePost = async (postId) => {
  try {
    const response = await axios.post(`${API_URL}api/posts/${postId}/like`);
    return response.data;
  } catch (error) {
    console.error('Error liking post:', error);
    throw error;
  }
};

// Add a comment to a post
export const addComment = async (postId, text) => {
  try {
    const response = await axios.post(`${API_URL}api/posts/${postId}/comment`, { text });
    return response.data;
  } catch (error) {
    console.error('Error adding comment:', error);
    throw error;
  }
};
