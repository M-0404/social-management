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
import EventsCalendar from './EventsCalendar';

export default function Events() {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [editIdx, setEditIdx] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDate, setEditDate] = useState('');

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('events');
    if (saved) setEvents(JSON.parse(saved));
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  const handleAddEvent = (e) => {
    e.preventDefault();
    if (title.trim() && date.trim()) {
      setEvents([...events, { title, date }]);
      setTitle('');
      setDate('');
    }
  };

  const handleEditEvent = (idx) => {
    setEditIdx(idx);
    setEditTitle(events[idx].title);
    setEditDate(events[idx].date);
  };

  const handleSaveEdit = (idx) => {
    const updated = [...events];
    updated[idx] = { title: editTitle, date: editDate };
    setEvents(updated);
    setEditIdx(null);
    setEditTitle('');
    setEditDate('');
  };

  const handleRemoveEvent = (idxToRemove) => {
    setEvents(events.filter((_, idx) => idx !== idxToRemove));
  };

  return (
    <Box sx={{ position: 'relative', minHeight: '80vh', display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
      <Box sx={{ flex: 1, pr: 2 }}>
        <Card sx={{ maxWidth: 600, margin: '32px auto 0 32px', boxShadow: 3, borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>Upcoming Events</Typography>
            <Box component="form" onSubmit={handleAddEvent} sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <TextField
                label="Event Title"
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
              {events.length === 0 ? (
                <ListItem>
                  <ListItemText primary="No events yet. Add an event above." />
                </ListItem>
              ) : (
                events.map((event, idx) => (
                  <ListItem key={idx} divider secondaryAction={
                    editIdx === idx ? (
                      <>
                        <Button color="success" size="small" onClick={() => handleSaveEdit(idx)} sx={{ mr: 1 }}>Save</Button>
                        <Button color="inherit" size="small" onClick={() => setEditIdx(null)}>Cancel</Button>
                      </>
                    ) : (
                      <>
                        <Button color="primary" size="small" onClick={() => handleEditEvent(idx)} sx={{ mr: 1 }}>Edit</Button>
                        <Button color="error" size="small" onClick={() => handleRemoveEvent(idx)}>Remove</Button>
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
                      <ListItemText primary={event.title} secondary={event.date} />
                    )}
                  </ListItem>
                ))
              )}
            </List>
          </CardContent>
        </Card>
      </Box>
      <EventsCalendar />
    </Box>
  );
}
