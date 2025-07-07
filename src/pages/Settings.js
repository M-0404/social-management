import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export default function Settings() {
  const [settings, setSettings] = useState({
    societyName: '',
    address: '',
    contact: '',
    adminEmail: ''
  });
  const [editMode, setEditMode] = useState(false);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('settings');
    if (saved) setSettings(JSON.parse(saved));
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('settings', JSON.stringify(settings));
  }, [settings]);

  const handleChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleEdit = () => setEditMode(true);
  const handleSave = () => setEditMode(false);
  const handleCancel = () => {
    const saved = localStorage.getItem('settings');
    if (saved) setSettings(JSON.parse(saved));
    setEditMode(false);
  };

  return (
    <Card sx={{ maxWidth: 600, margin: 'auto', boxShadow: 3, borderRadius: 3 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>Settings</Typography>
        {editMode ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField label="Society Name" name="societyName" value={settings.societyName} onChange={handleChange} />
            <TextField label="Address" name="address" value={settings.address} onChange={handleChange} />
            <TextField label="Contact" name="contact" value={settings.contact} onChange={handleChange} />
            <TextField label="Admin Email" name="adminEmail" value={settings.adminEmail} onChange={handleChange} />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button variant="contained" color="primary" onClick={handleSave}>Save</Button>
              <Button variant="outlined" color="inherit" onClick={handleCancel}>Cancel</Button>
            </Box>
          </Box>
        ) : (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1"><b>Society Name:</b> {settings.societyName || 'Not set'}</Typography>
            <Typography variant="body1"><b>Address:</b> {settings.address || 'Not set'}</Typography>
            <Typography variant="body1"><b>Contact:</b> {settings.contact || 'Not set'}</Typography>
            <Typography variant="body1"><b>Admin Email:</b> {settings.adminEmail || 'Not set'}</Typography>
            <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleEdit}>Edit</Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
