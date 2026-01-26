import React from 'react';
import { Button } from '@mui/material';
import { iosButtonStyle } from '../shared/sharedStyles';

/**
 * SettingsButton - Action buttons for settings operations
 * (logout, export data, delete account)
 * 
 * @param {string} label - Button label text
 * @param {function} onClick - Click handler function
 * @param {string} variant - Optional button variant (default: 'outlined')
 * @param {string} color - Optional button color (default: 'primary')
 * @param {boolean} destructive - Optional flag for dangerous actions
 * @param {boolean} disabled - Optional disabled state
 * @param {React.ReactNode} startIcon - Optional start icon
 */
const SettingsButton = ({ 
  label, 
  onClick, 
  variant = 'outlined', 
  color = 'primary', 
  destructive = false, 
  disabled = false,
  startIcon 
}) => {
  return (
    <Button
      onClick={onClick}
      variant={variant}
      color={destructive ? 'error' : color}
      disabled={disabled}
      startIcon={startIcon}
      fullWidth
      sx={{
        ...iosButtonStyle,
        minHeight: 48,
        borderRadius: '12px',
        py: 1.5,
        px: 2.5,
        mb: 1.5,
        textTransform: 'none',
        fontWeight: 600,
        fontSize: '1rem',
        ...(destructive && {
          color: 'error.main',
          borderColor: 'error.main',
          '&:hover': {
            borderColor: 'error.dark',
            backgroundColor: 'error.light',
          },
        }),
        ...(variant === 'contained' && destructive && {
          backgroundColor: 'error.main',
          color: 'white',
          '&:hover': {
            backgroundColor: 'error.dark',
          },
        }),
      }}
    >
      {label}
    </Button>
  );
};

export default SettingsButton;
