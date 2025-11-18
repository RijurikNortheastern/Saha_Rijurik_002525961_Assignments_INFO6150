import React from 'react';
import { useSelector } from 'react-redux';
import {
  Container,
  Typography,
  Paper,
  Box,
  Grid,
  Avatar
} from '@mui/material';
import { AccountCircle as ProfileIcon } from '@mui/icons-material';

const EmployeeProfile = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <Container maxWidth="md">
      <Typography variant="h3" gutterBottom>
        My Profile
      </Typography>

      <Paper sx={{ p: 4, mt: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Avatar sx={{ width: 80, height: 80, mr: 3, bgcolor: 'primary.main' }}>
            <ProfileIcon sx={{ fontSize: 50 }} />
          </Avatar>
          <Box>
            <Typography variant="h5">{user?.name || 'N/A'}</Typography>
            <Typography variant="body2" color="text.secondary">
              {user?.type === 'employee' ? 'Employee' : user?.type}
            </Typography>
          </Box>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="text.secondary">
              Username
            </Typography>
            <Typography variant="body1" gutterBottom>
              {user?.username || 'N/A'}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="text.secondary">
              Email
            </Typography>
            <Typography variant="body1" gutterBottom>
              {user?.email || 'N/A'}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="text.secondary">
              User ID
            </Typography>
            <Typography variant="body1" gutterBottom>
              {user?.id || 'N/A'}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="text.secondary">
              Account Type
            </Typography>
            <Typography variant="body1" gutterBottom>
              {user?.type || 'N/A'}
            </Typography>
          </Grid>
        </Grid>

        
      </Paper>
    </Container>
  );
};

export default EmployeeProfile;