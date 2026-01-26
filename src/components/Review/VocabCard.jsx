import React from 'react';
import { Box, Card, Typography, Button } from '@mui/material';
import { iosButtonStyle } from '../shared/sharedStyles';

/**
 * VocabCard component for displaying vocabulary practice items
 * @param {object} props - Component props
 * @param {string} props.emoji - Emoji icon for the category
 * @param {string} props.category - Category label (e.g., 'Food & Drink', 'Phrases')
 * @param {string} props.word - Spanish word
 * @param {string} props.translation - English translation
 * @param {function} props.onPracticeClick - Handler for Practice button click
 */
const VocabCard = ({
  emoji = '📚',
  category = 'General',
  word,
  translation,
  onPracticeClick,
}) => {
  return (
    <Card
      sx={{
        borderRadius: 4,
        p: 2.5,
        boxShadow: 2,
        border: '1px solid',
        borderColor: 'grey.100',
      }}
    >
      {/* Header Row */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}
      >
        {/* Left side: Emoji + Category Label */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Typography variant="h4" sx={{ lineHeight: 1 }}>
            {emoji}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              fontWeight: 600,
              textTransform: 'uppercase',
              color: 'text.secondary',
              letterSpacing: 0.5,
            }}
          >
            {category}
          </Typography>
        </Box>

        {/* Right side: Practice Button */}
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={onPracticeClick}
          sx={{
            ...iosButtonStyle,
            minWidth: 80,
            minHeight: 36,
            touchAction: 'manipulation',
            WebkitTapHighlightColor: 'transparent',
          }}
        >
          Practice
        </Button>
      </Box>

      {/* Content Area */}
      <Box
        sx={{
          bgcolor: 'grey.50',
          borderRadius: 3,
          p: 2,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: 'text.primary',
            mb: 0.5,
          }}
        >
          {word}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
          }}
        >
          {translation}
        </Typography>
      </Box>
    </Card>
  );
};

export default VocabCard;
