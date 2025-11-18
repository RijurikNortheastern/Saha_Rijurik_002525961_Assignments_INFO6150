import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  CircularProgress,
  Alert,
  Box,
  TextField
} from '@mui/material';
import {
  Work as WorkIcon,
  Business as CompanyIcon,
  AttachMoney as SalaryIcon,
  Search as SearchIcon
} from '@mui/icons-material';
import { fetchJobs } from '../../store/slices/jobSlice';

const EmployeeJobsPage = () => {
  const dispatch = useDispatch();
  const { jobs, loading, error } = useSelector((state) => state.jobs);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  const filteredJobs = jobs.filter(job =>
    job.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <Container sx={{ textAlign: 'center', py: 4 }}>
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>Loading jobs...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Typography variant="h3" gutterBottom align="center">
        Available Jobs
      </Typography>

      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
        <TextField
          variant="outlined"
          placeholder="Search jobs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: '100%', maxWidth: 600 }}
          InputProps={{
            startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />
          }}
        />
      </Box>

      {filteredJobs.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h5" color="text.secondary" gutterBottom>
            No jobs found
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {searchTerm ? 'Try adjusting your search criteria' : 'No jobs available at the moment'}
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {filteredJobs.map((job) => (
            <Grid item xs={12} md={6} lg={4} key={job.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <WorkIcon sx={{ mr: 1, color: 'primary.main' }} />
                    <Typography variant="h6" component="div">
                      {job.jobTitle}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <CompanyIcon sx={{ mr: 1, fontSize: 'small', color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      {job.companyName}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <SalaryIcon sx={{ mr: 1, fontSize: 'small', color: 'success.main' }} />
                    <Typography variant="body2" color="success.main" fontWeight="medium">
                      {job.salary}
                    </Typography>
                  </Box>

                  <Typography variant="body2" color="text.secondary" paragraph>
                    {job.description}
                  </Typography>
                </CardContent>
                
                <CardActions sx={{ p: 2 }}>
                  <Button variant="contained" fullWidth>
                    Apply Now
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          Total Jobs Available: {filteredJobs.length}
        </Typography>
      </Box>
    </Container>
  );
};

export default EmployeeJobsPage;