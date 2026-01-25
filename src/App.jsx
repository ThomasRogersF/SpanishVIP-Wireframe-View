import { useState } from 'react'
import { ThemeProvider } from '@mui/material/styles'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import theme from './theme/muiTheme.js'

// Shared components
import MobileFrame from './components/shared/MobileFrame.jsx'
import StatusBar from './components/shared/StatusBar.jsx'
import BottomNav from './components/shared/BottomNav.jsx'
import SofiaAvatar from './components/shared/SofiaAvatar.jsx'

// Screen components
import DashboardScreen from './screens/DashboardScreen.jsx'
import LessonScreen from './screens/LessonScreen.jsx'
import SuccessScreen from './screens/SuccessScreen.jsx'
import SpeedDrillScreen from './screens/SpeedDrillScreen.jsx'
import DrillCompleteScreen from './screens/DrillCompleteScreen.jsx'

function ReviewScreen() {
  return (
    <Box sx={{ p: 3, textAlign: 'center' }}>
      <Typography variant="h6" color="primary">Review</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
        Practice vocabulary and grammar
      </Typography>
    </Box>
  )
}

function VoiceScreen() {
  return (
    <Box sx={{ p: 3, textAlign: 'center' }}>
      <SofiaAvatar size="medium" />
      <Typography variant="h6" color="primary" sx={{ mt: 2 }}>Voice Mode</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
        Practice speaking with Sofia
      </Typography>
    </Box>
  )
}

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

// Main app layout with mobile frame and navigation
function AppLayout() {
  const [activeTab, setActiveTab] = useState('home')
  const [currentScreen, setCurrentScreen] = useState('dashboard')

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue)
    setCurrentScreen('dashboard') // Reset to dashboard when changing tabs
  }

  /**
   * Handler for when a lesson is completed - shows SuccessScreen
   */
  const handleLessonComplete = () => {
    console.log('[App] Lesson completed - showing SuccessScreen')
    setCurrentScreen('success')
  }

  /**
   * Handler for navigating back to dashboard from lesson
   */
  const handleBackToDashboard = () => {
    setCurrentScreen('dashboard')
  }

  /**
   * Handler for starting a lesson from dashboard
   */
  const handleStartLesson = () => {
    setCurrentScreen('lesson')
  }

  /**
   * Handler for showing SuccessScreen
   */
  const handleShowSuccess = () => {
    setCurrentScreen('success')
  }

  /**
   * Handler for showing SpeedDrillScreen
   */
  const handleShowSpeedDrill = () => {
    setCurrentScreen('speedDrill')
  }

  /**
   * Handler for showing DrillCompleteScreen
   */
  const handleShowDrillComplete = () => {
    setCurrentScreen('drillComplete')
  }

  /**
   * Handler for continuing from success screen to dashboard
   */
  const handleSuccessContinue = () => {
    console.log('[App] Success continue - returning to dashboard')
    setCurrentScreen('dashboard')
  }

  /**
   * Handler for closing speed drill and returning to dashboard
   */
  const handleDrillClose = () => {
    console.log('[App] Drill closed - returning to dashboard')
    setCurrentScreen('dashboard')
  }

  /**
   * Handler for completing speed drill - shows DrillCompleteScreen
   */
  const handleDrillComplete = () => {
    console.log('[App] Drill completed - showing DrillCompleteScreen')
    setCurrentScreen('drillComplete')
  }

  // Check if we're on a full-screen mode (no StatusBar/BottomNav)
  const isFullScreen = ['lesson', 'success', 'speedDrill', 'drillComplete'].includes(currentScreen)

  // Render the active screen based on selected tab and current screen
  const renderScreen = () => {
    // Handle full-screen modes first
    switch (currentScreen) {
      case 'lesson':
        return (
          <LessonScreen
            onComplete={handleLessonComplete}
            onBack={handleBackToDashboard}
          />
        )
      case 'success':
        return (
          <SuccessScreen
            onContinue={handleSuccessContinue}
          />
        )
      case 'speedDrill':
        return (
          <SpeedDrillScreen
            onComplete={handleDrillComplete}
            onClose={handleDrillClose}
          />
        )
      case 'drillComplete':
        return (
          <DrillCompleteScreen
            onBackToHome={handleBackToDashboard}
          />
        )
    }

    // Handle tab-based navigation
    switch (activeTab) {
      case 'home':
        return (
          <DashboardScreen
            onTabChange={handleTabChange}
            onStartLesson={handleStartLesson}
            onShowSpeedDrill={handleShowSpeedDrill}
          />
        )
      case 'review':
        return <ReviewScreen />
      case 'voice':
        return <VoiceScreen />
      case 'profile':
        return <ProfileScreen />
      case 'settings':
        return <SettingsScreen />
      default:
        return (
          <DashboardScreen
            onTabChange={handleTabChange}
            onStartLesson={handleStartLesson}
            onShowSpeedDrill={handleShowSpeedDrill}
          />
        )
    }
  }

  return (
    <MobileFrame>
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Hide StatusBar when on full-screen modes */}
        {!isFullScreen && <StatusBar streakDays={3} voiceEnergyMinutes="12m" />}
        <Box
          sx={{
            flex: 1,
            overflow: 'auto',
            pb: isFullScreen ? 0 : 10
          }}
        >
          {renderScreen()}
        </Box>
        {/* Hide BottomNav when on full-screen modes */}
        {!isFullScreen && <BottomNav value={activeTab} onChange={handleTabChange} />}
      </Box>
    </MobileFrame>
  )
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
