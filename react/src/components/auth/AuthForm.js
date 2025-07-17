import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginRequest, loginSuccess, loginFailure } from '../../store/authSlice';
import { login, register } from '../../api/authApi';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography, Paper, Divider } from '@mui/material';

const AuthForm = ({ mode = 'login' }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginRequest());

    try {
      if (mode === 'login') {
        const data = await login({ email, password });
        if (data.success) {
          dispatch(loginSuccess({ user: data.user, token: data.token }));
          navigate('/');
        } else {
          dispatch(loginFailure(data.message));
        }
      } else {
        const data = await register({ email, password, firstName, lastName });
        if (data.success) {
          dispatch(loginSuccess({ user: data.user, token: data.token }));
          navigate('/');
        } else {
          dispatch(loginFailure(data.message));
        }
      }
    } catch (error) {
      dispatch(loginFailure(error.message));
    }
  };

  const toggleMode = () => {
    navigate(mode === 'login' ? '/register' : '/login');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#e9eef2'
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: '100%',
          maxWidth: 400,
          padding: 3,
          borderRadius: 2,
          backgroundColor: '#fff',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}
      >
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          sx={{ color: '#007bff', fontWeight: 'bold' }}
        >
          {mode === 'login' ? 'ВКонтакте' : 'Регистрация ВКонтакте'}
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          {mode === 'register' && (
            <>
              <TextField
                fullWidth
                margin="normal"
                label="Имя"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 1 } }}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Фамилия"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 1 } }}
              />
            </>
          )}
          <TextField
            fullWidth
            margin="normal"
            label="Электронная почта"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 1 } }}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Пароль"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 1 } }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            sx={{
              mt: 2,
              backgroundColor: '#007bff',
              textTransform: 'none',
              fontSize: 16,
              padding: '10px 0',
              borderRadius: 1,
              '&:hover': { backgroundColor: '#0069d9' }
            }}
          >
            {mode === 'login' ? 'Войти' : 'Зарегистрироваться'}
          </Button>
        </Box>

        <Divider sx={{ my: 2 }} />
        <Button
          fullWidth
          variant="text"
          onClick={toggleMode}
          sx={{
            textTransform: 'none',
            color: '#007bff',
            '&:hover': { backgroundColor: 'rgba(0, 123, 255, 0.05)' }
          }}
        >
          {mode === 'login' ? 'Зарегистрироваться' : 'Уже есть аккаунт? Войти'}
        </Button>
      </Paper>
    </Box>
  );
};

export default AuthForm;