import React from 'react';
import { Box, Typography, Divider, TextField, Button, List, ListItem, ListItemText, Paper } from '@mui/material';

const Search = () => {
  return (
    <Box sx={{ py: 2 }}>
      <Typography variant="h5" gutterBottom>
        Find Friends
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField placeholder="Enter name..." variant="outlined" fullWidth size="small" />
        <Button variant="contained" sx={{ backgroundColor: '#4682b4' }}>
          Search
        </Button>
      </Box>
      <Paper sx={{ p: 2, borderRadius: 1, boxShadow: 1 }}>
        <List>
          {[1, 2, 3].map((user) => (
            <ListItem key={user} divider>
              <ListItemText primary={`User ${user}`} secondary="City, Country" />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default Search;
