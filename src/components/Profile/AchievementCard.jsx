import React from 'react';
import { Box, Typography, LinearProgress } from '@mui/material';

const AchievementCard = ({ icon, title, description, progress, isLocked }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        p: 2,
        borderRadius: '16px',
        backgroundColor: 'background.paper',
        border: '1px solid',
        borderColor: 'grey.200',
        opacity: isLocked ? 0.6 : 1,
      }}
    >
      <Box
        sx={{
          width: 56,
          height: 56,
          borderRadius: '16px',
          backgroundColor: isLocked ? 'grey.100' : 'primary.light',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '28px',
          flexShrink: 0,
        }}
      >
        {isLocked ? '🔒' : icon}
      </Box>
      
      <Box sx={{ flex: 1 }}>
        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 600,
            color: 'text.primary',
          }}
        >
          {title}
        </Typography>
        
        <Typography
          variant="caption"
          sx={{
            color: 'text.secondary',
            mt: 0.5,
            display: 'block',
          }}
        >
          {description}
        </Typography>
        
        {!isLocked && progress !== undefined && (
          <>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                mt: 1.5,
                height: 6,
                borderRadius: 3,
              }}
            />
            <Typography
              variant="caption"
              sx={{
                color: 'text.secondary',
                mt: 0.5,
                display: 'block',
              }}
            >
              {progress}% complete
            </Typography>
          </>
        )}
      </Box>
    </Box>
  );
};

export default AchievementCard;
