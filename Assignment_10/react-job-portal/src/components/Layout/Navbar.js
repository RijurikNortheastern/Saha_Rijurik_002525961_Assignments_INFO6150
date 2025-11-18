import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
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
  Divider,
  Chip
} from '@mui/material';
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Work as WorkIcon,
  Business as BusinessIcon,
  Info as InfoIcon,
  ContactMail as ContactIcon,
  Logout as LogoutIcon,
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Add as AddIcon,
  AdminPanelSettings as AdminIcon,
  AccountCircle as EmployeeIcon
} from '@mui/icons-material';
import { logout } from '../../store/slices/authSlice';

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

  const getMenuItems = () => {
    const commonItems = [
      { title: 'About', path: '/about', icon: <InfoIcon /> },
      { title: 'Companies', path: '/companies', icon: <BusinessIcon /> },
      { title: 'Contact', path: '/contact', icon: <ContactIcon /> }
    ];

    if (user?.type === 'admin') {
      return [
        { title: 'Admin Dashboard', path: '/admin', icon: <DashboardIcon /> },
        { title: 'View Employees', path: '/admin/employees', icon: <PeopleIcon /> },
        { title: 'Add Job', path: '/admin/add-job', icon: <AddIcon /> },
        { title: 'Manage Jobs', path: '/admin/jobs', icon: <WorkIcon /> },
        ...commonItems
      ];
    } else if (user?.type === 'employee') {
      return [
        { title: 'Employee Dashboard', path: '/employee', icon: <DashboardIcon /> },
        { title: 'Browse Jobs', path: '/employee/jobs', icon: <WorkIcon /> },
        ...commonItems
      ];
    } else {
      return [
        { title: 'Home', path: '/home', icon: <HomeIcon /> },
        { title: 'Job Listings', path: '/jobs', icon: <WorkIcon /> },
        ...commonItems
      ];
    }
  };

  const menuItems = getMenuItems();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const getUserRoleIcon = () => {
    if (user?.type === 'admin') {
      return <AdminIcon sx={{ fontSize: 20 }} />;
    } else if (user?.type === 'employee') {
      return <EmployeeIcon sx={{ fontSize: 20 }} />;
    }
    return null;
  };

  const getUserRoleColor = () => {
    if (user?.type === 'admin') {
      return 'error';
    } else if (user?.type === 'employee') {
      return 'primary';
    }
    return 'default';
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
            {user?.type && (
              <Chip
                label={user.type.toUpperCase()}
                size="small"
                color={getUserRoleColor()}
                icon={getUserRoleIcon()}
                sx={{ ml: 2, color: 'white' }}
              />
            )}
          </Typography>

          <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 1, alignItems: 'center' }}>
            {menuItems.slice(0, 4).map((item) => (
              <Button
                key={item.path}
                color="inherit"
                component={Link}
                to={item.path}
                startIcon={item.icon}
                size="small"
              >
                {item.title}
              </Button>
            ))}
          </Box>

          {user && (
            <Box sx={{ ml: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2" sx={{ display: { xs: 'none', md: 'block' } }}>
                {user.name || user.username}
              </Typography>
              <IconButton color="inherit" onClick={handleLogout} size="small">
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
            
            {user && (
              <ListItem>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="body2">{user.name || user.username}</Typography>
                  <Chip
                    label={user.type}
                    size="small"
                    color={getUserRoleColor()}
                    icon={getUserRoleIcon()}
                  />
                </Box>
              </ListItem>
            )}
            
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