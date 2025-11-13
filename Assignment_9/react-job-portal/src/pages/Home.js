import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  Container
} from '@mui/material';
import {
  Work as WorkIcon,
  Business as BusinessIcon,
  ContactMail as ContactIcon
} from '@mui/icons-material';

const Home = () => {
  const stats = [
    { label: 'Active Jobs', value: '1000+' },
    { label: 'Companies', value: '500+' },
    { label: 'Job Seekers', value: '10K+' },
    { label: 'Success Rate', value: '95%' }
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h2" gutterBottom>
          Welcome to Job Portal
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          Find Your Dream Job Today
        </Typography>
      </Box>

      {/* Main feature cards */}
      <Grid container spacing={4} sx={{ mb: 6, justifyContent: 'center' }}>
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ 
            p: 3, 
            textAlign: 'center', 
            minHeight: '300px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <WorkIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
            <Typography variant="h5" gutterBottom>
              Latest Jobs
            </Typography>
            <Typography color="text.secondary" paragraph sx={{ flexGrow: 1 }}>
              Browse through hundreds of job opportunities from top companies
            </Typography>
            <Button variant="contained" component={Link} to="/jobs" sx={{ minWidth: '200px' }}>
              View Jobs
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ 
            p: 3, 
            textAlign: 'center', 
            minHeight: '300px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <BusinessIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
            <Typography variant="h5" gutterBottom>
              Top Companies
            </Typography>
            <Typography color="text.secondary" paragraph sx={{ flexGrow: 1 }}>
              Explore companies that are hiring and learn about their culture
            </Typography>
            <Button variant="contained" component={Link} to="/companies" sx={{ minWidth: '200px' }}>
              View Companies
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ 
            p: 3, 
            textAlign: 'center', 
            minHeight: '300px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <ContactIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
            <Typography variant="h5" gutterBottom>
              Get in Touch
            </Typography>
            <Typography color="text.secondary" paragraph sx={{ flexGrow: 1 }}>
              Have questions? We're here to help you with your job search
            </Typography>
            <Button variant="contained" component={Link} to="/contact" sx={{ minWidth: '200px' }}>
              Contact Us
            </Button>
          </Paper>
        </Grid>
      </Grid>

      {/* Stats section - FIXED for proper centering */}
      <Box sx={{ p: 4, bgcolor: 'grey.100', borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom align="center">
          Why Choose Our Job Portal?
        </Typography>
        
        {/* Centered stats grid */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center',
          mt: 3 
        }}>
          <Grid 
            container 
            spacing={3} 
            sx={{ 
              maxWidth: '900px',  // Limit max width for better centering
              justifyContent: 'center'  // Center the grid items
            }}
          >
            {stats.map((stat, index) => (
              <Grid 
                item 
                xs={6}  // 2 columns on mobile
                sm={6}  // 2 columns on tablet
                md={3}  // 4 columns on desktop
                key={index}
                sx={{ display: 'flex', justifyContent: 'center' }}
              >
                <Paper sx={{ 
                  p: 3, 
                  textAlign: 'center',
                  width: '100%',
                  maxWidth: '200px'  // Limit card width
                }}>
                  <Typography variant="h4" color="primary.main" gutterBottom>
                    {stat.value}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    {stat.label}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Home;