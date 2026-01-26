import { useMemo, lazy, Suspense, useEffect } from 'react'
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

// Lazy-loaded screen components (loaded on demand)
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

function ProfileScreen() {
  return (
    <Box sx={{ p: 3, textAlign: 'center' }}>
      <SofiaAvatar size="small" emoji="👤" showGradientBorder={false} />
      <Typography variant="h6" color="primary" sx={{ mt: 2 }}>Profile</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
        Your learning progress
      </Typography>
    </Box>
  )
}

function SettingsScreen() {
  return (
    <Box sx={{ p: 3, textAlign: 'center' }}>
      <SofiaAvatar size="small" emoji="⚙️" showGradientBorder={false} />
      <Typography variant="h6" color="primary" sx={{ mt: 2 }}>Settings</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
        App preferences and configuration
      </Typography>
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
  const { currentScreen, activeTab, setActiveTab, isFullScreen, isTransitioning, isLoading, endLoading } = useNavigation()

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
