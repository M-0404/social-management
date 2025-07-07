import React from 'react';
import { Box, Card, CardContent, Typography, TextField, Button, Tabs, Tab, Checkbox, FormControlLabel, IconButton, InputAdornment, CircularProgress, Alert, Tooltip, Stack } from '@mui/material';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function AuthPage({ onAuth }) {
  // Social login handlers
  const handleGoogleLogin = () => {
    setErrorMsg("");
    setSuccessMsg("Google login successful! (Demo)");
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 1800);
    onAuth && onAuth('google', { provider: 'google' });
  };
  const handleFacebookLogin = () => {
    setErrorMsg("");
    setSuccessMsg("Facebook login successful! (Demo)");
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 1800);
    onAuth && onAuth('facebook', { provider: 'facebook' });
  };
  const [tab, setTab] = useState(0);
  const [loginData, setLoginData] = useState({ email: '', password: '', remember: false });
  const [signupData, setSignupData] = useState({ name: '', email: '', password: '', role: 'member' });
  const [forgotEmail, setForgotEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);

  const handleTabChange = (_, newValue) => {
    setTab(newValue);
    setErrorMsg('');
    setSuccessMsg('');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    if (!loginData.email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) {
      setErrorMsg('Please enter a valid email.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccessMsg('Login successful!');
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 1800);
      onAuth && onAuth('login', loginData);
    }, 1200);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    if (!signupData.email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) {
      setErrorMsg('Please enter a valid email.');
      return;
    }
    if (signupData.password.length < 6) {
      setErrorMsg('Password must be at least 6 characters.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccessMsg('Signup successful! You can now log in.');
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 1800);
      onAuth && onAuth('signup', signupData);
    }, 1200);
  };

  const handleForgot = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    if (!forgotEmail.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) {
      setErrorMsg('Please enter a valid email.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccessMsg('Reset link sent! Check your email.');
      onAuth && onAuth('forgot', { email: forgotEmail });
    }, 1200);
  };

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 120, damping: 12 } },
    exit: { opacity: 0, y: -40, scale: 0.95, transition: { duration: 0.3 } }
  };
  const formVariants = {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, x: -40, transition: { duration: 0.3 } }
  };
  const buttonVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.07, boxShadow: '0px 4px 20px 0px #1976d255' },
    tap: { scale: 0.97 }
  };

  // Card pulse animation
  const pulseVariants = {
    animate: {
      boxShadow: [
        '0 4px 32px 0 #1976d255',
        '0 8px 40px 0 #21cbf355',
        '0 4px 32px 0 #1976d255'
      ],
      transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
    }
  };

  // Animated gradient border for card
  const borderAnim = {
    animate: {
      background: [
        'linear-gradient(120deg, #1976d2 0%, #21cbf3 100%)',
        'linear-gradient(120deg, #21cbf3 0%, #1976d2 100%)',
        'linear-gradient(120deg, #1976d2 0%, #21cbf3 100%)'
      ],
      transition: { duration: 8, repeat: Infinity, ease: 'linear' }
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(120deg, #1976d2 0%, #21cbf3 100%)', position: 'relative', overflow: 'hidden' }}>
      {/* Animated floating background shapes */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.18, y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
        style={{ position: 'absolute', width: 220, height: 220, borderRadius: '50%', background: 'radial-gradient(circle, #fff 0%, #21cbf3 80%)', top: -60, left: -80, zIndex: 0 }}
      ></motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.12, y: [0, -30, 0] }}
        transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut' }}
        style={{ position: 'absolute', width: 180, height: 180, borderRadius: '50%', background: 'radial-gradient(circle, #fff 0%, #1976d2 80%)', bottom: -50, right: -60, zIndex: 0 }}
      ></motion.div>
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        style={{ zIndex: 1 }}
      >
        <motion.div variants={borderAnim} animate="animate" style={{ padding: 4, borderRadius: 24, background: 'linear-gradient(120deg, #1976d2 0%, #21cbf3 100%)' }}>
          <motion.div variants={pulseVariants} animate="animate">
            <Card sx={{ minWidth: 350, maxWidth: 400, borderRadius: 4, boxShadow: 6, background: 'rgba(255,255,255,0.97)', border: '4px solid transparent', backgroundClip: 'padding-box' }}>
              <CardContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 1 }}>
                  <LockOutlinedIcon sx={{ fontSize: 48, color: '#1976d2', mb: 1, boxShadow: 2 }} />
                  <Typography variant="h5" sx={{ fontWeight: 700, color: '#1976d2', mb: 0.5 }}>Welcome!</Typography>
                  <Typography variant="body2" sx={{ color: '#1976d2', mb: 1 }}>Sign in or create an account to manage your society</Typography>
                </Box>
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.6, type: 'spring', bounce: 0.5 }}
                >
                  <Tabs value={tab} onChange={handleTabChange} centered sx={{ mb: 2 }}>
                    <Tab label="Login" />
                    <Tab label="Sign Up" />
                    <Tab label="Forgot Password" />
                  </Tabs>
                </motion.div>
                {/* Social login buttons */}
                {tab !== 2 && (
                  <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 2 }}>
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        variant="outlined"
                        color="primary"
                        startIcon={<GoogleIcon />}
                        sx={{ textTransform: 'none', fontWeight: 600 }}
                        fullWidth
                        onClick={handleGoogleLogin}
                      >
                        Google
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        variant="outlined"
                        color="info"
                        startIcon={<FacebookIcon />}
                        sx={{ textTransform: 'none', fontWeight: 600 }}
                        fullWidth
                        onClick={handleFacebookLogin}
                      >
                        Facebook
                      </Button>
                    </motion.div>
                  </Stack>
                )}
                {errorMsg && <Alert severity="error" sx={{ mb: 1 }}>{errorMsg}</Alert>}
                {successMsg && <Alert severity="success" sx={{ mb: 1 }}>{successMsg}</Alert>}
                <AnimatePresence mode="wait" initial={false}>
                  {tab === 0 && (
                    <motion.div
                      key="login"
                      variants={formVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      style={{ width: '100%' }}
                    >
                      <Box component="form" onSubmit={handleLogin} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField label="Email" type="email" required value={loginData.email} onChange={e => setLoginData({ ...loginData, email: e.target.value })} autoComplete="username" />
                        <Tooltip title="Password must be at least 6 characters" arrow placement="right">
                          <TextField
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            required
                            value={loginData.password}
                            onChange={e => setLoginData({ ...loginData, password: e.target.value })}
                            autoComplete="current-password"
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton onClick={() => setShowPassword(v => !v)} edge="end" size="small">
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                  </IconButton>
                                </InputAdornment>
                              )
                            }}
                          />
                        </Tooltip>
                        <FormControlLabel
                          control={<Checkbox checked={loginData.remember} onChange={e => setLoginData({ ...loginData, remember: e.target.checked })} />}
                          label="Remember Me"
                          sx={{ alignSelf: 'flex-start', ml: 0.5 }}
                        />
                        <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap" initial="rest" animate="rest">
                          <Button type="submit" variant="contained" color="primary" size="large" fullWidth disabled={loading} startIcon={loading && <CircularProgress size={20} color="inherit" />}>Login</Button>
                        </motion.div>
                      </Box>
                    </motion.div>
                  )}
                  {tab === 1 && (
                    <motion.div
                      key="signup"
                      variants={formVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      style={{ width: '100%' }}
                    >
                      <Box component="form" onSubmit={handleSignup} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField label="Name" required value={signupData.name} onChange={e => setSignupData({ ...signupData, name: e.target.value })} />
                        <TextField label="Email" type="email" required value={signupData.email} onChange={e => setSignupData({ ...signupData, email: e.target.value })} autoComplete="username" />
                        <Tooltip title="Password must be at least 6 characters" arrow placement="right">
                          <TextField
                            label="Password"
                            type={showSignupPassword ? 'text' : 'password'}
                            required
                            value={signupData.password}
                            onChange={e => setSignupData({ ...signupData, password: e.target.value })}
                            autoComplete="new-password"
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton onClick={() => setShowSignupPassword(v => !v)} edge="end" size="small">
                                    {showSignupPassword ? <VisibilityOff /> : <Visibility />}
                                  </IconButton>
                                </InputAdornment>
                              )
                            }}
                          />
                        </Tooltip>
                        <TextField label="Role (admin/member)" required value={signupData.role} onChange={e => setSignupData({ ...signupData, role: e.target.value })} />
                        <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap" initial="rest" animate="rest">
                          <Button type="submit" variant="contained" color="primary" size="large" fullWidth disabled={loading} startIcon={loading && <CircularProgress size={20} color="inherit" />}>Sign Up</Button>
                        </motion.div>
                      </Box>
                    </motion.div>
                  )}
                  {tab === 2 && (
                    <motion.div
                      key="forgot"
                      variants={formVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      style={{ width: '100%' }}
                    >
                      <Box component="form" onSubmit={handleForgot} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField label="Email" type="email" required value={forgotEmail} onChange={e => setForgotEmail(e.target.value)} autoComplete="username" />
                        <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap" initial="rest" animate="rest">
                          <Button type="submit" variant="contained" color="primary" size="large" fullWidth disabled={loading} startIcon={loading && <CircularProgress size={20} color="inherit" />}>Send Reset Link</Button>
                        </motion.div>
                        <Button color="primary" sx={{ mt: 1, textTransform: 'none' }} onClick={() => setTab(0)}>
                          ← Back to Login
                        </Button>
                        <Button color="info" sx={{ mt: 1, textTransform: 'none' }} onClick={() => window.open('mailto:support@yoursociety.com', '_blank')}>
                          Need help?
                        </Button>
                      </Box>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </motion.div>
      {/* Confetti animation */}
      <AnimatePresence>
        {showConfetti && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1, rotate: [0, 10, -10, 0] }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 1.2 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              pointerEvents: 'none',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="320" height="180" viewBox="0 0 320 180">
              <g>
                {[...Array(18)].map((_, i) => (
                  <motion.circle
                    key={i}
                    cx={Math.random() * 320}
                    cy={Math.random() * 180}
                    r={6 + Math.random() * 6}
                    fill={`hsl(${Math.random() * 360},90%,60%)`}
                    animate={{
                      cy: [Math.random() * 180, 180 + Math.random() * 40],
                      opacity: [1, 0],
                    }}
                    transition={{ duration: 1.2, delay: Math.random() * 0.5 }}
                  />
                ))}
              </g>
            </svg>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.7 }}
              style={{ position: 'absolute', top: 60, left: '50%', transform: 'translateX(-50%)' }}
            >
              <svg width="60" height="60" viewBox="0 0 60 60">
                <circle cx="30" cy="30" r="28" fill="#4caf50" opacity="0.2" />
                <polyline points="18,32 28,42 44,20" fill="none" stroke="#4caf50" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
}
