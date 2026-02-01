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
import { keyframes } from '@mui/material/styles'
import { iosButtonStyle } from '../shared/sharedStyles.js'

// Define glow animation
const glowAnimation = keyframes`
  0% {
    box-shadow: 0 0 5px rgba(251, 191, 36, 0.2);
  }
  50% {
    box-shadow: 0 0 15px rgba(251, 191, 36, 0.5);
  }
  100% {
    box-shadow: 0 0 5px rgba(251, 191, 36, 0.2);
  }
`

/**
 * ModuleList - Curriculum module list with expandable lessons
 * Displays modules matching the original dashboard HTML structure
 *
 * Props:
 * - onVIPSurvivalClick: Handler for VIP Survival Phrases lesson (Module 1, L4)
 * - onVocabDrillClick: Handler for Vocabulary Drill lesson (Module 2, L2)
 * - onSerEstarClick: Handler for Ser vs Estar lesson (Module 2, L3)
 * - onTravelLessonClick: Handler for Travel Lesson - Vamos a Viajar (Module 3, L1)
 * - onVideoLessonM3L3Click: Handler for Video Lesson - El Participio (Module 3, L3)
 * - showLockedModule: Boolean to conditionally render locked Module 3 (default true)
 */
function ModuleList({
  onSerEstarClick,
  onVocabDrillClick,
  onVIPSurvivalClick,
  onTravelLessonClick,
  onGrammarGuideClick,
  onVideoLessonM3L3Click,
  onModuleGuidebookClick,
  showLockedModule = true,
  level = 'A0'
}) {
  // If not A0, show "Work in Progress" state
  if (level !== 'A0') {
    return (
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" sx={{ fontFamily: "'Lexend', sans-serif", fontWeight: 700, mb: 2, color: '#111827' }}>
          Level {level} Curriculum
        </Typography>
        {[1, 2, 3].map(i => (
          <Box key={i} sx={{
            mb: 2,
            p: 2,
            border: '1px dashed #D1D5DB',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            opacity: 0.7
          }}>
            <Box sx={{ width: 40, height: 40, borderRadius: '8px', bgcolor: '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography sx={{ fontSize: '20px' }}>🚧</Typography>
            </Box>
            <Box>
              <Typography sx={{ fontWeight: 600, color: '#9CA3AF' }}>Module {i}: Coming Soon</Typography>
              <Typography variant="caption" sx={{ color: '#9CA3AF' }}>Curriculum under construction</Typography>
            </Box>
          </Box>
        ))}
      </Box>
    )
  }

  const [module1Expanded, setModule1Expanded] = useState(false)
  const [module2Expanded, setModule2Expanded] = useState(false)
  const [module3Expanded, setModule3Expanded] = useState(false)

  // Module 1 lessons data - matches original HTML: "Module 1: Greetings & Basics" (7 Lessons)
  const module1Lessons = [
    { id: 8, title: '📖 Module 1 Guidebook', subtitle: 'Recommended Reference • Always Available', status: 'ready', isRecommended: true, onClick: () => onModuleGuidebookClick('guide_m1') },
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
    { id: 6, title: '📖 Module 2 Guidebook', subtitle: 'Recommended Reference • Always Available', status: 'ready', isRecommended: true, onClick: () => onModuleGuidebookClick('guide_m2') },
    { id: 1, title: 'L1: Intro to Politeness', subtitle: 'Completed', status: 'completed' },
    {
      id: 2,
      title: 'L2: Vocabulary Drill',
      subtitle: 'Completed',
      status: 'completed',
      onClick: () => {
        // Provide the same quick drill topic for Module 2, L2
        const quickDrillTopic = {
          id: 'quick-drill-essentials',
          title: 'Essential Phrases',
          subtitle: '2-Minute Quick Drill',
          emoji: '⚡',
          level: 'A1',
          words: [
            { spanish: "Hola", english: "Hello", emoji: "👋", phonetic: "OH-lah", context: "Hola, ¿cómo estás?" },
            { spanish: "Gracias", english: "Thank you", emoji: "🙏", phonetic: "GRAH-see-ahs", context: "Gracias por tu ayuda." },
            { spanish: "Por favor", english: "Please", emoji: "🙏", phonetic: "pohr fah-BOHR", context: "Un café, por favor." },
            { spanish: "Lo siento", english: "I'm sorry", emoji: "😔", phonetic: "loh see-EHN-toh", context: "Lo siento, no entiendo." },
            { spanish: "Perdón", english: "Excuse me", emoji: "🙋", phonetic: "pehr-DOHN", context: "Perdón, ¿dónde está el baño?" },
            { spanish: "Sí", english: "Yes", emoji: "✅", phonetic: "see", context: "Sí, me gusta." },
            { spanish: "No", english: "No", emoji: "❌", phonetic: "noh", context: "No, gracias." },
            { spanish: "Buenos días", english: "Good morning", emoji: "🌅", phonetic: "BWEH-nohs DEE-ahs", context: "Buenos días, señora." }
          ]
        };
        onVocabDrillClick(quickDrillTopic, 'module');
      }
    },
    { id: 3, title: 'L3: Grammar - Ser vs Estar', subtitle: 'Completed', status: 'completed', onClick: onSerEstarClick },
    { id: 4, title: 'L4: Roleplay - The Cafe', subtitle: 'In Progress - 60%', status: 'active' },
    { id: 5, title: 'L5: Unit Exam', subtitle: 'Locked', status: 'locked' }
  ]

  // Glow animation for recommended items
  const glowAnimation = keyframes`
    0% {
      box-shadow: 0 0 0 0 rgba(251, 191, 36, 0.4);
    }
    70% {
      box-shadow: 0 0 0 6px rgba(251, 191, 36, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(251, 191, 36, 0);
    }
  `

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
          }),
          ...(lesson.isRecommended && {
            background: 'linear-gradient(90deg, rgba(251, 191, 36, 0.15) 0%, rgba(251, 191, 36, 0.05) 100%)',
            border: '2px solid #FBBF24',
            borderRadius: '12px',
            mx: -1,
            px: 1,
            animation: `${glowAnimation} 2s infinite ease-in-out`
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
              {lesson.isRecommended && (
                <Chip
                  label="RECOMMENDED"
                  size="small"
                  sx={{
                    height: 20,
                    fontSize: '0.625rem',
                    fontWeight: 700,
                    backgroundColor: '#FBBF24',
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
                color: lesson.isRecommended ? '#D97706' : getTextColor(lesson.status),
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

  // Coming Soon modules data for A0
  const comingSoonModules = [
    { id: 4, title: 'Module 4: Shopping & Directions', subtitle: 'Coming Soon', emoji: '🛍️' },
    { id: 5, title: 'Module 5: Food & Dining', subtitle: 'Coming Soon', emoji: '🍽️' },
    { id: 6, title: 'Module 6: Time & Weather', subtitle: 'Coming Soon', emoji: '⏰' },
    { id: 7, title: 'Module 7: Family & Descriptions', subtitle: 'Coming Soon', emoji: '👨‍👩‍👧' },
    { id: 8, title: 'Module 8: Daily Routines', subtitle: 'Coming Soon', emoji: '🌅' }
  ]

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

  // Render coming soon module
  const renderComingSoonModule = (module) => (
    <Box
      key={module.id}
      sx={{
        border: '1px dashed #D1D5DB',
        borderRadius: '16px',
        p: 2.5,
        opacity: 0.7,
        mb: 2,
        backgroundColor: 'rgba(243, 244, 246, 0.5)'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: '8px',
            backgroundColor: '#F3F4F6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px'
          }}
        >
          {module.emoji}
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography sx={{ fontWeight: 600, fontSize: '1rem', color: '#9CA3AF' }}>
            {module.title}
          </Typography>
          <Typography sx={{ fontSize: '0.75rem', color: '#9CA3AF' }}>
            {module.subtitle}
          </Typography>
        </Box>
        <Chip
          label="SOON"
          size="small"
          sx={{
            height: 22,
            fontSize: '0.625rem',
            fontWeight: 700,
            backgroundColor: '#E5E7EB',
            color: '#6B7280',
            '& .MuiChip-label': {
              px: 1
            }
          }}
        />
      </Box>
    </Box>
  )

  // Module 3 lessons data - Travel Essentials (Active)
  const module3Lessons = [
    { id: 4, title: '📖 Module 3 Guidebook', subtitle: 'Recommended Reference • Always Available', status: 'ready', isRecommended: true, onClick: () => onModuleGuidebookClick('guide_m3') },
    {
      id: 1,
      title: 'L1: Vamos a Viajar',
      subtitle: 'Ready • 25 min',
      status: 'ready',
      onClick: onTravelLessonClick
    },
    {
      id: 2,
      title: 'L2: At the Hotel',
      subtitle: 'Ready • 20 min',
      status: 'ready',
      onClick: onGrammarGuideClick
    },
    {
      id: 3,
      title: 'L3: Video Lesson - El Participio',
      subtitle: 'Ready • 15 min',
      status: 'ready',
      onClick: onVideoLessonM3L3Click
    }
  ]

  // Render active Module 3 component
  const renderActiveModule3 = () => (
    <Box sx={{ mb: 3 }}>
      <Box
        component="button"
        onClick={() => setModule3Expanded(!module3Expanded)}
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
            backgroundColor: '#8B5CF6',
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
              transform: module3Expanded ? 'rotate(90deg)' : 'rotate(0deg)',
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
            Module 3: Travel Essentials
          </Typography>
          <Typography sx={{ fontSize: '0.75rem', color: '#8B5CF6', fontWeight: 500 }}>
            Ready
          </Typography>
        </Box>
      </Box>

      {/* Lessons List */}
      {module3Expanded && (
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
      )}
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
          component="button"
          onClick={() => setModule2Expanded(!module2Expanded)}
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
              backgroundColor: '#0AA6A6',
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
                transform: module2Expanded ? 'rotate(90deg)' : 'rotate(0deg)',
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
              Module 2: Cafe Culture
            </Typography>
            <Typography sx={{ fontSize: '0.75rem', color: '#0AA6A6', fontWeight: 500 }}>
              Active
            </Typography>
          </Box>
        </Box>

        {/* Lessons List */}
        {module2Expanded && (
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
        )}
      </Box>

      {/* Module 3 - Travel Essentials - Conditionally rendered */}
      {showLockedModule ? renderLockedModule3() : renderActiveModule3()}

      {/* Coming Soon Modules - Only show for A0 */}
      <Box sx={{ mt: 3 }}>
        <Typography
          variant="subtitle2"
          sx={{
            fontFamily: "'Lexend', sans-serif",
            fontWeight: 600,
            fontSize: '0.875rem',
            color: '#6B7280',
            mb: 2,
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}
        >
          <Box
            component="span"
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: '#FBBF24',
              display: 'inline-block'
            }}
          />
          Coming Next in A0
        </Typography>
        {comingSoonModules.map(module => renderComingSoonModule(module))}
      </Box>
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
