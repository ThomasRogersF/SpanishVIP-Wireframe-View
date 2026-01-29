import React from 'react';
import { Box, Typography } from '@mui/material';

const TipBoxBlock = ({ content }) => {
  // Check if content already starts with an emoji or icon
  const hasIcon = content && (content.trim().startsWith('💡') || content.trim().startsWith('⚠️') || content.trim().startsWith('ℹ️'));
  const displayContent = hasIcon ? content : `💡 ${content}`;

  return (
    <Box 
      sx={{ 
        bgcolor: '#FEF3C7', 
        borderRadius: '12px', 
        p: 2.5, 
        border: '2px solid #FDE68A',
        boxShadow: '0 2px 8px rgba(251, 191, 36, 0.15)'
      }}
    >
      <Typography 
        sx={{ 
          fontSize: { xs: '15px', sm: '16px' }, 
          lineHeight: 1.6, 
          color: '#92400E',
          fontWeight: 500
        }}
      >
        {displayContent}
      </Typography>
    </Box>
  );
};

export default TipBoxBlock;
