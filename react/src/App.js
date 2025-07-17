import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, loginFailure } from './store/authSlice';
import { getCurrentUser } from './api/authApi';
import Layout from './components/Layout';
import NewsFeed from './pages/NewsFeed';
import Messages from './pages/Messages';
import Dialogs from './pages/Dialogs';
import Search from './pages/Search';
import Settings from './pages/Settings';
import ProfileSettings from './pages/ProfileSettings';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const data = await getCurrentUser(token);
          if (data.success) {
            dispatch(setUser(data.user));
          } else {
            dispatch(loginFailure('Token expired or invalid'));
          }
        } catch (error) {
          dispatch(loginFailure(error.message));
        }
      }
    };
    fetchUser();
  }, [token, dispatch]);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<NewsFeed />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/dialogs" element={<Dialogs />} />
        <Route path="/search" element={<Search />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile-settings" element={<ProfileSettings />} />
      </Route>
    </Routes>
  );
}

export default App;