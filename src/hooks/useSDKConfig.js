import { useContext } from 'react'
import { SDKContext } from '../context/SDKContext'

/**
 * useSDKConfig - Custom hook for accessing SDK configuration
 * Provides access to the current SDK config state throughout the app
 *
 * @returns {Object} The SDK configuration object
 * @throws {Error} If used outside of SDKProvider
 *
 * @example
 * const config = useSDKConfig()
 * // Access config.hero_headline, config.hero_card_bg, etc.
 */
function useSDKConfig() {
  const context = useContext(SDKContext)

  if (!context) {
    throw new Error('useSDKConfig must be used within an SDKProvider')
  }

  return context.config
}

export default useSDKConfig
