import { Component } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import SofiaAvatar from './SofiaAvatar.jsx'

/**
 * ErrorBoundary - Catches JavaScript errors in child components
 * 
 * Features:
 * - Catches errors during rendering, lifecycle methods, and constructors
 * - Displays user-friendly error message with MUI Card
 * - Shows "Return to Dashboard" button
 * - Logs errors to console (extendable to error tracking service)
 * - Shows error details in development mode only
 * - Includes retry button to reset error state
 * 
 * Usage:
 * <ErrorBoundary>
 *   <YourComponent />
 * </ErrorBoundary>
 * 
 * With fallback:
 * <ErrorBoundary fallback={<CustomErrorUI />}>
 *   <YourComponent />
 * </ErrorBoundary>
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null 
    }
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    // Log error to console (can extend to error tracking service)
    console.error('ErrorBoundary caught an error:', error, errorInfo)
    
    this.setState({ errorInfo })
    
    // Optional: Send to error tracking service
    // if (typeof window !== 'undefined' && window.errorTracker) {
    //   window.errorTracker.captureException(error, { extra: errorInfo })
    // }
  }

  handleRetry = () => {
    this.setState({ 
      hasError: false, 
      error: null, 
      errorInfo: null 
    })
  }

  handleReturnToDashboard = () => {
    // Reset error state and navigate to dashboard
    this.setState({ 
      hasError: false, 
      error: null, 
      errorInfo: null 
    })
    
    // Trigger navigation reset via custom event
    // NavigationContext will listen for this
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('navigate-to-dashboard'))
    }
  }

  render() {
    const { hasError, error, errorInfo } = this.state
    const { children, fallback } = this.props
    const isDevelopment = import.meta.env.DEV

    if (hasError) {
      // Custom fallback provided
      if (fallback) {
        return fallback
      }

      // Default error UI
      return (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            minHeight: 300,
            p: 3,
            bgcolor: 'background.default'
          }}
        >
          <SofiaAvatar size="small" emoji="😢" showGradientBorder={false} />
          
          <Card 
            sx={{ 
              mt: 3, 
              maxWidth: 350, 
              width: '100%',
              boxShadow: 3
            }}
          >
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography 
                variant="h6" 
                color="error" 
                gutterBottom
                sx={{ fontWeight: 600 }}
              >
                Oops! Something went wrong
              </Typography>
              
              <Typography 
                variant="body2" 
                color="text.secondary" 
                sx={{ mb: 2 }}
              >
                We encountered an unexpected error. Please try again or return to the dashboard.
              </Typography>
              
              {/* Show error details in development mode only */}
              {isDevelopment && error && (
                <Alert 
                  severity="error" 
                  sx={{ 
                    mb: 2, 
                    textAlign: 'left',
                    '& .MuiAlert-message': {
                      overflow: 'auto',
                      maxHeight: 150,
                      fontSize: '0.75rem'
                    }
                  }}
                >
                  <Typography variant="caption" component="div" sx={{ fontWeight: 600 }}>
                    {error.toString()}
                  </Typography>
                  {errorInfo && (
                    <Typography 
                      variant="caption" 
                      component="pre" 
                      sx={{ 
                        mt: 1, 
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-word'
                      }}
                    >
                      {errorInfo.componentStack}
                    </Typography>
                  )}
                </Alert>
              )}
              
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Button 
                  variant="outlined" 
                  color="primary"
                  onClick={this.handleRetry}
                  sx={{ minWidth: 100 }}
                >
                  Try Again
                </Button>
                <Button 
                  variant="contained" 
                  color="primary"
                  onClick={this.handleReturnToDashboard}
                  sx={{ minWidth: 140 }}
                >
                  Return to Dashboard
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      )
    }

    return children
  }
}

export default ErrorBoundary
