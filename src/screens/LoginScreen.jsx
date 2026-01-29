import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Divider } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import { useNavigation } from '../hooks/useNavigation';
import { iosButtonStyle } from '../components/shared/sharedStyles';

const LoginScreen = () => {
  const { showDashboard } = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Login attempt:', { email, password });
    showDashboard();
  };

  const textFieldStyle = {
    '& .MuiOutlinedInput-root': {
      borderRadius: '12px',
      backgroundColor: '#FFFFFF',
      minHeight: 48,
      touchAction: 'manipulation',
      '& fieldset': {
        borderColor: 'grey.300',
      },
      '&:hover fieldset': {
        borderColor: 'grey.400',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'primary.main',
      },
    },
    '& .MuiInputBase-input': {
      py: 1.5,
      px: 2,
    },
  };

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F9FAFB',
        py: 4,
        px: 3,
        overflow: 'auto',
      }}
    >
      <Box sx={{ width: '100%', maxWidth: 360 }}>
        {/* Logo/Branding Section */}
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography
            variant="h4"
            sx={{
              fontFamily: 'Lexend, sans-serif',
              fontWeight: 700,
              color: '#1F2937',
              mb: 1,
            }}
          >
            SpanishVIP
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontFamily: 'Lexend, sans-serif',
              color: '#6B7280',
            }}
          >
            Master Spanish with confidence
          </Typography>
        </Box>

        {/* Social Login Buttons */}
        <Button
          variant="outlined"
          fullWidth
          startIcon={<GoogleIcon />}
          onClick={showDashboard}
          sx={{
            ...iosButtonStyle,
            backgroundColor: '#FFFFFF',
            borderColor: 'grey.300',
            color: '#374151',
            fontFamily: 'Lexend, sans-serif',
            fontWeight: 600,
            textTransform: 'none',
            minHeight: 48,
            borderRadius: '12px',
            mb: 2,
            '&:hover': {
              backgroundColor: '#F3F4F6',
              borderColor: 'grey.400',
            },
          }}
        >
          Continue with Google
        </Button>

        <Button
          variant="contained"
          fullWidth
          startIcon={<FacebookIcon />}
          onClick={showDashboard}
          sx={{
            ...iosButtonStyle,
            backgroundColor: '#1877F2',
            color: '#FFFFFF',
            fontFamily: 'Lexend, sans-serif',
            fontWeight: 600,
            textTransform: 'none',
            minHeight: 48,
            borderRadius: '12px',
            mb: 3,
            '&:hover': {
              backgroundColor: '#166FE5',
            },
          }}
        >
          Continue with Facebook
        </Button>

        {/* Divider */}
        <Box sx={{ display: 'flex', alignItems: 'center', my: 3 }}>
          <Divider sx={{ flex: 1 }} />
          <Typography
            sx={{
              px: 2,
              fontSize: '0.875rem',
              color: '#6B7280',
              fontFamily: 'Lexend, sans-serif',
            }}
          >
            OR
          </Typography>
          <Divider sx={{ flex: 1 }} />
        </Box>

        {/* Email/Password Form */}
        <form onSubmit={handleLogin}>
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              variant="outlined"
              label="Email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              sx={textFieldStyle}
            />
          </Box>

          <Box sx={{ mb: 1.5 }}>
            <TextField
              fullWidth
              variant="outlined"
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              sx={textFieldStyle}
            />
          </Box>

          {/* Forgot Password Link */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
            <Typography
              variant="body2"
              onClick={() => console.log('Forgot password clicked')}
              sx={{
                color: '#3B82F6',
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: 'Lexend, sans-serif',
                ...iosButtonStyle,
              }}
            >
              Forgot password?
            </Typography>
          </Box>

          {/* Login Button */}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              ...iosButtonStyle,
              background: 'linear-gradient(135deg, #0D9488 0%, #0AA6A6 100%)',
              color: '#FFFFFF',
              fontFamily: 'Lexend, sans-serif',
              fontWeight: 600,
              fontSize: '1rem',
              py: 1.5,
              borderRadius: '12px',
              textTransform: 'none',
              boxShadow: '0 4px 12px rgba(13, 148, 136, 0.3)',
              mb: 3,
              '&:hover': {
                background: 'linear-gradient(135deg, #0D9488 0%, #0AA6A6 100%)',
              },
            }}
          >
            Log In
          </Button>
        </form>

        {/* Sign Up Link */}
        <Box sx={{ textAlign: 'center' }}>
          <Typography
            variant="body2"
            sx={{
              color: '#6B7280',
              fontFamily: 'Lexend, sans-serif',
            }}
          >
            Don't have an account?{' '}
            <Typography
              component="span"
              onClick={() => console.log('Sign up clicked')}
              sx={{
                color: '#3B82F6',
                fontWeight: 600,
                cursor: 'pointer',
                ...iosButtonStyle,
              }}
            >
              Sign up
            </Typography>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginScreen;
