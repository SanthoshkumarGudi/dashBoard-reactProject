import React from 'react';
import { Container, Typography, IconButton } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Typography variant="h6" gutterBottom>Home Page</Typography>
      <IconButton 
        color="primary" 
        onClick={() => navigate('/dashboard')}
        sx={{ fontSize: 25 }}
      >Dashboard
        <DashboardIcon fontSize="inherit" />
      </IconButton>
    </Container>
  );
};

export default Home;
