import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  Box,
  Alert,
  CircularProgress,
  Grid
} from '@mui/material';
import { Save as SaveIcon, Cancel as CancelIcon } from '@mui/icons-material';
import { createJob, clearCreateSuccess, clearError } from '../../store/slices/jobSlice';

const AddJobPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, createSuccess } = useSelector((state) => state.jobs);
  
  const [formData, setFormData] = useState({
    companyName: '',
    jobTitle: '',
    description: '',
    salary: ''
  });

  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (createSuccess) {
      setTimeout(() => {
        dispatch(clearCreateSuccess());
        navigate('/admin/jobs');
      }, 2000);
    }
  }, [createSuccess, dispatch, navigate]);

  useEffect(() => {
    return () => {
      dispatch(clearError());
      dispatch(clearCreateSuccess());
    };
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.companyName.trim()) {
      errors.companyName = 'Company name is required';
    }
    if (!formData.jobTitle.trim()) {
      errors.jobTitle = 'Job title is required';
    }
    if (!formData.description.trim()) {
      errors.description = 'Description is required';
    }
    if (!formData.salary.trim()) {
      errors.salary = 'Salary is required';
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    dispatch(createJob(formData));
  };

  const handleCancel = () => {
    navigate('/admin');
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h3" gutterBottom>
        Add New Job
      </Typography>

      <Paper sx={{ p: 4, mt: 3 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}
        
        {createSuccess && (
          <Alert severity="success" sx={{ mb: 3 }}>
            Job created successfully! Redirecting...
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Company Name"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                error={!!formErrors.companyName}
                helperText={formErrors.companyName}
                disabled={loading}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Job Title"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                error={!!formErrors.jobTitle}
                helperText={formErrors.jobTitle}
                disabled={loading}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Salary"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                error={!!formErrors.salary}
                helperText={formErrors.salary}
                placeholder="e.g., $80,000 - $120,000"
                disabled={loading}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Job Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                error={!!formErrors.description}
                helperText={formErrors.description}
                multiline
                rows={5}
                disabled={loading}
              />
            </Grid>
            
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  startIcon={loading ? <CircularProgress size={20} /> : <SaveIcon />}
                  disabled={loading}
                  sx={{ minWidth: 150 }}
                >
                  {loading ? 'Creating...' : 'Create Job'}
                </Button>
                
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<CancelIcon />}
                  onClick={handleCancel}
                  disabled={loading}
                >
                  Cancel
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default AddJobPage;