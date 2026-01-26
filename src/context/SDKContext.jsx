import { createContext, useState, useEffect, useRef } from 'react'

// Default configuration object with all SDK properties
const defaultConfig = {
  hero_headline: 'Continue Unit 1: Cafe Culture',
  hero_subheadline: 'Lesson 4: Ordering with Politeness',
  hero_button: 'Resume Class',
  sofia_nudge: "You left off at the Roleplay. Let's finish ordering that coffee.",
  quick_win_headline: 'Short on time?',
  quick_win_action: 'Do a 2-Min Vocab Drill ⚡',
  upsell_text: 'Stuck on a concept?',
  upsell_action: 'Book a Human Tutor ($15)',
  hero_card_bg: '#14B8A6',
  hero_card_text: '#FFFFFF',
  surface_color: '#FFFFFF',
  text_color: '#111827',
  primary_action_color: '#FFFFFF'
}

// Create the SDK Context
export const SDKContext = createContext(null)

/**
 * SDKProvider - Manages SDK configuration state and provides it throughout the app
 * Handles SDK initialization, configuration changes, and capability mapping
 */
export function SDKProvider({ children }) {
  const [config, setConfig] = useState(defaultConfig)
  const configRef = useRef(config)

  /**
   * onConfigChange - Callback for SDK configuration updates
   * Merges new config with defaults and updates state
   */
  const onConfigChange = (newConfig) => {
    setConfig((prevConfig) => ({
      ...defaultConfig,
      ...prevConfig,
      ...newConfig
    }))
  }

  /**
   * mapToCapabilities - Maps configuration to SDK recolorable capabilities
   * Returns array of color properties with get/set functions
   */
  const mapToCapabilities = () => {
    return {
      recolorables: [
        {
          get: () => configRef.current.hero_card_bg || defaultConfig.hero_card_bg,
          set: (value) => {
            if (window.elementSdk) {
              window.elementSdk.setConfig({ hero_card_bg: value })
            }
          }
        },
        {
          get: () => configRef.current.hero_card_text || defaultConfig.hero_card_text,
          set: (value) => {
            if (window.elementSdk) {
              window.elementSdk.setConfig({ hero_card_text: value })
            }
          }
        },
        {
          get: () => configRef.current.surface_color || defaultConfig.surface_color,
          set: (value) => {
            if (window.elementSdk) {
              window.elementSdk.setConfig({ surface_color: value })
            }
          }
        },
        {
          get: () => configRef.current.text_color || defaultConfig.text_color,
          set: (value) => {
            if (window.elementSdk) {
              window.elementSdk.setConfig({ text_color: value })
            }
          }
        },
        {
          get: () => configRef.current.primary_action_color || defaultConfig.primary_action_color,
          set: (value) => {
            if (window.elementSdk) {
              window.elementSdk.setConfig({ primary_action_color: value })
            }
          }
        }
      ],
      borderables: [],
      fontEditable: undefined,
      fontSizeable: undefined
    }
  }

  /**
   * mapToEditPanelValues - Maps configuration to SDK edit panel text fields
   * Returns Map with text field values for SDK editor
   */
  const mapToEditPanelValues = () => {
    return new Map([
      ['hero_headline', configRef.current.hero_headline || defaultConfig.hero_headline],
      ['hero_subheadline', configRef.current.hero_subheadline || defaultConfig.hero_subheadline],
      ['hero_button', configRef.current.hero_button || defaultConfig.hero_button],
      ['sofia_nudge', configRef.current.sofia_nudge || defaultConfig.sofia_nudge],
      ['quick_win_headline', configRef.current.quick_win_headline || defaultConfig.quick_win_headline],
      ['quick_win_action', configRef.current.quick_win_action || defaultConfig.quick_win_action],
      ['upsell_text', configRef.current.upsell_text || defaultConfig.upsell_text],
      ['upsell_action', configRef.current.upsell_action || defaultConfig.upsell_action]
    ])
  }

  /**
   * Initialize SDK on mount
   * Sets up callbacks and initializes with default config if SDK is available
   */
  // Update configRef whenever config changes
  useEffect(() => {
    configRef.current = config
  }, [config])

  /**
   * Initialize SDK on mount and re-init when config changes
   * Sets up callbacks and initializes with default config if SDK is available
   */
  useEffect(() => {
    if (window.elementSdk) {
      window.elementSdk.init({
        defaultConfig,
        onConfigChange,
        mapToCapabilities,
        mapToEditPanelValues
      })
    } else {
      // If SDK is not available, initialize with default config
      onConfigChange(defaultConfig)
    }
  }, [config])

  // Provide config and helper functions via Context value
  const value = {
    config,
    onConfigChange,
    mapToCapabilities,
    mapToEditPanelValues,
    defaultConfig
  }

  return <SDKContext.Provider value={value}>{children}</SDKContext.Provider>
}
