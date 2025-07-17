import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Divider, 
  Avatar, 
  CircularProgress, 
  Paper, 
  IconButton, 
  Snackbar, 
  Alert 
} from '@mui/material';
import { PhotoCamera, Save, Cancel } from '@mui/icons-material';
import AvatarUpload from '../components/AvatarUpload';

const ProfileSettings = () => {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    bio: '',
    avatar: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/profile');
        if (response.data.success) {
          setUserData(response.data.data);
        } else {
          setError('Failed to load profile data');
        }
      } catch (err) {
        setError('An error occurred while loading profile data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      const response = await axios.put('/api/profile', userData);
      if (response.data.success) {
        setSuccess(true);
        setTimeout(() => navigate('/'), 2000);
      } else {
        setError('Failed to save profile data');
      }
    } catch (err) {
      setError('An error occurred while saving profile data');
    } finally {
      setSaving(false);
    }
  };

  const handleAvatarUpdate = (newAvatarUrl) => {
    setUserData((prev) => ({ ...prev, avatar: newAvatarUrl }));
  };

  const handleCloseSnackbar = () => {
    setError(null);
    setSuccess(false);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 850, margin: '0 auto', padding: 2, backgroundColor: '#fff', borderRadius: 2, boxShadow: 1 }}>
      <Typography variant="h5" gutterBottom sx={{ color: '#45668e', fontWeight: 'bold' }}>
        Edit Profile
      </Typography>
      <Divider sx={{ my: 2 }} />

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <Avatar src={userData.avatar} alt="Profile Avatar" sx={{ width: 100, height: 100, border: '2px solid #e0e0e0' }} />
          <AvatarUpload onUploadSuccess={handleAvatarUpdate} />
        </Box>

        <Paper elevation={0} sx={{ p: 3, border: '1px solid #e0e0e0', borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom sx={{ color: '#45668e' }}>
            Basic Information
          </Typography>
          <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              label="First Name"
              name="firstName"
              value={userData.firstName}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
              size="small"
              sx={{ backgroundColor: '#f9f9f9' }}
            />
            <TextField
              label="Last Name"
              name="lastName"
              value={userData.lastName}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
              size="small"
              sx={{ backgroundColor: '#f9f9f9' }}
            />
            <TextField
              label="Email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
              size="small"
              sx={{ backgroundColor: '#f9f9f9' }}
            />
            <TextField
              label="Bio"
              name="bio"
              value={userData.bio}
              onChange={handleInputChange}
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              size="small"
              sx={{ backgroundColor: '#f9f9f9' }}
            />
          </Box>
        </Paper>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<Cancel />}
            onClick={() => navigate('/')}
            disabled={saving}
            sx={{ borderColor: '#e0e0e0', color: '#45668e' }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Save />}
            onClick={handleSave}
            disabled={saving}
            sx={{ backgroundColor: '#5181b8', '&:hover': { backgroundColor: '#45668e' } }}
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </Box>
      </Box>

      <Snackbar
        open={!!error || success}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        {error ? (
          <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        ) : (
          <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
            Profile updated successfully!
          </Alert>
        )}
      </Snackbar>
    </Box>
  );
};

export default ProfileSettings;
