import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  CircularProgress,
  Box
} from '@mui/material';

const CompanyShowcase = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock company data - replace with API call to fetch from backend
  const mockCompanies = [
    { id: 1, name: "Tech Innovators Inc.", image: "https://picsum.photos/400/200?random=1", description: "Leading technology solutions provider" },
    { id: 2, name: "Digital Marketing Pro", image: "https://picsum.photos/400/200?random=2", description: "Expert digital marketing agency" },
    { id: 3, name: "Design Studios", image: "https://picsum.photos/400/200?random=3", description: "Creative design and branding" },
    { id: 4, name: "Data Analytics Corp", image: "https://picsum.photos/400/200?random=4", description: "Big data and analytics solutions" },
    { id: 5, name: "Customer First Services", image: "https://picsum.photos/400/200?random=5", description: "Customer service excellence" },
    { id: 6, name: "Project Solutions Ltd", image: "https://picsum.photos/400/200?random=6", description: "Project management consultancy" }
  ];

  useEffect(() => {
    // Simulate fetching images from backend
    const fetchCompanies = async () => {
      try {
        // Replace this with actual API call to your backend
        // const response = await api.get('/companies');
        // setCompanies(response.data);
        
        // Simulate API delay
        setTimeout(() => {
          setCompanies(mockCompanies);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching companies:', error);
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ textAlign: 'center', py: 4 }}>
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>Loading companies...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Typography variant="h3" gutterBottom align="center">
        Company Showcase
      </Typography>
      
      <Typography variant="h6" align="center" color="text.secondary" paragraph>
        Explore top companies hiring on our platform
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {companies.map((company) => (
          <Grid item xs={12} sm={6} md={4} key={company.id}>
            <Card sx={{ height: '100%' }}>
              <CardMedia
                component="img"
                height="200"
                image={company.image}
                alt={company.name}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {company.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {company.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" variant="outlined">
                  View Profile
                </Button>
                <Button size="small" variant="contained">
                  View Jobs
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          Note: In Assignment 10, these images will be fetched based on the logged-in user
        </Typography>
      </Box>
    </Container>
  );
};

export default CompanyShowcase;