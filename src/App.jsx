import { useMemo, lazy, Suspense, useEffect, useState } from 'react'
import { ThemeProvider } from '@mui/material/styles'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { SDKProvider } from './context/SDKContext.jsx'
import { NavigationProvider } from './context/NavigationContext.jsx'
import { useNavigation, SCREENS } from './hooks/useNavigation.js'
import useSDKConfig from './hooks/useSDKConfig.js'
import { createMuiTheme } from './theme/muiTheme.js'

// Shared components (loaded immediately - small bundle impact)
import MobileFrame from './components/shared/MobileFrame.jsx'
import StatusBar from './components/shared/StatusBar.jsx'
import BottomNav from './components/shared/BottomNav.jsx'
import SofiaAvatar from './components/shared/SofiaAvatar.jsx'
import LoadingScreen from './components/shared/LoadingScreen.jsx'
import ErrorBoundary from './components/shared/ErrorBoundary.jsx'

// Profile components
import ProfileHeader from './components/Profile/ProfileHeader.jsx'
import StatisticsSection from './components/Profile/StatisticsSection.jsx'
import AchievementsSection from './components/Profile/AchievementsSection.jsx'

// Settings components
import SettingsSection from './components/Settings/SettingsSection.jsx'
import SettingsToggle from './components/Settings/SettingsToggle.jsx'
import SettingsInput from './components/Settings/SettingsInput.jsx'
import SettingsSelect from './components/Settings/SettingsSelect.jsx'
import SettingsButton from './components/Settings/SettingsButton.jsx'

// Mock data
import mockUserData from './data/mockUserData.js'

// Lazy-loaded screen components (loaded on demand)
const LoginScreen = lazy(() => import('./screens/LoginScreen.jsx'))
const DashboardScreen = lazy(() => import('./screens/DashboardScreen.jsx'))
const LessonScreen = lazy(() => import('./screens/LessonScreen.jsx'))
const SuccessScreen = lazy(() => import('./screens/SuccessScreen.jsx'))
const SpeedDrillScreen = lazy(() => import('./screens/SpeedDrillScreen.jsx'))
const DrillCompleteScreen = lazy(() => import('./screens/DrillCompleteScreen.jsx'))
const ActiveCallScreen = lazy(() => import('./screens/ActiveCallScreen.jsx'))
const VoiceModeScreen = lazy(() => import('./screens/VoiceModeScreen.jsx'))
const ReviewScreen = lazy(() => import('./screens/ReviewScreen.jsx'))
const SerEstarConceptScreen = lazy(() => import('./screens/SerEstarConceptScreen.jsx'))
const SerEstarLogicScreen = lazy(() => import('./screens/SerEstarLogicScreen.jsx'))
const SerEstarSpeakingScreen = lazy(() => import('./screens/SerEstarSpeakingScreen.jsx'))
const VocabDrillIntroScreen = lazy(() => import('./screens/VocabDrillIntroScreen.jsx'))
const VocabTeachCardScreen = lazy(() => import('./screens/VocabTeachCardScreen.jsx'))
const VocabSpeakingScreen = lazy(() => import('./screens/VocabSpeakingScreen.jsx'))
const VocabListeningScreen = lazy(() => import('./screens/VocabListeningScreen.jsx'))
const VocabSuccessScreen = lazy(() => import('./screens/VocabSuccessScreen.jsx'))
const VIPSurvivalIntroScreen = lazy(() => import('./screens/VIPSurvivalIntroScreen.jsx'))
const VIPTeachShieldScreen = lazy(() => import('./screens/VIPTeachShieldScreen.jsx'))
const VIPTeachBrakeScreen = lazy(() => import('./screens/VIPTeachBrakeScreen.jsx'))
const VIPTeachToolScreen = lazy(() => import('./screens/VIPTeachToolScreen.jsx'))
const VIPLogicCheckScreen = lazy(() => import('./screens/VIPLogicCheckScreen.jsx'))
const VIPSpeakingDrillScreen = lazy(() => import('./screens/VIPSpeakingDrillScreen.jsx'))
const VIPScenarioSetupScreen = lazy(() => import('./screens/VIPScenarioSetupScreen.jsx'))
const VIPRoleplayScreen = lazy(() => import('./screens/VIPRoleplayScreen.jsx'))
const VIPSuccessScreen = lazy(() => import('./screens/VIPSuccessScreen.jsx'))
const VIPAccessOfferScreen = lazy(() => import('./screens/VIPAccessOfferScreen.jsx'))
const TravelImageSelectScreen = lazy(() => import('./screens/TravelImageSelectScreen.jsx'))
const TravelTapPairScreen = lazy(() => import('./screens/TravelTapPairScreen.jsx'))
const TravelTranslationScreen = lazy(() => import('./screens/TravelTranslationScreen.jsx'))
const TravelTrueFalseScreen = lazy(() => import('./screens/TravelTrueFalseScreen.jsx'))
const TravelSentenceBuilderScreen = lazy(() => import('./screens/TravelSentenceBuilderScreen.jsx'))
const TravelFillBlankScreen = lazy(() => import('./screens/TravelFillBlankScreen.jsx'))
const TravelAudioTranscriptionScreen = lazy(() => import('./screens/TravelAudioTranscriptionScreen.jsx'))
const TravelSpeakingDrillScreen = lazy(() => import('./screens/TravelSpeakingDrillScreen.jsx'))
const TravelAudioDiscriminationScreen = lazy(() => import('./screens/TravelAudioDiscriminationScreen.jsx'))
const TravelRoleplayScreen = lazy(() => import('./screens/TravelRoleplayScreen.jsx'))
const TravelSuccessScreen = lazy(() => import('./screens/TravelSuccessScreen.jsx'))
const GrammarGuidebookScreen = lazy(() => import('./screens/GrammarGuidebookScreen.jsx'))
const ModuleGuidebookScreen = lazy(() => import('./screens/ModuleGuidebookScreen.jsx'))
const VideoLessonScreen = lazy(() => import('./screens/VideoLessonScreen.jsx'))
const LessonVoiceModeScreen = lazy(() => import('./screens/LessonVoiceModeScreen.jsx'))
const LevelSelectionScreen = lazy(() => import('./screens/LevelSelectionScreen.jsx'))


function ProfileScreen() {
  // Initialize state from mock data for future state management
  const [profileData, setProfileData] = useState(mockUserData.userProfile)
  const [statistics, setStatistics] = useState(mockUserData.statistics)
  const [achievements, setAchievements] = useState(mockUserData.achievements)

  const handleViewAllAchievements = () => {
    console.log('View all achievements clicked')
  }

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
      <Box sx={{ px: 2.5, py: 3, pb: 12, flex: 1, overflow: 'auto' }}>
        <ProfileHeader
          name={profileData.name}
          username={profileData.username}
          joinDate={profileData.joinDate}
          friendCount={profileData.friendCount}
          avatarEmoji={profileData.avatarEmoji}
        />

        <Box sx={{ mt: 3 }}>
          <StatisticsSection
            streak={statistics.streak}
            totalXP={statistics.totalXP}
            currentLeague={statistics.currentLeague}
            topFinishes={statistics.topFinishes}
          />
        </Box>

        <Box sx={{ mt: 3 }}>
          <AchievementsSection
            achievements={achievements}
            onViewAllClick={handleViewAllAchievements}
          />
        </Box>
      </Box>
    </Box>
  )
}

function SettingsScreen() {
  // Initialize state with mock data from centralized data file
  const [accountData, setAccountData] = useState(mockUserData.accountSettings)

  // Initialize preferences state with mock data
  const [preferences, setPreferences] = useState(mockUserData.preferences)

  // Get dark mode options from mock data
  const darkModeOptions = mockUserData.darkModeOptions

  // Handlers for account inputs
  const handleAccountChange = (field) => (event) => {
    setAccountData(prev => ({
      ...prev,
      [field]: event.target.value
    }))
  }

  // Handlers for preferences
  const handleToggleChange = (field) => (event) => {
    setPreferences(prev => ({
      ...prev,
      [field]: event.target.checked
    }))
  }

  const handleDarkModeChange = (event) => {
    setPreferences(prev => ({
      ...prev,
      darkMode: event.target.value
    }))
  }

  // Action handlers
  const { showLogin } = useNavigation()

  const handleLogout = () => {
    console.log('Logout clicked')
    showLogin()
  }

  const handleExportData = () => {
    console.log('Export data clicked')
  }

  const handleDeleteAccount = () => {
    console.log('Delete account clicked')
  }

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
      <Box sx={{ px: 2.5, py: 3, pb: 12, flex: 1, overflow: 'auto' }}>
        {/* Account Section */}
        <SettingsSection title="Account">
          <SettingsInput
            label="Name"
            value={accountData.name}
            onChange={handleAccountChange('name')}
            placeholder="Enter your name"
          />
          <SettingsInput
            label="Username"
            value={accountData.username}
            onChange={handleAccountChange('username')}
            placeholder="Enter your username"
          />
          <SettingsInput
            label="Email"
            value={accountData.email}
            onChange={handleAccountChange('email')}
            type="email"
            placeholder="Enter your email"
          />
        </SettingsSection>

        {/* Preferences Section */}
        <SettingsSection title="Preferences">
          <SettingsToggle
            label="Sound effects"
            description="Play sounds during lessons"
            checked={preferences.soundEffects}
            onChange={handleToggleChange('soundEffects')}
          />
          <SettingsToggle
            label="Animations"
            description="Enable visual animations"
            checked={preferences.animations}
            onChange={handleToggleChange('animations')}
          />
          <SettingsToggle
            label="Motivational messages"
            description="Show encouraging messages"
            checked={preferences.motivationalMessages}
            onChange={handleToggleChange('motivationalMessages')}
          />
          <SettingsSelect
            label="Dark mode"
            value={preferences.darkMode}
            onChange={handleDarkModeChange}
            options={darkModeOptions}
          />
        </SettingsSection>

        {/* Actions Section */}
        <SettingsSection title="Actions">
          <Box sx={{ px: 2.5, py: 2 }}>
            <SettingsButton
              label="Logout"
              onClick={handleLogout}
              variant="outlined"
            />
            <SettingsButton
              label="Export my data"
              onClick={handleExportData}
              variant="outlined"
            />
            <SettingsButton
              label="Delete account"
              onClick={handleDeleteAccount}
              destructive
            />
          </Box>
        </SettingsSection>
      </Box>
    </Box>
  )
}

/**
 * ThemedApp - Wraps the app with dynamic theme based on SDK config
 * Uses useSDKConfig hook to get current config and creates theme dynamically
 */
function ThemedApp() {
  const config = useSDKConfig()
  const dynamicTheme = useMemo(() => createMuiTheme(config), [config])

  return (
    <ThemeProvider theme={dynamicTheme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />} />
          <Route path="*" element={<AppLayout />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

/**
 * Main app layout with mobile frame and navigation
 * Uses NavigationContext for all navigation state and transitions
 */
function AppLayout() {
  const { currentScreen, activeTab, setActiveTab, isFullScreen, isTransitioning, isLoading, endLoading, activeGuidebookId } = useNavigation()

  /**
   * End loading state after screen transitions complete
   * This ensures the loading overlay is hidden once lazy content resolves
   */
  useEffect(() => {
    // End loading when the screen has loaded (currentScreen changes and transition ends)
    if (!isTransitioning) {
      endLoading()
    }
  }, [currentScreen, isTransitioning, endLoading])

  /**
   * Handle bottom nav tab changes
   */
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue)
  }

  /**
   * Render the active screen based on current navigation state
   * All screens use useNavigation hook internally for their navigation needs
   */
  const renderScreen = () => {
    // Handle screen-based navigation
    switch (currentScreen) {
      case SCREENS.LOGIN:
        return <LoginScreen />
      case SCREENS.LESSON:
        return <LessonScreen />
      case SCREENS.SUCCESS:
        return <SuccessScreen />
      case SCREENS.SPEED_DRILL:
        return <SpeedDrillScreen />
      case SCREENS.DRILL_COMPLETE:
        return <DrillCompleteScreen />
      case SCREENS.VOICE_MODE:
        return <VoiceModeScreen />
      case SCREENS.ACTIVE_CALL:
        return <ActiveCallScreen />
      case SCREENS.REVIEW:
        return <ReviewScreen />
      case SCREENS.SER_ESTAR_CONCEPT:
        return <SerEstarConceptScreen />
      case SCREENS.SER_ESTAR_LOGIC:
        return <SerEstarLogicScreen />
      case SCREENS.SER_ESTAR_SPEAKING:
        return <SerEstarSpeakingScreen />
      case SCREENS.VOCAB_DRILL_INTRO:
        return <VocabDrillIntroScreen />
      case SCREENS.VOCAB_TEACH_CARD:
        return <VocabTeachCardScreen />
      case SCREENS.VOCAB_SPEAKING:
        return <VocabSpeakingScreen />
      case SCREENS.VOCAB_LISTENING:
        return <VocabListeningScreen />
      case SCREENS.VOCAB_SUCCESS:
        return <VocabSuccessScreen />
      case SCREENS.VIP_SURVIVAL_INTRO:
        return <VIPSurvivalIntroScreen />
      case SCREENS.VIP_TEACH_SHIELD:
        return <VIPTeachShieldScreen />
      case SCREENS.VIP_TEACH_BRAKE:
        return <VIPTeachBrakeScreen />
      case SCREENS.VIP_TEACH_TOOL:
        return <VIPTeachToolScreen />
      case SCREENS.VIP_LOGIC_CHECK:
        return <VIPLogicCheckScreen />
      case SCREENS.VIP_SPEAKING_DRILL:
        return <VIPSpeakingDrillScreen />
      case SCREENS.VIP_SCENARIO_SETUP:
        return <VIPScenarioSetupScreen />
      case SCREENS.VIP_ROLEPLAY:
        return <VIPRoleplayScreen />
      case SCREENS.VIP_SUCCESS:
        return <VIPSuccessScreen />
      case SCREENS.VIP_ACCESS_OFFER:
        return <VIPAccessOfferScreen />
      case SCREENS.TRAVEL_IMAGE_SELECT:
        return <TravelImageSelectScreen />
      case SCREENS.TRAVEL_TAP_PAIR:
        return <TravelTapPairScreen />
      case SCREENS.TRAVEL_TRANSLATION:
        return <TravelTranslationScreen />
      case SCREENS.TRAVEL_TRUE_FALSE:
        return <TravelTrueFalseScreen />
      case SCREENS.TRAVEL_SENTENCE_BUILDER:
        return <TravelSentenceBuilderScreen />
      case SCREENS.TRAVEL_FILL_BLANK:
        return <TravelFillBlankScreen />
      case SCREENS.TRAVEL_AUDIO_TRANSCRIPTION:
        return <TravelAudioTranscriptionScreen />
      case SCREENS.TRAVEL_SPEAKING_DRILL:
        return <TravelSpeakingDrillScreen />
      case SCREENS.TRAVEL_AUDIO_DISCRIMINATION:
        return <TravelAudioDiscriminationScreen />
      case SCREENS.TRAVEL_ROLEPLAY:
        return <TravelRoleplayScreen />
      case SCREENS.TRAVEL_SUCCESS:
        return <TravelSuccessScreen />
      case SCREENS.GRAMMAR_GUIDE:
        return <GrammarGuidebookScreen />
      case SCREENS.MODULE_GUIDEBOOK:
        return <ModuleGuidebookScreen guidebookId={activeGuidebookId} />
      case SCREENS.VIDEO_LESSON_M3L3:
        return <VideoLessonScreen />
      case SCREENS.VOICE_LESSON_M4L1:
        return <LessonVoiceModeScreen />
      case SCREENS.LEVEL_SELECTION:
        return <LevelSelectionScreen />
      case SCREENS.DASHBOARD:
      default:
        // Handle tab-based navigation for dashboard
        switch (activeTab) {
          case 'home':
            return <DashboardScreen />
          case 'review':
            return <ReviewScreen />
          case 'voice':
            return <VoiceModeScreen />
          case 'profile':
            return <ProfileScreen />
          case 'settings':
            return <SettingsScreen />
          default:
            return <DashboardScreen />
        }
    }
  }

  const fullScreen = isFullScreen(currentScreen)

  return (
    <MobileFrame>
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
        {/* Loading overlay for navigation transitions */}
        {isLoading && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 9999,
              backgroundColor: 'background.default'
            }}
          >
            <LoadingScreen />
          </Box>
        )}
        {/* Hide StatusBar when on full-screen modes */}
        {!fullScreen && <StatusBar streakDays={3} voiceEnergyMinutes="12m" />}
        <Box
          sx={{
            flex: 1,
            overflow: 'auto',
            pb: fullScreen ? 0 : 10,
            opacity: isTransitioning ? 0 : 1,
            transform: isTransitioning ? 'translateY(8px)' : 'translateY(0)',
            transition: 'opacity 50ms ease-out, transform 50ms ease-out'
          }}
        >
          <ErrorBoundary>
            <Suspense fallback={<LoadingScreen />}>
              {renderScreen()}
            </Suspense>
          </ErrorBoundary>
        </Box>
        {/* Hide BottomNav when on full-screen modes */}
        {!fullScreen && <BottomNav value={activeTab} onChange={handleTabChange} />}
      </Box>
    </MobileFrame>
  )
}

function App() {
  return (
    <SDKProvider>
      <NavigationProvider>
        <ErrorBoundary>
          <ThemedApp />
        </ErrorBoundary>
      </NavigationProvider>
    </SDKProvider>
  )
}

export default App
