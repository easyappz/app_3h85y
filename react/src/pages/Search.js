import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography } from '@mui/material';
import SearchBar from '../components/SearchBar';
import SearchResults from '../components/SearchResults';
import { searchUsers } from '../services/api';

function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResults = async () => {
      if (searchQuery.trim() === '') {
        setResults([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const data = await searchUsers(searchQuery);
        setResults(data);
      } catch (err) {
        setError('Failed to load search results. Please try again.');
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [searchQuery]);

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const handleProfileClick = (userId) => {
    navigate(`/profile/${userId}`);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 3 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Search
        </Typography>
        <SearchBar
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search for people..."
        />
      </Box>
      <SearchResults
        results={results}
        loading={loading}
        error={error}
        onProfileClick={handleProfileClick}
      />
    </Container>
  );
}

export default Search;
