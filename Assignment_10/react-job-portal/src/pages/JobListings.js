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
        sx={{ mb: 4, maxWidth: '800px', mx: 'auto', display: 'block' }}
      />

      {/* Added justifyContent center to center cards when there's an odd number */}
      <Grid container spacing={3} justifyContent="center">
        {filteredJobs.map((job) => (
          <Grid item xs={12} sm={6} lg={6} key={job.id}>
            <Card sx={{ 
              height: '100%',
              minHeight: '380px',
              display: 'flex', 
              flexDirection: 'column',
              maxWidth: '600px',  // Maximum width for each card
              mx: 'auto'  // Center the card within its grid item
            }}>
              <CardContent sx={{ 
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                p: 3
              }}>
                {/* Title */}
                <Typography variant="h5" gutterBottom sx={{ 
                  minHeight: '35px',
                  fontWeight: 'bold'
                }}>
                  {job.title}
                </Typography>

                {/* Salary */}
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  mb: 2,
                  minHeight: '30px'
                }}>
                  <MoneyIcon sx={{ mr: 1, color: 'success.main', fontSize: '20px' }} />
                  <Typography variant="body1" color="success.main" fontWeight="medium">
                    {job.salary}
                  </Typography>
                </Box>

                {/* Skills section */}
                <Box sx={{ 
                  mb: 2,
                  minHeight: '70px'
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <SkillsIcon sx={{ mr: 1, color: 'info.main', fontSize: '20px' }} />
                    <Typography variant="body2" color="text.secondary">
                      Required Skills:
                    </Typography>
                  </Box>
                  <Box sx={{ ml: 3.5 }}>
                    {job.skills.map((skill, index) => (
                      <Chip
                        key={index}
                        label={skill}
                        size="small"
                        sx={{ mr: 0.5, mb: 0.5 }}
                        variant="outlined"
                        color="primary"
                      />
                    ))}
                  </Box>
                </Box>

                {/* Description */}
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  paragraph 
                  sx={{ 
                    flexGrow: 1,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    lineHeight: 1.6,
                    minHeight: '60px'
                  }}
                >
                  {job.description}
                </Typography>

                {/* Last updated */}
                <Typography 
                  variant="caption" 
                  color="text.secondary"
                  sx={{ 
                    mt: 'auto',
                    pt: 1,
                    borderTop: '1px solid',
                    borderColor: 'divider'
                  }}
                >
                  {job.lastUpdated}
                </Typography>
              </CardContent>

              {/* Apply button */}
              <CardActions sx={{ p: 2, pt: 0 }}>
                <Button
                  variant="contained"
                  fullWidth
                  href={job.applyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="large"
                >
                  Apply Now
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* No results message */}
      {filteredJobs.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h5" color="text.secondary" gutterBottom>
            No jobs found
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Try adjusting your search criteria
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default JobListings;