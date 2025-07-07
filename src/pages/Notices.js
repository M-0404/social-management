import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export default function Notices() {
  const [notices, setNotices] = useState([]);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [editIdx, setEditIdx] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDate, setEditDate] = useState('');

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('notices');
    if (saved) setNotices(JSON.parse(saved));
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('notices', JSON.stringify(notices));
  }, [notices]);

  const handleAddNotice = (e) => {
    e.preventDefault();
    if (title.trim() && date.trim()) {
      setNotices([...notices, { title, date }]);
      setTitle('');
      setDate('');
    }
  };

  const handleEditNotice = (idx) => {
    setEditIdx(idx);
    setEditTitle(notices[idx].title);
    setEditDate(notices[idx].date);
  };

  const handleSaveEdit = (idx) => {
    const updated = [...notices];
    updated[idx] = { title: editTitle, date: editDate };
    setNotices(updated);
    setEditIdx(null);
    setEditTitle('');
    setEditDate('');
  };

  const handleRemoveNotice = (idxToRemove) => {
    setNotices(notices.filter((_, idx) => idx !== idxToRemove));
  };

  return (
    <Card sx={{ maxWidth: 600, margin: 'auto', boxShadow: 3, borderRadius: 3 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>Notices</Typography>
        <Box component="form" onSubmit={handleAddNotice} sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <TextField
            label="Notice Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            size="small"
            required
          />
          <TextField
            label="Date"
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            size="small"
            InputLabelProps={{ shrink: true }}
            required
          />
          <Button type="submit" variant="contained" color="primary">Add</Button>
        </Box>
        <List>
          {notices.length === 0 ? (
            <ListItem>
              <ListItemText primary="No notices yet. Add a notice above." />
            </ListItem>
          ) : (
            notices.map((notice, idx) => (
              <ListItem key={idx} divider secondaryAction={
                editIdx === idx ? (
                  <>
                    <Button color="success" size="small" onClick={() => handleSaveEdit(idx)} sx={{ mr: 1 }}>Save</Button>
                    <Button color="inherit" size="small" onClick={() => setEditIdx(null)}>Cancel</Button>
                  </>
                ) : (
                  <>
                    <Button color="primary" size="small" onClick={() => handleEditNotice(idx)} sx={{ mr: 1 }}>Edit</Button>
                    <Button color="error" size="small" onClick={() => handleRemoveNotice(idx)}>Remove</Button>
                  </>
                )
              }>
                {editIdx === idx ? (
                  <Box sx={{ display: 'flex', gap: 1, width: '100%' }}>
                    <TextField
                      value={editTitle}
                      onChange={e => setEditTitle(e.target.value)}
                      size="small"
                      sx={{ flex: 1 }}
                    />
                    <TextField
                      type="date"
                      value={editDate}
                      onChange={e => setEditDate(e.target.value)}
                      size="small"
                      sx={{ flex: 1 }}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Box>
                ) : (
                  <ListItemText primary={notice.title} secondary={notice.date} />
                )}
              </ListItem>
            ))
          )}
        </List>
      </CardContent>
    </Card>
  );
}
