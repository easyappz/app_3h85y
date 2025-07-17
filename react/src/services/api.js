import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const searchUsers = async (query) => {
  try {
    const response = await apiClient.get(`/api/search?query=${encodeURIComponent(query)}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to search users');
  }
};
