import React, { useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  Grid,
  Box,
  Alert
} from '@mui/material';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission - send to backend API
    console.log('Form submitted:', formData);
    setSubmitted(true);
    
    // Reset form and hide success message after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h3" gutterBottom align="center">
        Contact Us
      </Typography>

      <Paper sx={{ p: 4, mt: 4 }}>
        {submitted && (
          <Alert severity="success" sx={{ mb: 3 }}>
            Thank you for contacting us! We'll get back to you soon.
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                variant="outlined"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                variant="outlined"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Subject"
                name="subject"
                variant="outlined"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Message"
                name="message"
                variant="outlined"
                multiline
                rows={4}
                value={formData.message}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
              >
                Send Message
              </Button>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Other Ways to Reach Us
          </Typography>
          <Typography paragraph>
            <strong>Email:</strong> support@jobportal.com
          </Typography>
          <Typography paragraph>
            <strong>Phone:</strong> +1 (555) 123-4567
          </Typography>
          <Typography paragraph>
            <strong>Address:</strong> 123 Business Street, Tech City, TC 12345
          </Typography>
          <Typography paragraph>
            <strong>Business Hours:</strong> Monday - Friday, 9:00 AM - 6:00 PM EST
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Contact;