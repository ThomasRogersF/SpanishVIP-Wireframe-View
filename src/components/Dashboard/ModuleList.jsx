import { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Chip from '@mui/material/Chip'
import { iosButtonStyle } from '../shared/sharedStyles.js'

/**
 * ModuleList - Curriculum module list with expandable lessons
 * Displays modules matching the original dashboard HTML structure
 *
 * Props:
 * - onVIPSurvivalClick: Handler for VIP Survival Phrases lesson (Module 1, L4)
 * - onVocabDrillClick: Handler for Vocabulary Drill lesson (Module 2, L2)
 * - onSerEstarClick: Handler for Ser vs Estar lesson (Module 2, L3)
 * - onTravelLessonClick: Handler for Travel Lesson - Vamos a Viajar (Module 3, L1)
 * - showLockedModule: Boolean to conditionally render locked Module 3 (default true)
 */
function ModuleList({
  onSerEstarClick,
  onVocabDrillClick,
  onVIPSurvivalClick,
  onTravelLessonClick,
  showLockedModule = true
}) {
  const [module1Expanded, setModule1Expanded] = useState(false)

  // Module 1 lessons data - matches original HTML: "Module 1: Greetings & Basics" (7 Lessons)
  const module1Lessons = [
    { id: 1, title: 'L1: The Alphabet & Ñ', subtitle: 'Completed • 8 min', status: 'completed' },
    { id: 2, title: 'L2: The Secret Vowels', subtitle: 'Completed • 6 min', status: 'completed' },
    { id: 3, title: 'L3: Essential Greetings', subtitle: 'Ready • 12 min', status: 'next' },
    { id: 4, title: 'L4: The VIP Survival Phrases', subtitle: 'Ready • 10 min', status: 'ready', onClick: onVIPSurvivalClick },
    { id: 5, title: 'L5: Subject Pronouns', subtitle: 'Locked • 15 min', status: 'locked' },
    { id: 6, title: 'L6: I am... (Intro to Ser)', subtitle: 'Locked • 18 min', status: 'locked' },
    { id: 7, title: 'L7: Module 1 Exam', subtitle: 'Locked • 25 min', status: 'locked' }
  ]

  // Module 2 lessons data - matches original HTML: "Module 2: Cafe Culture" (Active)
  const module2Lessons = [
    { id: 1, title: 'L1: Intro to Politeness', subtitle: 'Completed', status: 'completed' },
    { id: 2, title: 'L2: Vocabulary Drill', subtitle: 'Completed', status: 'completed', onClick: onVocabDrillClick },
    { id: 3, title: 'L3: Grammar - Ser vs Estar', subtitle: 'Completed', status: 'completed', onClick: onSerEstarClick },
    { id: 4, title: 'L4: Roleplay - The Cafe', subtitle: 'In Progress - 60%', status: 'active' },
    { id: 5, title: 'L5: Unit Exam', subtitle: 'Locked', status: 'locked' }
  ]

  // Render status icon based on lesson status
  const renderStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return (
          <Box
            sx={{
              width: 24,
              height: 24,
              borderRadius: '50%',
              backgroundColor: '#22C55E',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              fontSize: '12px',
              fontWeight: 700
            }}
          >
            ✓
          </Box>
        )
      case 'active':
        return (
          <Box
            sx={{
              width: 24,
              height: 24,
              borderRadius: '50%',
              backgroundColor: '#0AA6A6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: '#FFFFFF'
              }}
            />
          </Box>
        )
      case 'next':
        return (
          <Box
            sx={{
              width: 24,
              height: 24,
              borderRadius: '50%',
              backgroundColor: '#0AA6A6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: '#FFFFFF'
              }}
            />
          </Box>
        )
      case 'ready':
        return (
          <Box
            sx={{
              width: 24,
              height: 24,
              borderRadius: '50%',
              backgroundColor: '#8B5CF6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              fontSize: '10px'
            }}
          >
            ▶
          </Box>
        )
      case 'locked':
        return (
          <Box
            sx={{
              width: 24,
              height: 24,
              borderRadius: '50%',
              backgroundColor: '#D1D5DB',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px'
            }}
          >
            🔒
          </Box>
        )
      default:
        return null
    }
  }

  // Get text color based on status
  const getTextColor = (status) => {
    switch (status) {
      case 'completed':
        return '#6B7280'
      case 'active':
        return '#0AA6A6'
      case 'next':
        return '#0AA6A6'
      case 'ready':
        return '#8B5CF6'
      case 'locked':
        return '#9CA3AF'
      default:
        return '#111827'
    }
  }

  // Render lesson item
  const renderLessonItem = (lesson, isModule2 = false) => {
    const isLocked = lesson.status === 'locked'
    const hasClick = lesson.onClick && !isLocked

    return (
      <ListItem
        key={lesson.id}
        component={hasClick ? 'button' : 'div'}
        onClick={hasClick ? lesson.onClick : undefined}
        sx={{
          py: 1.5,
          px: 0,
          opacity: isLocked ? 0.5 : 1,
          cursor: hasClick ? 'pointer' : 'default',
          borderRadius: '8px',
          border: 'none',
          backgroundColor: 'transparent',
          width: '100%',
          textAlign: 'left',
          ...(hasClick && {
            ...iosButtonStyle,
            '&:hover': {
              backgroundColor: 'rgba(10, 166, 166, 0.05)'
            }
          }),
          ...(lesson.status === 'next' && {
            backgroundColor: 'rgba(10, 166, 166, 0.08)',
            mx: -1,
            px: 1,
            borderRadius: '12px'
          })
        }}
      >
        <ListItemIcon sx={{ minWidth: 40 }}>
          {renderStatusIcon(lesson.status)}
        </ListItemIcon>
        <ListItemText
          primary={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography
                sx={{
                  fontWeight: lesson.status === 'active' || lesson.status === 'next' ? 600 : 500,
                  fontSize: '0.875rem',
                  color: lesson.status === 'locked' ? '#6B7280' : '#111827'
                }}
              >
                {lesson.title}
              </Typography>
              {lesson.status === 'next' && (
                <Chip
                  label="NEXT"
                  size="small"
                  sx={{
                    height: 20,
                    fontSize: '0.625rem',
                    fontWeight: 700,
                    backgroundColor: '#0AA6A6',
                    color: '#FFFFFF',
                    '& .MuiChip-label': {
                      px: 1
                    }
                  }}
                />
              )}
            </Box>
          }
          secondary={
            <Typography
              variant="body2"
              sx={{
                fontSize: '0.75rem',
                color: getTextColor(lesson.status),
                fontWeight: lesson.status === 'next' || lesson.status === 'active' ? 500 : 400,
                mt: 0.25
              }}
            >
              {lesson.subtitle}
            </Typography>
          }
        />
      </ListItem>
    )
  }

  // Render locked Module 3 component
  const renderLockedModule3 = () => (
    <Box
      sx={{
        border: '1px solid #E5E7EB',
        borderRadius: '16px',
        p: 2.5,
        opacity: 0.5
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: '8px',
            backgroundColor: '#D1D5DB',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px'
          }}
        >
          🔒
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography sx={{ fontWeight: 600, fontSize: '1rem', color: '#6B7280' }}>
            Module 3: Travel Essentials
          </Typography>
          <Typography sx={{ fontSize: '0.75rem', color: '#9CA3AF' }}>
            Unlocks at Level A1
          </Typography>
        </Box>
      </Box>
    </Box>
  )

  // Module 3 lessons data - Travel Essentials (Active)
  const module3Lessons = [
    {
      id: 1,
      title: 'L1: Vamos a Viajar',
      subtitle: 'Ready • 25 min',
      status: 'ready',
      onClick: onTravelLessonClick
    },
    { id: 2, title: 'L2: At the Hotel', subtitle: 'Locked • 20 min', status: 'locked' },
    { id: 3, title: 'L3: Asking for Directions', subtitle: 'Locked • 18 min', status: 'locked' },
  ]

  // Render active Module 3 component
  const renderActiveModule3 = () => (
    <Box sx={{ mb: 3 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          mb: 1.5
        }}
      >
        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: '8px',
            backgroundColor: '#8B5CF6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: '#FFFFFF'
            }}
          />
        </Box>
        <Box>
          <Typography sx={{ fontWeight: 600, fontSize: '1rem', color: '#111827' }}>
            Module 3: Travel Essentials
          </Typography>
          <Typography sx={{ fontSize: '0.75rem', color: '#8B5CF6', fontWeight: 500 }}>
            Ready
          </Typography>
        </Box>
      </Box>

      {/* Lessons List */}
      <Box
        sx={{
          ml: 2,
          pl: 3,
          borderLeft: '2px solid #E5E7EB'
        }}
      >
        <List sx={{ py: 0 }}>
          {module3Lessons.map(lesson => renderLessonItem(lesson, false))}
        </List>
      </Box>
    </Box>
  )

  return (
    <Box sx={{ mt: 3 }}>
      <Typography
        variant="h6"
        component="h2"
        sx={{
          fontFamily: "'Lexend', sans-serif",
          fontWeight: 700,
          fontSize: '1.125rem',
          color: '#111827',
          mb: 2
        }}
      >
        Your Curriculum
      </Typography>

      {/* Module 1 - Greetings & Basics (Expandable) */}
      <Box sx={{ mb: 3 }}>
        <Box
          component="button"
          onClick={() => setModule1Expanded(!module1Expanded)}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            width: '100%',
            mb: 1.5,
            textAlign: 'left',
            border: 'none',
            backgroundColor: 'transparent',
            cursor: 'pointer',
            p: 0,
            ...iosButtonStyle
          }}
        >
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: '8px',
              backgroundColor: '#FACC15',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Box
              component="svg"
              sx={{
                width: 20,
                height: 20,
                color: '#FFFFFF',
                transform: module1Expanded ? 'rotate(90deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s ease'
              }}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </Box>
          </Box>
          <Box>
            <Typography sx={{ fontWeight: 600, fontSize: '1rem', color: '#111827' }}>
              Module 1: Greetings & Basics
            </Typography>
            <Typography sx={{ fontSize: '0.75rem', color: '#6B7280' }}>
              7 Lessons
            </Typography>
          </Box>
        </Box>

        {/* Expanded Lesson List */}
        {module1Expanded && (
          <Box
            sx={{
              ml: 2,
              pl: 3,
              borderLeft: '2px solid #E5E7EB'
            }}
          >
            <List sx={{ py: 0 }}>
              {module1Lessons.map(lesson => renderLessonItem(lesson))}
            </List>
          </Box>
        )}
      </Box>

      {/* Module 2 - Cafe Culture (Active) */}
      <Box sx={{ mb: 3 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            mb: 1.5
          }}
        >
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: '8px',
              backgroundColor: '#0AA6A6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: '#FFFFFF'
              }}
            />
          </Box>
          <Box>
            <Typography sx={{ fontWeight: 600, fontSize: '1rem', color: '#111827' }}>
              Module 2: Cafe Culture
            </Typography>
            <Typography sx={{ fontSize: '0.75rem', color: '#0AA6A6', fontWeight: 500 }}>
              Active
            </Typography>
          </Box>
        </Box>

        {/* Lessons List */}
        <Box
          sx={{
            ml: 2,
            pl: 3,
            borderLeft: '2px solid #E5E7EB'
          }}
        >
          <List sx={{ py: 0 }}>
            {module2Lessons.map(lesson => renderLessonItem(lesson, true))}
          </List>
        </Box>
      </Box>

      {/* Module 3 - Travel Essentials - Conditionally rendered */}
      {showLockedModule ? renderLockedModule3() : renderActiveModule3()}
    </Box>
  )
}

// Export the locked module renderer separately for use in DashboardScreen
export function LockedModule3() {
  return (
    <Box
      sx={{
        border: '1px solid #E5E7EB',
        borderRadius: '16px',
        p: 2.5,
        opacity: 0.5
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: '8px',
            backgroundColor: '#D1D5DB',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px'
          }}
        >
          🔒
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography sx={{ fontWeight: 600, fontSize: '1rem', color: '#6B7280' }}>
            Module 3: Travel Essentials
          </Typography>
          <Typography sx={{ fontSize: '0.75rem', color: '#9CA3AF' }}>
            Unlocks at Level A1
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default ModuleList
