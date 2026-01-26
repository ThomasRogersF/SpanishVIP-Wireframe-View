import { createTheme } from '@mui/material/styles'

/**
 * createMuiTheme - Dynamic theme generator that responds to SDK color changes
 * Accepts SDK configuration and creates a theme with dynamic palette colors
 * 
 * Includes touch-optimized styles for mobile:
 * - Minimum 48x48px touch targets for all interactive elements
 * - touch-action: manipulation to prevent zoom on double-tap
 * - Smooth transitions for active states
 * - Haptic-like visual feedback on press
 *
 * @param {Object} sdkConfig - SDK configuration object with color properties
 * @param {string} sdkConfig.hero_card_bg - Hero card background color (fallback: '#0AA6A6')
 * @param {string} sdkConfig.surface_color - App background color (fallback: '#F3F4F6')
 * @param {string} sdkConfig.text_color - Primary text color (fallback: '#111827')
 * @returns {Object} MUI theme object with dynamic palette
 */
function createMuiTheme(sdkConfig = {}) {
  const primaryColor = sdkConfig.hero_card_bg || '#0AA6A6'
  
  return createTheme({
    palette: {
      primary: {
        main: primaryColor,
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
        default: sdkConfig.surface_color || '#F3F4F6',
        paper: '#FFFFFF'
      },
      text: {
        primary: sdkConfig.text_color || '#111827',
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
      MuiCssBaseline: {
        styleOverrides: {
          // Global CSS resets for mobile-first experience
          '*': {
            WebkitTapHighlightColor: 'transparent',
            boxSizing: 'border-box'
          },
          'html, body': {
            margin: 0,
            padding: 0,
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale'
          },
          body: {
            overscrollBehavior: 'none', // Prevents pull-to-refresh on mobile
            // Prevent text selection on interactive elements
            'button, a, [role="button"]': {
              WebkitUserSelect: 'none',
              userSelect: 'none',
              WebkitTouchCallout: 'none'
            }
          }
        }
      },
      MuiButton: {
        defaultProps: {
          disableElevation: true,
          disableRipple: false // Ensure ripple is enabled for touch feedback
        },
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 600,
            borderRadius: 12,
            // Minimum touch target size (WCAG AAA: 48x48px)
            minHeight: 48,
            minWidth: 48,
            // Prevent zoom on double-tap
            touchAction: 'manipulation',
            // Remove tap highlight
            WebkitTapHighlightColor: 'transparent',
            // Smooth transitions for all states
            transition: 'transform 0.15s ease, background-color 0.2s ease, box-shadow 0.2s ease',
            // Active state feedback - scale down slightly on press
            '&:active': {
              transform: 'scale(0.97)'
            },
            // Focus visible for accessibility
            '&:focus-visible': {
              outline: `3px solid ${primaryColor}`,
              outlineOffset: '2px'
            }
          },
          // Ensure contained buttons have proper sizing
          contained: {
            padding: '12px 24px'
          },
          // Ensure outlined buttons have proper sizing
          outlined: {
            padding: '11px 23px' // Account for border
          },
          // Ensure text buttons have proper sizing
          text: {
            padding: '12px 16px'
          }
        }
      },
      MuiFab: {
        defaultProps: {
          disableRipple: false
        },
        styleOverrides: {
          root: {
            // Minimum touch target (already 56px default, but ensure)
            minWidth: 48,
            minHeight: 48,
            touchAction: 'manipulation',
            WebkitTapHighlightColor: 'transparent',
            transition: 'transform 0.15s ease, background-color 0.2s ease',
            '&:active': {
              transform: 'scale(0.95)'
            }
          }
        }
      },
      MuiIconButton: {
        defaultProps: {
          disableRipple: false
        },
        styleOverrides: {
          root: {
            // Minimum touch target size
            minWidth: 48,
            minHeight: 48,
            touchAction: 'manipulation',
            WebkitTapHighlightColor: 'transparent',
            transition: 'transform 0.15s ease, background-color 0.2s ease',
            '&:active': {
              transform: 'scale(0.92)'
            }
          }
        }
      },
      MuiCard: {
        defaultProps: {
          elevation: 1
        },
        styleOverrides: {
          root: {
            borderRadius: 16,
            // Smooth transition for interactive cards
            transition: 'transform 0.2s ease, box-shadow 0.2s ease'
          }
        }
      },
      MuiCardActionArea: {
        styleOverrides: {
          root: {
            touchAction: 'manipulation',
            WebkitTapHighlightColor: 'transparent',
            '&:active': {
              transform: 'scale(0.98)'
            }
          }
        }
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 12
          }
        }
      },
      MuiChip: {
        styleOverrides: {
          root: {
            // Ensure chips are touch-friendly when clickable
            '&.MuiChip-clickable': {
              minHeight: 36,
              touchAction: 'manipulation',
              '&:active': {
                transform: 'scale(0.97)'
              }
            }
          }
        }
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            // Minimum touch target height
            minHeight: 48,
            touchAction: 'manipulation',
            WebkitTapHighlightColor: 'transparent',
            transition: 'background-color 0.15s ease',
            '&:active': {
              backgroundColor: 'rgba(0, 0, 0, 0.08)'
            }
          }
        }
      },
      MuiBottomNavigationAction: {
        styleOverrides: {
          root: {
            // Minimum touch target
            minWidth: 48,
            minHeight: 48,
            touchAction: 'manipulation',
            WebkitTapHighlightColor: 'transparent'
          }
        }
      },
      MuiTab: {
        styleOverrides: {
          root: {
            // Minimum touch target
            minHeight: 48,
            touchAction: 'manipulation',
            WebkitTapHighlightColor: 'transparent'
          }
        }
      },
      MuiTouchRipple: {
        styleOverrides: {
          root: {
            // Customize ripple color to match theme
            color: `${primaryColor}40` // 25% opacity
          },
          ripple: {
            // Faster ripple animation for snappier feedback
            animationDuration: '400ms'
          }
        }
      }
    }
  })
}

// Default theme for initial render before SDK loads
const defaultTheme = createMuiTheme({
  hero_card_bg: '#0AA6A6',
  surface_color: '#F3F4F6',
  text_color: '#111827'
})

export { createMuiTheme, defaultTheme }
export default defaultTheme
