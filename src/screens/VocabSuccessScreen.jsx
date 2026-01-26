import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import CheckIcon from '@mui/icons-material/Check'
import BoltIcon from '@mui/icons-material/Bolt'
import StatCard from '../components/shared/StatCard.jsx'
import SofiaAvatar from '../components/shared/SofiaAvatar.jsx'
import { useNavigation } from '../hooks/useNavigation.js'
import { iosButtonStyle } from '../components/shared/sharedStyles'

/**
 * VocabSuccessScreen - Drill completion summary with stats and learned words
 * Shows success message, accuracy stats, XP earned, and vocabulary summary
 * Uses useNavigation hook for navigation - no props required
 */
function VocabSuccessScreen() {
  // Get navigation functions from context
  const { showDashboard } = useNavigation()

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        bgcolor: '#F9FAFB',
        p: 2,
        overflow: 'auto',
      }}
    >
      {/* Success Icon */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mb: 3,
          mt: 2,
        }}
      >
        <Box
          sx={{
            width: '128px',
            height: '128px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 24px rgba(34, 197, 94, 0.3)',
          }}
        >
          <CheckIcon
            sx={{
              fontSize: '64px',
              color: '#FFFFFF',
            }}
          />
        </Box>
      </Box>

      {/* Headline */}
      <Typography
        sx={{
          fontFamily: 'Lexend',
          fontSize: '28px',
          fontWeight: '700',
          color: '#111827',
          textAlign: 'center',
          mb: 1,
        }}
      >
        Drill Complete!
      </Typography>

      {/* Subheadline */}
      <Typography
        variant="body1"
        sx={{
          color: '#64748B',
          textAlign: 'center',
          mb: 4,
          fontSize: '16px',
        }}
      >
        You learned 2 new words
      </Typography>

      {/* Stats Section */}
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          mb: 4,
          justifyContent: 'center',
        }}
      >
        <StatCard
          icon={<CheckIcon />}
          value="100%"
          label="Accuracy"
          backgroundColor="#E9D5FF"
          iconColor="#A855F7"
        />
        <StatCard
          icon={<BoltIcon />}
          value="+5 XP"
          label="Earned"
          backgroundColor="#CCFBF1"
          iconColor="#14B8A6"
        />
        <StatCard
          icon="📚"
          value="2"
          label="Words"
          backgroundColor="#FED7AA"
        />
      </Box>

      {/* Vocabulary Summary Card */}
      <Card
        sx={{
          bgcolor: '#FFFFFF',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
          mb: 3,
        }}
      >
        <CardContent>
          <Typography
            variant="body2"
            sx={{
              fontWeight: '700',
              color: '#111827',
              mb: 2,
              fontSize: '14px',
            }}
          >
            Words You Learned
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {/* Word 1 */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                pb: 1.5,
                borderBottom: '1px solid #E5E7EB',
              }}
            >
              <Typography sx={{ fontSize: '24px' }}>🍷</Typography>
              <Box>
                <Typography
                  sx={{
                    fontWeight: '600',
                    color: '#111827',
                    fontSize: '14px',
                  }}
                >
                  Tinto
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: '#64748B',
                    fontSize: '13px',
                  }}
                >
                  Red wine
                </Typography>
              </Box>
            </Box>

            {/* Word 2 */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
              }}
            >
              <Typography sx={{ fontSize: '24px' }}>🧾</Typography>
              <Box>
                <Typography
                  sx={{
                    fontWeight: '600',
                    color: '#111827',
                    fontSize: '14px',
                  }}
                >
                  La Cuenta
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: '#64748B',
                    fontSize: '13px',
                  }}
                >
                  The bill/check
                </Typography>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Sofia Feedback Card */}
      <Card
        sx={{
          bgcolor: '#F0FDFA',
          border: '1px solid #CCFBF1',
          borderRadius: '12px',
          mb: 4,
        }}
      >
        <CardContent>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <SofiaAvatar
              size="small"
              emoji="🎉"
              showGradientBorder={false}
            />
            <Box>
              <Typography
                variant="body2"
                sx={{
                  color: '#111827',
                  fontWeight: '600',
                  mb: 0.5,
                  fontSize: '14px',
                }}
              >
                ¡Excelente!
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: '#475569',
                  fontSize: '13px',
                }}
              >
                These words will help you at restaurants.
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          mt: 'auto',
        }}
      >
        <Button
          fullWidth
          variant="contained"
          onClick={showDashboard}
          sx={{
            ...iosButtonStyle,
            background: 'linear-gradient(135deg, #14B8A6 0%, #0D9488 100%)',
            color: '#FFFFFF',
            boxShadow: '0 4px 12px rgba(20, 184, 166, 0.3)',
          }}
        >
          Back to Dashboard
        </Button>
        <Button
          fullWidth
          variant="text"
          onClick={() => console.log('Practice Again clicked')}
          sx={{
            ...iosButtonStyle,
            color: '#3B82F6',
            '&:hover': {
              backgroundColor: 'rgba(59, 130, 246, 0.08)',
            },
          }}
        >
          Practice Again
        </Button>
      </Box>
    </Box>
  )
}

export default VocabSuccessScreen
