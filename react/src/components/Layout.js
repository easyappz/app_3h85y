import React from 'react';
import { Box, Container } from '@mui/material';
import Header from './Header';
import Sidebar from './Sidebar';
import { useTheme } from '@mui/material/styles';

const Layout = ({ children }) => {
  const theme = useTheme();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <Header />
      <Box sx={{ display: 'flex', flexGrow: 1, mt: 8 }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 2, ml: { xs: 0, md: 30 }, backgroundColor: '#fff', borderRadius: 1, boxShadow: theme.shadows[1] }}>
          <Container maxWidth="lg">
            {children}
          </Container>
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
