import React from 'react';
import { Box, Typography } from '@mui/material';
import StatCard from '../shared/StatCard';

const StatisticsSection = ({ streak, totalXP, currentLeague, topFinishes }) => {
  return (
    <Box>
      <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
          mb: 2,
          px: 0.5,
        }}
      >
        Statistics
      </Typography>
      
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 2,
        }}
      >
        <StatCard
          icon="🔥"
          value={streak}
          label="Day Streak"
          backgroundColor="#FEF3C7"
        />
        
        <StatCard
          icon="⭐"
          value={totalXP}
          label="Total XP"
          backgroundColor="#DBEAFE"
        />
        
        <StatCard
          icon="🏆"
          value={currentLeague}
          label="Current League"
          backgroundColor="#FCE7F3"
        />
        
        <StatCard
          icon="🥇"
          value={topFinishes}
          label="Top 3 Finishes"
          backgroundColor="#D1FAE5"
        />
      </Box>
    </Box>
  );
};

export default StatisticsSection;
