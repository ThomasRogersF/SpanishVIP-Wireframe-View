import React from 'react';
import { Box, Typography, Card, CardContent, Button, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import SofiaAvatar from '../components/shared/SofiaAvatar';
import { useNavigation } from '../hooks/useNavigation.js';
import { iosButtonStyle } from '../components/shared/sharedStyles';

/**
 * SerEstarConceptScreen - Grammar lesson introduction for Ser vs Estar
 * Uses useNavigation hook for navigation - no props required
 */
const SerEstarConceptScreen = () => {
  // Get navigation functions from context
  const { showSerEstarLogic, showDashboard } = useNavigation();

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: '#F8FAFC',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          p: 2,
          bgcolor: 'white',
          borderBottom: '1px solid #E2E8F0',
        }}
      >
        <IconButton onClick={showDashboard} sx={{ mr: 1 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography
          variant="h6"
          sx={{
            fontFamily: 'Lexend',
            fontWeight: 600,
            color: '#1E293B',
          }}
        >
          Grammar: Ser vs Estar
        </Typography>
      </Box>

      {/* Content */}
      <Box
        sx={{
          flex: 1,
          overflow: 'auto',
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        {/* Sofia Introduction */}
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, mb: 1 }}>
          <SofiaAvatar size={48} />
          <Box
            sx={{
              bgcolor: 'white',
              borderRadius: '16px',
              p: 2,
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              flex: 1,
            }}
          >
            <Typography sx={{ fontSize: '14px', color: '#475569', lineHeight: 1.5 }}>
              ¡Hola! Let's learn one of the most important concepts in Spanish - when to use <strong>SER</strong> vs <strong>ESTAR</strong>. Both mean "to be" but are used differently!
            </Typography>
          </Box>
        </Box>

        {/* SER Card */}
        <Card
          sx={{
            bgcolor: '#E0F2FE',
            borderLeft: '4px solid #0EA5E9',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          }}
        >
          <CardContent>
            <Typography
              sx={{
                fontFamily: 'Lexend',
                fontWeight: 600,
                fontSize: '16px',
                color: '#0369A1',
                mb: 1.5,
              }}
            >
              SER - Permanent & Identity
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Box>
                <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#0C4A6E' }}>
                  "Soy profesor"
                </Typography>
                <Typography sx={{ fontSize: '13px', color: '#475569' }}>
                  I am a teacher
                </Typography>
              </Box>
              <Box>
                <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#0C4A6E' }}>
                  "Eres inteligente"
                </Typography>
                <Typography sx={{ fontSize: '13px', color: '#475569' }}>
                  You are smart
                </Typography>
              </Box>
            </Box>
            <Box sx={{ mt: 2, pt: 1.5, borderTop: '1px solid rgba(14, 165, 233, 0.3)' }}>
              <Typography sx={{ fontSize: '12px', color: '#0369A1', fontWeight: 500 }}>
                Use for: Occupation • Personality • Origin • Time
              </Typography>
            </Box>
          </CardContent>
        </Card>

        {/* ESTAR Card */}
        <Card
          sx={{
            bgcolor: '#FEF3C7',
            borderLeft: '4px solid #F59E0B',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          }}
        >
          <CardContent>
            <Typography
              sx={{
                fontFamily: 'Lexend',
                fontWeight: 600,
                fontSize: '16px',
                color: '#B45309',
                mb: 1.5,
              }}
            >
              ESTAR - Temporary & Location
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Box>
                <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#78350F' }}>
                  "Estoy cansado"
                </Typography>
                <Typography sx={{ fontSize: '13px', color: '#475569' }}>
                  I am tired
                </Typography>
              </Box>
              <Box>
                <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#78350F' }}>
                  "Estás en Madrid"
                </Typography>
                <Typography sx={{ fontSize: '13px', color: '#475569' }}>
                  You are in Madrid
                </Typography>
              </Box>
            </Box>
            <Box sx={{ mt: 2, pt: 1.5, borderTop: '1px solid rgba(245, 158, 11, 0.3)' }}>
              <Typography sx={{ fontSize: '12px', color: '#B45309', fontWeight: 500 }}>
                Use for: Emotions • Location • Conditions • Progressive actions
              </Typography>
            </Box>
          </CardContent>
        </Card>

        {/* Memory Tip Card */}
        <Card
          sx={{
            bgcolor: '#F0FDF4',
            border: '1px solid #86EFAC',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          }}
        >
          <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <LightbulbIcon sx={{ color: '#22C55E', fontSize: 28 }} />
            <Box>
              <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#166534', mb: 0.5 }}>
                Memory Tip
              </Typography>
              <Typography sx={{ fontSize: '14px', color: '#15803D' }}>
                Think: <strong>SER = WHO you are</strong>, <strong>ESTAR = HOW you are</strong>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Continue Button */}
      <Box sx={{ p: 2, bgcolor: 'white', borderTop: '1px solid #E2E8F0' }}>
        <Button
          fullWidth
          variant="contained"
          onClick={showSerEstarLogic}
          sx={{
            ...iosButtonStyle,
            bgcolor: '#0AA6A6',
            '&:hover': { bgcolor: '#099090' },
          }}
        >
          Continue to Logic Check
        </Button>
      </Box>
    </Box>
  );
};

export default SerEstarConceptScreen;
