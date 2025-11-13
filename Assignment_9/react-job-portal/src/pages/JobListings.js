import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
  Box,
  Chip
} from '@mui/material';
import {
  AttachMoney as MoneyIcon,
  Code as SkillsIcon
} from '@mui/icons-material';
import jobPosts from '../data/jobPosts';

const JobListings = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredJobs = jobPosts.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <Container maxWidth="lg">
      <Typography variant="h3" gutterBottom align="center">
        Job Listings
      </Typography>

      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search jobs by title, description, or skills..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 4 }}
      />

      <Grid container spacing={3}>
        {filteredJobs.map((job) => (
          <Grid item xs={12} md={6} key={job.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" gutterBottom>
                  {job.title}
                </Typography>

                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <MoneyIcon sx={{ mr: 1, color: 'success.main' }} />
                    <Typography variant="body2" color="text.secondary">
                      {job.salary}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                    <SkillsIcon sx={{ mr: 1, color: 'info.main', mt: 0.5 }} />
                    <Box>
                      {job.skills.map((skill, index) => (
                        <Chip
                          key={index}
                          label={skill}
                          size="small"
                          sx={{ mr: 0.5, mb: 0.5 }}
                          variant="outlined"
                        />
                      ))}
                    </Box>
                  </Box>
                </Box>

                <Typography variant="body2" paragraph>
                  {job.description}
                </Typography>

                <Typography variant="caption" color="text.secondary">
                  {job.lastUpdated}
                </Typography>
              </CardContent>

              <CardActions>
                <Button
                  variant="contained"
                  fullWidth
                  href={job.applyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Apply Now
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {filteredJobs.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h6" color="text.secondary">
            No jobs found matching your search criteria
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default JobListings;