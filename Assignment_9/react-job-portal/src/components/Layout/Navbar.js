import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Divider
} from '@mui/material';
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Work as WorkIcon,
  Business as BusinessIcon,
  Info as InfoIcon,
  ContactMail as ContactIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';
import sessionManager from '../../utils/sessionManager';

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = sessionManager.getSession();

  const menuItems = [
    { title: 'Home', path: '/', icon: <HomeIcon /> },
    { title: 'About', path: '/about', icon: <InfoIcon /> },
    { title: 'Job Listings', path: '/jobs', icon: <WorkIcon /> },
    { title: 'Companies', path: '/companies', icon: <BusinessIcon /> },
    { title: 'Contact', path: '/contact', icon: <ContactIcon /> }
  ];

  const handleLogout = () => {
    sessionManager.clearSession();
    navigate('/login');
  };

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => setDrawerOpen(true)}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Job Portal
          </Typography>

          <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 1 }}>
            {menuItems.map((item) => (
              <Button
                key={item.path}
                color="inherit"
                component={Link}
                to={item.path}
                startIcon={item.icon}
              >
                {item.title}
              </Button>
            ))}
          </Box>

          {user && (
            <Box sx={{ ml: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2">Welcome, {user.username}</Typography>
              <IconButton color="inherit" onClick={handleLogout}>
                <LogoutIcon />
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ width: 250 }}>
          <List>
            <ListItem>
              <Typography variant="h6">Job Portal</Typography>
            </ListItem>
            <Divider />
            {menuItems.map((item) => (
              <ListItem
                button
                key={item.path}
                component={Link}
                to={item.path}
                onClick={() => setDrawerOpen(false)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItem>
            ))}
            {user && (
              <>
                <Divider />
                <ListItem button onClick={handleLogout}>
                  <ListItemIcon><LogoutIcon /></ListItemIcon>
                  <ListItemText primary="Logout" />
                </ListItem>
              </>
            )}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;