import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#0AA6A6',
      light: '#3DB8B8',
      dark: '#078585',
      contrastText: '#FFFFFF'
    },
    secondary: {
      main: '#F97316',
      light: '#FB923C',
      dark: '#EA580C',
      contrastText: '#FFFFFF'
    },
    background: {
      default: '#F3F4F6',
      paper: '#FFFFFF'
    },
    text: {
      primary: '#111827',
      secondary: '#6B7280'
    },
    success: {
      main: '#22C55E'
    },
    warning: {
      main: '#F59E0B'
    },
    error: {
      main: '#EF4444'
    }
  },
  typography: {
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h1: {
      fontFamily: 'Lexend, Inter, sans-serif',
      fontWeight: 700
    },
    h2: {
      fontFamily: 'Lexend, Inter, sans-serif',
      fontWeight: 700
    },
    h3: {
      fontFamily: 'Lexend, Inter, sans-serif',
      fontWeight: 600
    },
    h4: {
      fontFamily: 'Lexend, Inter, sans-serif',
      fontWeight: 600
    },
    h5: {
      fontFamily: 'Lexend, Inter, sans-serif',
      fontWeight: 600
    },
    h6: {
      fontFamily: 'Lexend, Inter, sans-serif',
      fontWeight: 600
    },
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightSemiBold: 600,
    fontWeightBold: 700
  },
  shape: {
    borderRadius: 12
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true
      },
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 12
        }
      }
    },
    MuiCard: {
      defaultProps: {
        elevation: 1
      },
      styleOverrides: {
        root: {
          borderRadius: 16
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12
        }
      }
    }
  }
})

export default theme
