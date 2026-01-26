import React from 'react';
import { Box, Typography, Card } from '@mui/material';
import SofiaAvatar from '../shared/SofiaAvatar';

const ProfileHeader = ({ name, username, joinDate, friendCount, avatarEmoji }) => {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: '24px',
        padding: '24px',
        backgroundColor: 'background.paper',
        textAlign: 'center',
      }}
    >
      <SofiaAvatar size="large" showGradientBorder={true} emoji={avatarEmoji} />
      
      <Typography
        variant="h5"
        sx={{
          fontWeight: 700,
          color: 'text.primary',
          mt: 2,
        }}
      >
        {name}
      </Typography>
      
      <Typography
        variant="body2"
        sx={{
          color: 'text.secondary',
          mt: 0.5,
        }}
      >
        {username}
      </Typography>
      
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 4,
          mt: 3,
        }}
      >
        <Box sx={{ textAlign: 'center' }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: 600 }}
          >
            {joinDate}
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: 'text.secondary' }}
          >
            Joined
          </Typography>
        </Box>
        
        <Box sx={{ textAlign: 'center' }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: 600 }}
          >
            {friendCount}
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: 'text.secondary' }}
          >
            Friends
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};

export default ProfileHeader;
