import React from 'react';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function SearchBar({ value, onChange, placeholder }) {
  return (
    <TextField
      fullWidth
      variant="outlined"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      sx={{
        backgroundColor: '#fff',
        borderRadius: 1,
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: '#e0e0e0',
          },
          '&:hover fieldset': {
            borderColor: '#b0b0b0',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#5181b8',
          },
        },
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon sx={{ color: '#5181b8' }} />
          </InputAdornment>
        ),
        style: {
          padding: '10px 14px',
          fontSize: '16px',
        },
      }}
    />
  );
}

export default SearchBar;
