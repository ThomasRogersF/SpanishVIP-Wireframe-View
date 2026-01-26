import React from 'react';
import { Card, CardContent, Typography, Alert, Box, Button } from '@mui/material';
import { iosButtonStyle } from '../shared/sharedStyles';

/**
 * Component to display AI feedback after user voice responses.
 * Shows feedback type (success/error/info), message, optional suggestions,
 * and action buttons for retrying or continuing.
 *
 * @component
 * @param {Object} props - Component props
 * @param {'success' | 'error' | 'info'} props.feedbackType - Type of feedback to display
 * @param {string} props.message - Main feedback message
 * @param {string} [props.suggestion] - Optional suggestion text for improvement
 * @param {Function} [props.onTryAgain] - Callback for "Try Again" button click
 * @param {Function} [props.onContinue] - Callback for "Continue" button click
 * @param {string} [props.continueLabel='Continue'] - Custom label for the continue button
 *
 * @example
 * <FeedbackCard
 *   feedbackType="success"
 *   message="Great pronunciation! You nailed the polite form."
 *   onContinue={handleContinue}
 * />
 *
 * @example
 * <FeedbackCard
 *   feedbackType="error"
 *   message="Almost there!"
 *   suggestion="Try emphasizing 'por favor' more."
 *   onTryAgain={handleTryAgain}
 *   onContinue={handleContinue}
 *   continueLabel="Next Prompt"
 * />
 */
const FeedbackCard = ({
  feedbackType,
  message,
  suggestion,
  onTryAgain,
  onContinue,
  continueLabel = 'Continue'
}) => {
  /**
   * Maps feedbackType to MUI Alert severity
   * @returns {string} Alert severity value
   */
  const getSeverity = () => {
    switch (feedbackType) {
      case 'success':
        return 'success';
      case 'error':
        return 'error';
      case 'info':
      default:
        return 'info';
    }
  };

  return (
    <Card
      sx={{
        borderRadius: '16px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
      }}
    >
      <CardContent sx={{ p: 2 }}>
        {/* Feedback Alert */}
        <Alert 
          severity={getSeverity()}
          sx={{
            borderRadius: '12px',
            '& .MuiAlert-message': {
              fontSize: '14px',
              fontWeight: 500,
            },
          }}
        >
          {message}
        </Alert>

        {/* Optional Suggestion */}
        {suggestion && (
          <Typography
            variant="body2"
            sx={{
              mt: 2,
              color: '#6B7280',
              fontSize: '13px',
              lineHeight: 1.5,
              pl: 1,
            }}
          >
            💡 {suggestion}
          </Typography>
        )}

        {/* Action Buttons */}
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            mt: 2.5,
            justifyContent: 'center',
          }}
        >
          {onTryAgain && (
            <Button
              variant="outlined"
              onClick={onTryAgain}
              sx={{
                ...iosButtonStyle,
                flex: 1,
                borderColor: '#0AA6A6',
                color: '#0AA6A6',
                backgroundColor: 'transparent',
                '&:hover': {
                  backgroundColor: 'rgba(10, 166, 166, 0.08)',
                  borderColor: '#099494',
                },
              }}
            >
              Try Again
            </Button>
          )}
          {onContinue && (
            <Button
              variant="contained"
              onClick={onContinue}
              sx={{
                ...iosButtonStyle,
                flex: 1,
                backgroundColor: '#0AA6A6',
                color: '#FFFFFF',
                '&:hover': {
                  backgroundColor: '#099494',
                },
              }}
            >
              {continueLabel}
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default FeedbackCard;
