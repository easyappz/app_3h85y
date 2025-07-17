import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, CircularProgress, IconButton, Snackbar, Alert } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';

const AvatarUpload = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      handleUpload(selectedFile);
    }
  };

  const handleUpload = async (selectedFile) => {
    setUploading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append('avatar', selectedFile);
      const response = await axios.post('/api/profile/avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        setSuccess(true);
        onUploadSuccess(response.data.data.avatarUrl);
        setFile(null);
      } else {
        setError('Failed to upload avatar');
      }
    } catch (err) {
      setError('An error occurred while uploading avatar');
    } finally {
      setUploading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setError(null);
    setSuccess(false);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
      <input
        accept="image/*"
        style={{ display: 'none' }}
        id="avatar-upload"
        type="file"
        onChange={handleFileChange}
      />
      <label htmlFor="avatar-upload">
        <Button
          variant="contained"
          component="span"
          startIcon={<PhotoCamera />}
          disabled={uploading}
          sx={{ backgroundColor: '#5181b8', '&:hover': { backgroundColor: '#45668e' } }}
        >
          {uploading ? <CircularProgress size={24} /> : 'Upload Avatar'}
        </Button>
      </label>

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
            Avatar uploaded successfully!
          </Alert>
        )}
      </Snackbar>
    </Box>
  );
};

export default AvatarUpload;
