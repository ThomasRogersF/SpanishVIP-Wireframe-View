import React from 'react';
import { Box, Card, Typography, Button, Chip } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { iosButtonStyle } from '../shared/sharedStyles';

/**
 * Returns color configuration based on error type
 * @param {string} type - Error type: 'grammar', 'spelling', or 'pronunciation'
 * @returns {object} Color configuration with bgcolor and color properties
 */
const getErrorTypeColor = (type) => {
  const colorMap = {
    grammar: { bgcolor: 'info.light', color: 'info.main' },
    spelling: { bgcolor: 'secondary.light', color: 'secondary.main' },
    pronunciation: { bgcolor: 'success.light', color: 'success.main' },
  };
  return colorMap[type] || colorMap.grammar;
};

/**
 * MistakeCard component for displaying error cards with color-coded categories
 * @param {object} props - Component props
 * @param {string} props.type - Error type: 'grammar', 'spelling', or 'pronunciation'
 * @param {string} props.icon - Emoji icon for the error type
 * @param {string} props.wrongText - Incorrect text (for grammar type)
 * @param {string} props.correctText - Correct text (for grammar type)
 * @param {string} props.word - Word to display (for spelling/pronunciation types)
 * @param {string} props.phonetic - Phonetic guide (for pronunciation type)
 * @param {string} props.correction - Correction note (for pronunciation type)
 * @param {string} props.explanation - Explanation text
 * @param {function} props.onFixClick - Handler for Fix button click
 */
const MistakeCard = ({
  type = 'grammar',
  icon = '⚠️',
  wrongText,
  correctText,
  word,
  phonetic,
  correction,
  explanation,
  onFixClick,
}) => {
  const colors = getErrorTypeColor(type);

  const renderContent = () => {
    switch (type) {
      case 'grammar':
        return (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              bgcolor: 'grey.50',
              borderRadius: 3,
              p: 2,
            }}
          >
            <Typography
              sx={{
                textDecoration: 'line-through',
                color: 'error.main',
                fontWeight: 500,
              }}
            >
              {wrongText}
            </Typography>
            <ArrowForwardIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
            <Typography
              sx={{
                color: 'success.main',
                fontWeight: 600,
              }}
            >
              {correctText}
            </Typography>
          </Box>
        );

      case 'spelling':
        return (
          <Box
            sx={{
              bgcolor: 'grey.50',
              borderRadius: 3,
              p: 2,
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              {word}
            </Typography>
          </Box>
        );

      case 'pronunciation':
        return (
          <Box
            sx={{
              bgcolor: 'grey.50',
              borderRadius: 3,
              p: 2,
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
              {word}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {phonetic}
            </Typography>
            {correction && (
              <Typography variant="caption" sx={{ color: 'error.main', display: 'block', mt: 0.5 }}>
                {correction}
              </Typography>
            )}
          </Box>
        );

      default:
        return null;
    }
  };

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
        {/* Left side: Icon + Type Label */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              bgcolor: colors.bgcolor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1rem',
            }}
          >
            {icon}
          </Box>
          <Chip
            label={type}
            size="small"
            sx={{
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: 0.5,
              bgcolor: colors.bgcolor,
              color: colors.color,
              fontSize: '0.75rem',
            }}
          />
        </Box>

        {/* Right side: Fix Button */}
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={onFixClick}
          sx={{
            ...iosButtonStyle,
            minWidth: 60,
            minHeight: 36,
            touchAction: 'manipulation',
            WebkitTapHighlightColor: 'transparent',
          }}
        >
          Fix
        </Button>
      </Box>

      {/* Content Area */}
      {renderContent()}

      {/* Explanation */}
      {explanation && (
        <Typography
          variant="caption"
          sx={{
            color: 'text.secondary',
            mt: 1.5,
            display: 'block',
          }}
        >
          {explanation}
        </Typography>
      )}
    </Card>
  );
};

export default MistakeCard;
