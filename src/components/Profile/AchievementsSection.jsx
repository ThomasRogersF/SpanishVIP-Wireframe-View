import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import AchievementCard from './AchievementCard';
import { iosButtonStyle } from '../shared/sharedStyles';

const AchievementsSection = ({ achievements, onViewAllClick }) => {
  const displayedAchievements = achievements.slice(0, 4);

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
          px: 0.5,
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: 600 }}
        >
          Achievements
        </Typography>
        
        <Button
          variant="text"
          size="small"
          onClick={onViewAllClick}
          sx={{
            textTransform: 'none',
            ...iosButtonStyle,
          }}
        >
          View all
        </Button>
      </Box>
      
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        {displayedAchievements.map((achievement) => (
          <AchievementCard
            key={achievement.id}
            icon={achievement.icon}
            title={achievement.title}
            description={achievement.description}
            progress={achievement.progress}
            isLocked={achievement.isLocked}
          />
        ))}
      </Box>
    </Box>
  );
};

export default AchievementsSection;
