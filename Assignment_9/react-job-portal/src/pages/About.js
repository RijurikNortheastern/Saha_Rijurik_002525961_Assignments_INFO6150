import React from 'react';
import {
  Container,
  Typography,
  Paper,
  Grid,
  Box
} from '@mui/material';

const About = () => {
  const values = [
    { title: 'Integrity', description: 'Honest and transparent in all dealings' },
    { title: 'Innovation', description: 'Continuously improving our platform' },
    { title: 'Excellence', description: 'Committed to quality service' },
    { title: 'Diversity', description: 'Embracing all backgrounds' }
  ];

  return (
    <Container maxWidth="lg">
      <Typography variant="h3" gutterBottom align="center">
        About Us
      </Typography>

      <Paper sx={{ p: 4, mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Our Mission
        </Typography>
        <Typography paragraph>
          We are dedicated to connecting talented job seekers with outstanding employment opportunities.
          Our platform serves as a bridge between ambitious professionals and innovative companies looking
          for the best talent in the industry.
        </Typography>

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
          What We Offer
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">For Job Seekers</Typography>
            <ul>
              <li>Access to thousands of job opportunities</li>
              <li>Easy application process</li>
              <li>Career resources and guidance</li>
              <li>Company insights and reviews</li>
            </ul>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">For Employers</Typography>
            <ul>
              <li>Access to qualified candidates</li>
              <li>Streamlined recruitment process</li>
              <li>Company profile showcase</li>
              <li>Advanced filtering and matching</li>
            </ul>
          </Grid>
        </Grid>

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
          Our Values
        </Typography>
        <Grid container spacing={3}>
          {values.map((value, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
                <Typography variant="h6">{value.title}</Typography>
                <Typography variant="body2">{value.description}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Container>
  );
};

export default About;