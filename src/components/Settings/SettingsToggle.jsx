import React from 'react';
import { Box, Typography, Switch } from '@mui/material';
import { touchOptimized } from '../shared/sharedStyles';

/**
 * SettingsToggle - A toggle switch control for boolean settings
 * (sound effects, animations, etc.)
 * 
 * @param {string} label - Toggle label text
 * @param {string} description - Optional description text
 * @param {boolean} checked - Current toggle state
 * @param {function} onChange - Change handler function
 * @param {boolean} disabled - Optional disabled state
 */
const SettingsToggle = ({ label, description, checked, onChange, disabled = false }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        py: 2,
        px: 2.5,
        borderBottom: '1px solid',
        borderColor: 'grey.200',
        minHeight: 48,
        WebkitTapHighlightColor: 'transparent',
        touchAction: 'manipulation',
      }}
    >
      <Box sx={{ flex: 1, mr: 2 }}>
        <Typography
          variant="body1"
          sx={{
            fontWeight: 500,
          }}
        >
          {label}
        </Typography>
        {description && (
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              mt: 0.25,
            }}
          >
            {description}
          </Typography>
        )}
      </Box>
      <Switch
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        sx={{
          ...touchOptimized,
          '& .MuiSwitch-switchBase.Mui-checked': {
            color: 'primary.main',
          },
          '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
            backgroundColor: 'primary.main',
          },
        }}
      />
    </Box>
  );
};

export default SettingsToggle;
