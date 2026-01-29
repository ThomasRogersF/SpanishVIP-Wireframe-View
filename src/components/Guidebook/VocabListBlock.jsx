import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { touchOptimized } from '../shared/sharedStyles';

const VocabListBlock = ({ heading, items }) => {
  const handlePlayAudio = (audio_url) => {
    console.log('[Audio Placeholder] Playing:', audio_url);
  };

  return (
    <Box 
      sx={{ 
        bgcolor: '#FFFFFF', 
        borderRadius: '12px', 
        p: 2.5, 
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)' 
      }}
    >
      {heading && (
        <Typography 
          variant="h3" 
          component="h3" 
          sx={{ 
            fontFamily: 'Lexend', 
            fontSize: { xs: '18px', sm: '20px' }, 
            fontWeight: 600, 
            color: '#1F2937', 
            mb: 1.5 
          }}
        >
          {heading}
        </Typography>
      )}
      <Box component="ul" sx={{ p: 0, m: 0, listStyle: 'none' }}>
        {items.map((item, index) => (
          <Box
            component="li"
            key={index}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              py: 1.5,
              borderBottom: index !== items.length - 1 ? '1px solid #F3F4F6' : 'none'
            }}
          >
            <Box sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
              gap: { xs: 0.5, sm: 2 },
              width: '100%',
              mr: 2,
              alignItems: 'center'
            }}>
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: '16px',
                  color: '#1F2937'
                }}
              >
                {item.es}
              </Typography>
              <Typography
                sx={{
                  fontSize: '15px',
                  color: '#6B7280',
                  fontStyle: 'italic'
                }}
              >
                {item.en}
              </Typography>
            </Box>
            <IconButton
              onClick={() => handlePlayAudio(item.audio_url)}
              sx={{ 
                ...touchOptimized, 
                color: '#14B8A6', 
                '&:hover': { bgcolor: '#F0FDFA' } 
              }}
              aria-label={`Play audio for ${item.es}`}
            >
              <VolumeUpIcon />
            </IconButton>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default VocabListBlock;
