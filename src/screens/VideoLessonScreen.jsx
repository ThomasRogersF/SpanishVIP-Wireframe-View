import React, { useState } from 'react';
import { Box, Typography, IconButton, Button, Card, CardContent } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigation } from '../hooks/useNavigation';
import { iosButtonStyle } from '../components/shared/sharedStyles';
import SofiaAvatar from '../components/shared/SofiaAvatar';
import VimeoPlayer from '../components/Lesson/VimeoPlayer';

const VideoLessonScreen = () => {
  const { showDashboard, showSuccess } = useNavigation();
  const [showCompletionPrompt, setShowCompletionPrompt] = useState(false);

  const handleMarkComplete = () => {
    setShowCompletionPrompt(true);
  };

  const handleSuccess = () => {
    showSuccess();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        bgcolor: '#F8FAFC',
        overflow: 'hidden'
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          bgcolor: 'white',
          px: 2,
          py: 2,
          borderBottom: '1px solid #E2E8F0'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            onClick={showDashboard}
            sx={{ mr: 1 }}
            aria-label="Go back to dashboard"
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography
            variant="h6"
            sx={{
              fontFamily: 'Lexend, sans-serif',
              fontWeight: 600,
              color: '#1E293B',
              fontSize: '1.1rem'
            }}
          >
            L3: El Participio - Video Lesson
          </Typography>
        </Box>
      </Box>

      {/* Main Content Area */}
      <Box
        sx={{
          flex: 1,
          overflow: 'auto',
          px: 2,
          py: 2
        }}
      >
        {/* Sofia Introduction Card */}
        <Card
          sx={{
            mb: 2,
            borderRadius: '16px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
            bgcolor: 'white'
          }}
        >
          <CardContent sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
            <SofiaAvatar size={48} />
            <Box>
              <Typography
                variant="body1"
                sx={{
                  fontFamily: 'Inter, sans-serif',
                  color: '#334155',
                  lineHeight: 1.6
                }}
              >
                ¡Hola! In this video lesson, you'll learn about <strong>el participio</strong> (past participles) in Spanish. Watch carefully and follow along with the examples!
              </Typography>
            </Box>
          </CardContent>
        </Card>

        {/* Vimeo Player */}
        <VimeoPlayer
          videoId="1159303752"
          title="39A - El Participio"
        />

        {/* Completion Prompt Card */}
        {showCompletionPrompt && (
          <Card
            sx={{
              mb: 2,
              borderRadius: '16px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
              bgcolor: 'white',
              border: '2px solid #0AA6A6'
            }}
          >
            <CardContent sx={{ textAlign: 'center' }}>
              <SofiaAvatar size={64} sx={{ mb: 2 }} />
              <Typography
                variant="h6"
                sx={{
                  fontFamily: 'Lexend, sans-serif',
                  fontWeight: 600,
                  color: '#0AA6A6',
                  mb: 1
                }}
              >
                ¡Excelente!
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontFamily: 'Inter, sans-serif',
                  color: '#334155',
                  lineHeight: 1.6
                }}
              >
                You've completed the video lesson on <strong>el participio</strong>. You now understand how to form and use past participles in Spanish!
              </Typography>
            </CardContent>
          </Card>
        )}
      </Box>

      {/* Bottom Action Section */}
      <Box
        sx={{
          bgcolor: 'white',
          borderTop: '1px solid #E2E8F0',
          px: 2,
          py: 2
        }}
      >
        <Button
          fullWidth
          variant="contained"
          onClick={showCompletionPrompt ? handleSuccess : handleMarkComplete}
          sx={{
            ...iosButtonStyle,
            bgcolor: '#0AA6A6',
            color: 'white',
            py: 1.5,
            fontSize: '1rem',
            fontWeight: 600,
            fontFamily: 'Lexend, sans-serif',
            '&:hover': {
              bgcolor: '#089999'
            }
          }}
          aria-label={showCompletionPrompt ? 'Continue to success screen' : 'Mark lesson as complete'}
        >
          {showCompletionPrompt ? 'Continue' : 'Mark as Complete'}
        </Button>
      </Box>
    </Box>
  );
};

export default VideoLessonScreen;
