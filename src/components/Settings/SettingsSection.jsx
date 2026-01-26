import React from 'react';
import { Box, Typography } from '@mui/material';

/**
 * SettingsSection - A reusable section wrapper component that groups related settings
 * with a title and optional description.
 * 
 * @param {string} title - Section title
 * @param {string} description - Optional description text
 * @param {React.ReactNode} children - Child components to render inside the section
 */
const SettingsSection = ({ title, description, children }) => {
  return (
    <Box
      sx={{
        mt: 3,
        backgroundColor: 'background.paper',
        borderRadius: '16px',
        overflow: 'hidden',
      }}
    >
      <Box sx={{ px: 2.5, pt: 2.5, pb: 1 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            mb: description ? 0.5 : 0,
          }}
        >
          {title}
        </Typography>
        {description && (
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
            }}
          >
            {description}
          </Typography>
        )}
      </Box>
      <Box>{children}</Box>
    </Box>
  );
};

export default SettingsSection;
