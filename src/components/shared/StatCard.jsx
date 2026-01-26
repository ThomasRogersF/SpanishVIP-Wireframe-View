import React from 'react';
import { Box, Typography } from '@mui/material';

/**
 * Reusable stat card component for displaying metrics
 * @param {Object} props
 * @param {React.ReactNode} props.icon - Icon element or emoji
 * @param {string} props.value - Main stat value (e.g., "100%", "+10 XP")
 * @param {string} props.label - Description label (e.g., "Accuracy", "Earned")
 * @param {string} props.backgroundColor - Card background color
 * @param {string} props.iconColor - Icon color (optional, for MUI icons)
 */
const StatCard = ({ icon, value, label, backgroundColor, iconColor }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1,
      }}
    >
      {/* Icon Container */}
      <Box
        sx={{
          width: 56,
          height: 56,
          borderRadius: '16px',
          backgroundColor: backgroundColor,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 1,
          '& .MuiSvgIcon-root': {
            color: iconColor,
            fontSize: 24,
          },
        }}
      >
        {typeof icon === 'string' ? (
          <Typography sx={{ fontSize: 24 }}>{icon}</Typography>
        ) : (
          icon
        )}
      </Box>
      
      {/* Value */}
      <Typography
        sx={{
          fontFamily: 'Lexend, sans-serif',
          fontWeight: 600,
          fontSize: '0.875rem',
          color: '#1F2937',
          lineHeight: 1.2,
        }}
      >
        {value}
      </Typography>
      
      {/* Label */}
      <Typography
        sx={{
          fontFamily: 'Lexend, sans-serif',
          fontSize: '0.75rem',
          color: '#6B7280',
          lineHeight: 1.2,
        }}
      >
        {label}
      </Typography>
    </Box>
  );
};

export default StatCard;
