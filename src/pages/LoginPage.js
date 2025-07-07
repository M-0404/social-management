import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, TextField, Button, Tabs, Tab, InputAdornment, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function LoginPage({ onAuth }) {
  const [tab, setTab] = useState(0);
  const [loginData, setLoginData] = useState({ email: '', password: '', role: 'member' });
  const [signupData, setSignupData] = useState({ name: '', email: '', password: '', role: 'member' });
  const [forgotEmail, setForgotEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleTabChange = (_, newValue) => setTab(newValue);

  const handleLogin = (e) => {
    e.preventDefault();
    // Add login logic here
    onAuth && onAuth('login', loginData);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    // Add signup logic here
    onAuth && onAuth('signup', signupData);
  };

  const handleForgot = (e) => {
    e.preventDefault();
    // Add forgot password logic here
    onAuth && onAuth('forgot', { email: forgotEmail });
  };

  const handleRoleChange = (e, type) => {
    if (type === 'login') setLoginData({ ...loginData, role: e.target.value });
    else setSignupData({ ...signupData, role: e.target.value });
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(120deg, #1976d2 0%, #21cbf3 100%)' }}>
      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        <Card sx={{ minWidth: 350, maxWidth: 400, borderRadius: 4, boxShadow: 6 }}>
          <CardContent>
            <Tabs value={tab} onChange={handleTabChange} centered sx={{ mb: 2 }}>
              <Tab label="Login" />
              <Tab label="Sign Up" />
              <Tab label="Forgot Password" />
            </Tabs>
            {tab === 0 && (
              <Box component="form" onSubmit={handleLogin} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography variant="h6" align="center">Login</Typography>
                <TextField label="Email" type="email" required value={loginData.email} onChange={e => setLoginData({ ...loginData, email: e.target.value })} />
                <TextField
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={loginData.password}
                  onChange={e => setLoginData({ ...loginData, password: e.target.value })}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword((show) => !show)} edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  label="Role (admin/member)"
                  value={loginData.role}
                  onChange={e => handleRoleChange(e, 'login')}
                  select
                  SelectProps={{ native: true }}
                  required
                >
                  <option value="member">Member</option>
                  <option value="admin">Admin</option>
                </TextField>
                <Button type="submit" variant="contained" color="primary" size="large">Login</Button>
              </Box>
            )}
            {tab === 1 && (
              <Box component="form" onSubmit={handleSignup} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography variant="h6" align="center">Sign Up</Typography>
                <TextField label="Name" required value={signupData.name} onChange={e => setSignupData({ ...signupData, name: e.target.value })} />
                <TextField label="Email" type="email" required value={signupData.email} onChange={e => setSignupData({ ...signupData, email: e.target.value })} />
                <TextField
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={signupData.password}
                  onChange={e => setSignupData({ ...signupData, password: e.target.value })}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword((show) => !show)} edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  label="Role (admin/member)"
                  value={signupData.role}
                  onChange={e => handleRoleChange(e, 'signup')}
                  select
                  SelectProps={{ native: true }}
                  required
                >
                  <option value="member">Member</option>
                  <option value="admin">Admin</option>
                </TextField>
                <Button type="submit" variant="contained" color="primary" size="large">Sign Up</Button>
              </Box>
            )}
            {tab === 2 && (
              <Box component="form" onSubmit={handleForgot} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography variant="h6" align="center">Forgot Password</Typography>
                <TextField label="Email" type="email" required value={forgotEmail} onChange={e => setForgotEmail(e.target.value)} />
                <Button type="submit" variant="contained" color="primary" size="large">Send Reset Link</Button>
              </Box>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  );
}
