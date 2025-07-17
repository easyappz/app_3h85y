import React from 'react';
import { Box, Typography, Divider, TextField, Button, Paper } from '@mui/material';

const Settings = () => {
  return (
    <Box sx={{ py: 2 }}>
      <Typography variant="h5" gutterBottom>
        Profile Settings
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Paper sx={{ p: 3, borderRadius: 1, boxShadow: 1 }}>
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField label="Name" variant="outlined" fullWidth />
          <TextField label="Email" variant="outlined" fullWidth />
          <TextField label="Bio" variant="outlined" multiline rows={4} fullWidth />
          <Button variant="contained" sx={{ alignSelf: 'flex-start', backgroundColor: '#4682b4' }}>
            Save Changes
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Settings;
