
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
import MenuItem from '@mui/material/MenuItem';

export default function Members() {


  const [members, setMembers] = useState([]);
  const [name, setName] = useState('');
  const [role, setRole] = useState('member');
  const [flatNo, setFlatNo] = useState('');
  const [editIdx, setEditIdx] = useState(null);
  const [editName, setEditName] = useState('');
  const [editRole, setEditRole] = useState('member');
  const [editFlatNo, setEditFlatNo] = useState('');

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('members');
    if (saved) setMembers(JSON.parse(saved));
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('members', JSON.stringify(members));
  }, [members]);

  const handleAddMember = (e) => {
    e.preventDefault();
    if (name.trim() && role.trim() && flatNo.trim()) {
      setMembers([...members, { name, role, flatNo }]);
      setName('');
      setRole('member');
      setFlatNo('');
    }
  };

  const handleEditMember = (idx) => {
    setEditIdx(idx);
    setEditName(members[idx].name);
    setEditRole(members[idx].role);
    setEditFlatNo(members[idx].flatNo);
  };

  const handleSaveEdit = (idx) => {
    const updated = [...members];
    updated[idx] = { name: editName, role: editRole, flatNo: editFlatNo };
    setMembers(updated);
    setEditIdx(null);
    setEditName('');
    setEditRole('member');
    setEditFlatNo('');
  };

  const handleRemoveMember = (idxToRemove) => {
    setMembers(members.filter((_, idx) => idx !== idxToRemove));
  };

  return (
    <Card sx={{ maxWidth: 600, margin: 'auto', boxShadow: 3, borderRadius: 3 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>Members</Typography>
        <Box component="form" onSubmit={handleAddMember} sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            size="small"
            required
            sx={{ minWidth: 120 }}
          />
          <TextField
            label="Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            size="small"
            select
            required
            sx={{ minWidth: 120 }}
          >
            <MenuItem value="member">Member</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="staff">Staff</MenuItem>
          </TextField>
          <TextField
            label="Flat No."
            value={flatNo}
            onChange={(e) => setFlatNo(e.target.value)}
            size="small"
            required
            sx={{ minWidth: 100 }}
          />
          <Button type="submit" variant="contained" color="primary">Add</Button>
        </Box>
        <List>
          {members.length === 0 ? (
            <ListItem>
              <ListItemText primary="No members yet. Add a member above." />
            </ListItem>
          ) : (
            members.map((member, idx) => (
              <ListItem key={idx} divider secondaryAction={
                editIdx === idx ? (
                  <>
                    <Button color="success" size="small" onClick={() => handleSaveEdit(idx)} sx={{ mr: 1 }}>Save</Button>
                    <Button color="inherit" size="small" onClick={() => setEditIdx(null)}>Cancel</Button>
                  </>
                ) : (
                  <>
                    <Button color="primary" size="small" onClick={() => handleEditMember(idx)} sx={{ mr: 1 }}>Edit</Button>
                    <Button color="error" size="small" onClick={() => handleRemoveMember(idx)}>Remove</Button>
                  </>
                )
              }>
                {editIdx === idx ? (
                  <Box sx={{ display: 'flex', gap: 1, width: '100%' }}>
                    <TextField
                      value={editName}
                      onChange={e => setEditName(e.target.value)}
                      size="small"
                      sx={{ flex: 1 }}
                    />
                    <TextField
                      value={editRole}
                      onChange={e => setEditRole(e.target.value)}
                      size="small"
                      select
                      sx={{ flex: 1 }}
                    >
                      <MenuItem value="member">Member</MenuItem>
                      <MenuItem value="admin">Admin</MenuItem>
                      <MenuItem value="staff">Staff</MenuItem>
                    </TextField>
                    <TextField
                      value={editFlatNo}
                      onChange={e => setEditFlatNo(e.target.value)}
                      size="small"
                      sx={{ flex: 1 }}
                      label="Flat No."
                    />
                  </Box>
                ) : (
                  <ListItemText
                    primary={`${member.name} (${member.role})`}
                    secondary={`Flat No.: ${member.flatNo}`}
                  />
                )}
              </ListItem>
            ))
          )}
        </List>
        <Typography variant="body2" sx={{ mt: 2 }}>Total Members: {members.length}</Typography>
      </CardContent>
    </Card>
  );
}
