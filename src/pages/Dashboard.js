import React, { useEffect, useState } from 'react';
import { Card, CardContent, Grid, Typography, Avatar, Box, IconButton, Badge, Button, Tooltip } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import EventIcon from '@mui/icons-material/Event';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const [memberCount, setMemberCount] = useState(0);
  const [eventCount, setEventCount] = useState(0);
  const [noticeCount, setNoticeCount] = useState(0);
  const [newNotices, setNewNotices] = useState(0);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const members = JSON.parse(localStorage.getItem('members') || '[]');
    setMemberCount(members.length);
    const events = JSON.parse(localStorage.getItem('events') || '[]');
    setEventCount(events.length);
    const notices = JSON.parse(localStorage.getItem('notices') || '[]');
    setNoticeCount(notices.length);
    setNewNotices(notices.length); // For demo, treat all as new
    // Try to get user name from settings or fallback
    const settings = JSON.parse(localStorage.getItem('settings') || '{}');
    setUserName(settings.adminName || settings.societyName || 'Admin');
  }, []);

  const statCards = [
    { label: 'Total Members', value: memberCount, icon: <PeopleIcon fontSize="large" color="primary" /> },
    { label: 'Upcoming Events', value: eventCount, icon: <EventIcon fontSize="large" color="secondary" /> },
    { label: 'Notices', value: noticeCount, icon: <NotificationsIcon fontSize="large" color="action" /> },
  ];

  return (
    <Box>
      {/* Greeting and notification bell */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 2 }}>
        <Avatar sx={{ bgcolor: '#1976d2', width: 56, height: 56, fontSize: 32, mr: 2 }}>
          {userName ? userName[0].toUpperCase() : 'A'}
        </Avatar>
        <Box>
          <Typography variant="h4" fontWeight={700} color="primary.main">Hello, {userName}!</Typography>
          <Typography variant="subtitle1" color="text.secondary">Welcome to your society dashboard.</Typography>
        </Box>
        <Box sx={{ flex: 1 }} />
        <Tooltip title="You have new notices!">
          <IconButton color="primary" sx={{ ml: 2 }}>
            <Badge badgeContent={newNotices} color="error" max={99}>
              <NotificationsActiveIcon fontSize="large" />
            </Badge>
          </IconButton>
        </Tooltip>
      </Box>

      {/* Animated stat cards */}
      <Grid container spacing={3}>
        {statCards.map((stat, idx) => (
          <Grid item xs={12} sm={6} md={4} key={stat.label}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * idx, duration: 0.7, type: 'spring' }}
            >
              <Card sx={{ display: 'flex', alignItems: 'center', p: 2, boxShadow: 4, borderRadius: 3, background: 'linear-gradient(120deg, #e3f2fd 0%, #fff 100%)' }}>
                <CardContent sx={{ flex: 1 }}>
                  <Typography variant="h6" component="div" gutterBottom color="primary">
                    {stat.label}
                  </Typography>
                  <motion.div
                    initial={{ scale: 0.7 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.7, type: 'spring', bounce: 0.4 }}
                  >
                    <Typography variant="h3" color="primary.main" fontWeight={700}>
                      {stat.value}
                    </Typography>
                  </motion.div>
                </CardContent>
                {stat.icon}
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* Quick Actions */}
      <Box sx={{ display: 'flex', gap: 2, mt: 4, mb: 2 }}>
        <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.96 }}>
          <Button variant="contained" color="primary" startIcon={<AddCircleOutlineIcon />} size="large" href="/members">
            Add Member
          </Button>
        </motion.div>
        <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.96 }}>
          <Button variant="contained" color="secondary" startIcon={<AddCircleOutlineIcon />} size="large" href="/events">
            Create Event
          </Button>
        </motion.div>
        <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.96 }}>
          <Button variant="contained" color="info" startIcon={<AddCircleOutlineIcon />} size="large" href="/notices">
            Add Notice
          </Button>
        </motion.div>
      </Box>
    </Box>
  );
}
