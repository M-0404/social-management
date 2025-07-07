import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, AppBar, Typography, Box, CssBaseline } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import EventIcon from '@mui/icons-material/Event';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import { Link } from 'react-router-dom';

const drawerWidth = 220;

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
  { text: 'Members', icon: <PeopleIcon />, path: '/members' },
  { text: 'Events', icon: <EventIcon />, path: '/events' },
  { text: 'Notices', icon: <NotificationsIcon />, path: '/notices' },
  { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
];

export default function Layout({ children }) {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: 1201, background: 'linear-gradient(90deg, #1976d2 30%, #21cbf3 90%)' }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Social Management Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', background: '#f5f7fa' },
        }}
      >
        <Toolbar />
        <List>
          {menuItems.map((item) => (
            <ListItem button key={item.text} component={Link} to={item.path}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, bgcolor: '#f0f4f8', p: 3, minHeight: '100vh' }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
