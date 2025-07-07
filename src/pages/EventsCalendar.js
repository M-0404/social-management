
import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

export default function EventsCalendar() {
  return (
    <Box sx={{ position: 'absolute', top: 24, right: 24, zIndex: 10 }}>
      <Card sx={{ width: 340, boxShadow: 3, borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>Events Calendar</Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar />
          </LocalizationProvider>
        </CardContent>
      </Card>
    </Box>
  );
}
