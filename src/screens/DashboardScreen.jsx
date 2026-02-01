import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import useSDKConfig from '../hooks/useSDKConfig.js'
import { useNavigation } from '../hooks/useNavigation.js'

// Dashboard components
import HeroCard from '../components/Dashboard/HeroCard.jsx'
import QuickWinCard from '../components/Dashboard/QuickWinCard.jsx'
import ModuleList from '../components/Dashboard/ModuleList.jsx'
import DraggableFloatingCTA from '../components/Dashboard/DraggableFloatingCTA.jsx'

/**
 * DashboardScreen - Main hub of the SpanishVIP app
 * Contains hero card, quick win card, curriculum modules, and upsell banner
 *
 * Layout order matches original HTML:
 * 1. Hero Card
 * 2. Quick Win Card
 * 3. Module List (Module 1 + Module 2, without locked Module 3)
 * 4. Upsell Banner
 * 5. Locked Module 3
 *
 * Uses useNavigation hook for all navigation - no props required
 */
function DashboardScreen() {
  // Get SDK configuration from context
  const config = useSDKConfig()

  // Get navigation functions from context
  const {
    showLessonRunner,
    showSpeedDrill,
    showVoiceMode,
    showSerEstarConcept,
    showVocabDrillIntro,
    showVIPSurvivalIntro,
    showVIPAccessOffer,
    showTravelImageSelect,
    showGrammarGuide,
    showModuleGuidebook,
    showVideoLessonM3L3,
    showVoiceConversation,
    setActiveTab,
    level,
    showLevelSelection
  } = useNavigation()

  // Navigation Handlers - using navigation context

  /**
   * Resume lesson - navigates to LessonScreen
   */
  const handleResumeLesson = () => {
    showLessonRunner()
  }

  /**
   * Start speed drill - navigates to SpeedDrillScreen
   */
  const handleSpeedDrill = () => {
    showSpeedDrill()
  }

  /**
   * Navigate to review screen
   */
  const handleReviewScreen = () => {
    setActiveTab('review')
  }

  /**
   * Navigate to voice mode
   */
  const handleVoiceMode = () => {
    showVoiceMode()
  }

  /**
   * Navigate to Ser vs Estar concept lesson (Module 2, L3)
   */
  const handleSerEstarConcept = () => {
    showSerEstarConcept()
  }

  /**
   * Navigate to Vocab Drill intro (Module 2, L2)
   * Provides a default quick drill topic with essential vocabulary
   */
  const handleVocabDrill = () => {
    // Default 2-minute vocab drill topic with essential words
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
    
    showVocabDrillIntro(quickDrillTopic, 'dashboard');
  }

  /**
   * Navigate to VIP Survival phrases intro (Module 1, L4)
   */
  const handleVIPSurvival = () => {
    showVIPSurvivalIntro()
  }

  /**
   * Navigate to VIP Access offer screen
   */
  const handleVIPAccessOffer = () => {
    showVIPAccessOffer()
  }

  /**
   * Navigate to Travel Lesson - Vamos a Viajar (Module 3, L1)
   */
  const handleTravelLesson = () => {
    showTravelImageSelect()
  }

  /**
   * Navigate to Grammar Guide before Module 3, Lesson 2
   */
  const handleGrammarGuide = () => {
    showGrammarGuide()
  }

  /**
   * Navigate to Module Guidebook
   */
  const handleModuleGuidebook = (guidebookId) => {
    showModuleGuidebook(guidebookId)
  }

  /**
   * Navigate to Video Lesson - El Participio (Module 3, L3)
   */
  const handleVideoLessonM3L3 = () => {
    showVideoLessonM3L3()
  }

  return (
    <Box
      sx={{
        px: 2.5,
        pb: 12,
        pt: 2.5,
        backgroundColor: config.surface_color,
        minHeight: '100%'
      }}
    >
      {/* Welcome Header */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700, fontFamily: "'Lexend', sans-serif", color: '#111827' }}>
            Bienvenido User
          </Typography>
          <Typography variant="body2" sx={{ color: '#6B7280' }}>
            Let's learn Spanish!
          </Typography>
        </Box>
        <Button
          onClick={showLevelSelection}
          variant="contained"
          size="small"
          sx={{
            borderRadius: '20px',
            textTransform: 'none',
            fontWeight: 700,
            fontSize: '0.875rem',
            background: 'linear-gradient(135deg, #FACC15 0%, #CA8A04 100%)',
            boxShadow: '0 4px 6px -1px rgba(250, 204, 21, 0.3)',
            color: '#FFFFFF',
            minWidth: 'auto',
            px: 2,
            py: 0.5
          }}
        >
          Level {level}
        </Button>
      </Box>

      {/* Hero Card - Main lesson progress */}
      <HeroCard
        headline={config.hero_headline}
        subheadline={config.hero_subheadline}
        progress={60}
        sofiaNudge={config.sofia_nudge}
        buttonText={config.hero_button}
        onResumeClick={handleResumeLesson}
        backgroundColor={config.hero_card_bg}
        textColor={config.hero_card_text}
        buttonColor={config.primary_action_color}
      />

      {/* Quick Win Card - Short activity CTA */}
      <Box sx={{ mt: 2.5 }}>
        <QuickWinCard
          headline={config.quick_win_headline}
          actionText={config.quick_win_action}
          onStartClick={handleVocabDrill}
        />
      </Box>

      {/* Module List - Curriculum with expandable lessons (all modules including unlocked Module 3) */}
      <ModuleList
        onSerEstarClick={handleSerEstarConcept}
        onVocabDrillClick={handleVocabDrill}
        onVIPSurvivalClick={handleVIPSurvival}
        onTravelLessonClick={handleTravelLesson}
        onGrammarGuideClick={handleGrammarGuide}
        onVideoLessonM3L3Click={handleVideoLessonM3L3}
        onModuleGuidebookClick={handleModuleGuidebook}
        onVoiceConversationClick={showVoiceConversation}
        showLockedModule={false}
        level={level}
      />

      {/* Draggable Floating CTA - Human tutor booking */}
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <DraggableFloatingCTA
          upsellText={config.upsell_text}
          actionText={config.upsell_action}
          onBookClick={handleVIPAccessOffer}
        />
      </Box>
    </Box>
  )
}

export default DashboardScreen
