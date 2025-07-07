
import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Card, CardContent, TextField } from '@mui/material';
import { motion } from 'framer-motion';
import GroupIcon from '@mui/icons-material/Group';

export default function FrontPage({ onStart }) {
  const [admin, setAdmin] = useState({ name: '', contact: '', email: '' });
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('settings');
    if (saved) {
      const s = JSON.parse(saved);
      setAdmin({ name: s.societyName || '', contact: s.contact || '', email: s.adminEmail || '' });
    }
  }, []);

  const handleChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // Save to settings in localStorage for consistency
    const settings = localStorage.getItem('settings');
    let s = settings ? JSON.parse(settings) : {};
    s.societyName = admin.name;
    s.contact = admin.contact;
    s.adminEmail = admin.email;
    localStorage.setItem('settings', JSON.stringify(s));
    setEditMode(false);
  };

  // Animation variants
  const shimmerVariants = {
    animate: {
      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      transition: { duration: 3, repeat: Infinity, ease: "linear" }
    }
  };
  const buttonVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.08, boxShadow: '0px 4px 24px 0px #1976d255' },
    tap: { scale: 0.96 }
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(120deg, #1976d2 0%, #21cbf3 100%)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Floating animated background shapes */}
      <motion.div
        animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut' }}
        style={{ position: 'absolute', width: 220, height: 220, borderRadius: '50%', background: 'radial-gradient(circle, #fff 0%, #21cbf3 80%)', top: -60, left: -80, zIndex: 0, opacity: 0.18 }}
      />
      <motion.div
        animate={{ y: [0, -30, 0], x: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 12, ease: 'easeInOut' }}
        style={{ position: 'absolute', width: 180, height: 180, borderRadius: '50%', background: 'radial-gradient(circle, #fff 0%, #1976d2 80%)', bottom: -50, right: -60, zIndex: 0, opacity: 0.13 }}
      />
      <motion.div
        animate={{ y: [0, 40, 0] }}
        transition={{ repeat: Infinity, duration: 16, ease: 'easeInOut' }}
        style={{ position: 'absolute', width: 600, height: 600, borderRadius: '50%', background: 'rgba(33,203,243,0.15)', top: -150, left: -150, zIndex: 0 }}
      />
      <motion.div
        animate={{ y: [0, -40, 0] }}
        transition={{ repeat: Infinity, duration: 14, ease: 'easeInOut' }}
        style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: 'rgba(25,118,210,0.12)', bottom: -100, right: -100, zIndex: 0 }}
      />

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
        style={{ textAlign: 'center', zIndex: 1 }}
      >
        <motion.div
          initial={{ y: -100, opacity: 0, rotate: -30 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          transition={{ delay: 0.3, duration: 0.8, type: 'spring', stiffness: 80 }}
        >
          <GroupIcon sx={{ fontSize: 80, color: '#fff', mb: 2, boxShadow: 3, filter: 'drop-shadow(0 0 16px #21cbf3)' }} />
        </motion.div>
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.7, type: 'spring', bounce: 0.4 }}
        >
          <motion.div
            variants={shimmerVariants}
            animate="animate"
            style={{
              display: 'inline-block',
              background: 'linear-gradient(90deg, #fff 20%, #21cbf3 50%, #fff 80%)',
              backgroundSize: '200% 100%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 700,
              fontSize: 48,
              marginBottom: 16,
              textShadow: '2px 2px 8px #1976d2',
            }}
          >
            Welcome to Social Management
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.7 }}
        >
          <Typography variant="h5" sx={{ color: '#e3f2fd', mb: 4 }}>
            Manage your society, events, members, and more with ease.
          </Typography>
        </motion.div>
        <motion.div
          initial={{ y: 60, opacity: 0, scale: 0.8 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.7, type: 'spring', bounce: 0.5 }}
        >
          <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap" initial="rest" animate="rest" style={{ display: 'inline-block', width: '100%' }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{ px: 5, py: 1.5, fontSize: 20, borderRadius: 8, boxShadow: 4 }}
              onClick={onStart}
            >
              Get Started
            </Button>
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.7 }}
        >
          <Card sx={{ mt: 5, mx: 'auto', maxWidth: 400, background: 'rgba(255,255,255,0.95)', borderRadius: 3, boxShadow: 4 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, color: '#1976d2' }}>Admin & Society Details</Typography>
              {editMode ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <TextField label="Society Name" name="name" value={admin.name} onChange={handleChange} />
                  <TextField label="Contact No." name="contact" value={admin.contact} onChange={handleChange} />
                  <TextField label="Admin Email" name="email" value={admin.email} onChange={handleChange} />
                  <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                    <Button variant="contained" color="primary" onClick={handleSave}>Save</Button>
                    <Button variant="outlined" color="inherit" onClick={() => setEditMode(false)}>Cancel</Button>
                  </Box>
                </Box>
              ) : (
                <Box sx={{ textAlign: 'left' }}>
                  <Typography variant="body1"><b>Society Name:</b> {admin.name || 'Not set'}</Typography>
                  <Typography variant="body1"><b>Contact No.:</b> {admin.contact || 'Not set'}</Typography>
                  <Typography variant="body1"><b>Admin Email:</b> {admin.email || 'Not set'}</Typography>
                  <Button variant="outlined" color="primary" sx={{ mt: 2 }} onClick={() => setEditMode(true)}>Edit</Button>
                </Box>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </Box>
  );
}
