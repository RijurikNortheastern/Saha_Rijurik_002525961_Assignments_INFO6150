import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Container,
  Typography,
  Grid,
  Paper,
  Box,
  Button
} from '@mui/material';
import {
  Work as WorkIcon,
  Business as BusinessIcon,
  AccountCircle as ProfileIcon,
  Dashboard as DashboardIcon
} from '@mui/icons-material';

const EmployeeDashboard = () => {
  const user = useSelector((state) => state.auth.user);

  const employeeFeatures = [
    {
      title: 'Browse Jobs',
      description: 'View and apply to available job positions',
      icon: <WorkIcon sx={{ fontSize: 48 }} />,
      link: '/employee/jobs',
      color: 'primary'
    },
    {
      title: 'Company Showcase',
      description: 'Explore companies and their opportunities',
      icon: <BusinessIcon sx={{ fontSize: 48 }} />,
      link: '/companies',
      color: 'success'
    },
    {
      title: 'My Profile',
      description: 'View and update your profile information',
      icon: <ProfileIcon sx={{ fontSize: 48 }} />,
      link: '/employee/profile',
      color: 'info'
    }
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" gutterBottom>
          <DashboardIcon sx={{ mr: 2, fontSize: 40, verticalAlign: 'middle' }} />
          Employee Dashboard
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Welcome back, {user?.name || user?.username}!
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {employeeFeatures.map((feature, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Paper
              sx={{
                p: 3,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: 3
                }
              }}
            >
              <Box sx={{ color: `${feature.color}.main`, mb: 2 }}>
                {feature.icon}
              </Box>
              <Typography variant="h5" gutterBottom>
                {feature.title}
              </Typography>
              <Typography 
                variant="body2" 
                color="text.secondary" 
                paragraph 
                sx={{ flexGrow: 1 }}
              >
                {feature.description}
              </Typography>
              <Button
                variant="contained"
                component={Link}
                to={feature.link}
                color={feature.color}
                fullWidth
              >
                Go to {feature.title}
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default EmployeeDashboard;