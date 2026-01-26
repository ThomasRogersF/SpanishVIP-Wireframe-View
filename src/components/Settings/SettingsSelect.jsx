import React from 'react';
import { Box, Typography, Select, MenuItem, FormControl } from '@mui/material';
import { iosButtonStyle } from '../shared/sharedStyles';

/**
 * SettingsSelect - A dropdown selector for enumerated options
 * (dark mode, language, etc.)
 * 
 * @param {string} label - Select label text
 * @param {string} value - Current selected value
 * @param {function} onChange - Change handler function
 * @param {Array} options - Array of {value, label} objects
 * @param {boolean} disabled - Optional disabled state
 */
const SettingsSelect = ({ label, value, onChange, options = [], disabled = false }) => {
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
      <FormControl fullWidth>
        <Select
          value={value}
          onChange={onChange}
          disabled={disabled}
          sx={{
            borderRadius: '12px',
            minHeight: 48,
            backgroundColor: 'background.paper',
            touchAction: 'manipulation',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'grey.300',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'grey.400',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'primary.main',
            },
            '& .MuiSelect-select': {
              py: 1.5,
              px: 2,
            },
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                borderRadius: '12px',
                mt: 1,
              },
            },
          }}
        >
          {options.map((option) => (
            <MenuItem
              key={option.value}
              value={option.value}
              sx={{
                ...iosButtonStyle,
                py: 1.5,
                px: 2,
                minHeight: 48,
              }}
            >
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default SettingsSelect;
