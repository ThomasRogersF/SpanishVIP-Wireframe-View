import React from 'react';
import { Box, Button, IconButton } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SofiaAvatar from '../shared/SofiaAvatar';

const VIPTeachScreen = ({
  currentStep,
  icon,
  iconBgColor,
  spanishPhrase,
  englishTranslation,
  sofiaTip,
  exampleText,
  onBack,
  onNext,
}) => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        padding: '20px',
        position: 'relative',
      }}
    >
      {/* Top Bar with Back Button and Progress Dots */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '32px',
        }}
      >
        <IconButton
          onClick={onBack}
          sx={{
            color: '#666',
          }}
        >
          <ArrowBackIcon />
        </IconButton>

        {/* Progress Dots */}
        <Box
          sx={{
            display: 'flex',
            gap: '8px',
          }}
        >
          {[1, 2, 3].map((step) => (
            <Box
              key={step}
              sx={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: step === currentStep ? '#14B8A6' : '#D1D5DB',
              }}
            />
          ))}
        </Box>

        <Box sx={{ width: '40px' }} />
      </Box>

      {/* Sofia Avatar */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '24px',
        }}
      >
        <SofiaAvatar size={48} />
      </Box>

      {/* Main Content Card */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '32px',
        }}
      >
        {/* Icon */}
        <Box
          sx={{
            width: 120,
            height: 120,
            borderRadius: '16px',
            background: iconBgColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '72px',
            marginBottom: '24px',
          }}
        >
          {icon}
        </Box>

        {/* Spanish Phrase */}
        <Box
          sx={{
            fontSize: '28px',
            fontWeight: 700,
            fontFamily: 'Lexend, sans-serif',
            color: '#1F2937',
            textAlign: 'center',
            marginBottom: '12px',
          }}
        >
          {spanishPhrase}
        </Box>

        {/* English Translation */}
        <Box
          sx={{
            fontSize: '16px',
            color: '#6B7280',
            textAlign: 'center',
            marginBottom: '24px',
          }}
        >
          {englishTranslation}
        </Box>

        {/* Example Text (if provided) */}
        {exampleText && (
          <Box
            sx={{
              background: '#F9FAFB',
              border: '1px solid #E5E7EB',
              borderRadius: '12px',
              padding: '16px',
              marginBottom: '24px',
              textAlign: 'center',
              fontSize: '14px',
              color: '#374151',
              maxWidth: '300px',
            }}
          >
            {exampleText}
          </Box>
        )}
      </Box>

      {/* Sofia's Tip Card */}
      <Box
        sx={{
          background: '#F0F9FF',
          border: '1px solid #BAE6FD',
          borderRadius: '12px',
          padding: '16px',
          marginBottom: '32px',
          display: 'flex',
          gap: '12px',
        }}
      >
        <Box sx={{ flexShrink: 0 }}>
          <SofiaAvatar size={40} />
        </Box>
        <Box>
          <Box
            sx={{
              fontSize: '12px',
              fontWeight: 600,
              color: '#0369A1',
              marginBottom: '4px',
            }}
          >
            Sofia's Tip
          </Box>
          <Box
            sx={{
              fontSize: '14px',
              color: '#1E40AF',
              lineHeight: 1.5,
            }}
          >
            {sofiaTip}
          </Box>
        </Box>
      </Box>

      {/* Floating Next Button */}
      <Box
        sx={{
          position: 'fixed',
          bottom: '32px',
          right: '32px',
          zIndex: 10,
        }}
      >
        <Button
          onClick={onNext}
          sx={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #14B8A6 0%, #0D9488 100%)',
            color: 'white',
            minWidth: 'unset',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            '&:hover': {
              background: 'linear-gradient(135deg, #0D9488 0%, #0F766E 100%)',
            },
            boxShadow: '0 4px 12px rgba(20, 184, 166, 0.3)',
          }}
        >
          <ArrowForwardIcon />
        </Button>
      </Box>
    </Box>
  );
};

export default VIPTeachScreen;
