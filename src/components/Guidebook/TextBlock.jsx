import React from 'react';
import { Box, Typography } from '@mui/material';

const TextBlock = ({ heading, body }) => {
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
      {Array.isArray(body) ? (
        body.map((paragraph, index) => (
          <Typography
            key={index}
            variant="body1"
            sx={{
              fontSize: { xs: '15px', sm: '16px' },
              lineHeight: 1.6,
              color: '#6B7280',
              mb: index !== body.length - 1 ? 2 : 0
            }}
          >
            {paragraph}
          </Typography>
        ))
      ) : (
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: '15px', sm: '16px' },
            lineHeight: 1.6,
            color: '#6B7280'
          }}
        >
          {body}
        </Typography>
      )}
    </Box>
  );
};

export default TextBlock;
