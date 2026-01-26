import React from 'react';
import { Box, Typography, TextField } from '@mui/material';

/**
 * SettingsInput - A text input field for editable settings
 * (name, username, email, etc.)
 * 
 * @param {string} label - Input label text
 * @param {string} value - Current input value
 * @param {function} onChange - Change handler function
 * @param {string} type - Optional input type (default: 'text')
 * @param {string} placeholder - Optional placeholder text
 * @param {boolean} disabled - Optional disabled state
 */
const SettingsInput = ({ 
  label, 
  value, 
  onChange, 
  type = 'text', 
  placeholder, 
  disabled = false 
}) => {
  return (
    <Box
      sx={{
        py: 2,
        px: 2.5,
        borderBottom: '1px solid',
        borderColor: 'grey.200',
      }}
    >
      <Typography
        variant="body2"
        sx={{
          fontWeight: 600,
          mb: 1,
        }}
      >
        {label}
      </Typography>
      <TextField
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        variant="outlined"
        fullWidth
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            backgroundColor: 'background.paper',
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
        }}
      />
    </Box>
  );
};

export default SettingsInput;
