/**
 * Voice Configuration Module
 * Manages environment variables and audio settings for voice conversation features
 */

// Validate and export API endpoints
export const STT_ENDPOINT = import.meta.env.VITE_STT_ENDPOINT
export const STT_API_KEY = import.meta.env.VITE_STT_API_KEY

export const TTS_ENDPOINT = import.meta.env.VITE_TTS_ENDPOINT
export const TTS_API_KEY = import.meta.env.VITE_TTS_API_KEY

export const LLM_ENDPOINT = import.meta.env.VITE_LLM_ENDPOINT
export const LLM_API_KEY = import.meta.env.VITE_LLM_API_KEY

// Audio settings optimized for Kokoro-82M
export const AUDIO_CONFIG = {
  sampleRate: 24000,        // 24kHz optimal for Kokoro
  channels: 1,              // Mono audio
  bitDepth: 16,             // 16-bit PCM
  mimeType: 'audio/wav'     // WAV format for STT
}

// Validation helper
export const validateConfig = () => {
  const missing = []
  
  if (!STT_ENDPOINT) missing.push('VITE_STT_ENDPOINT')
  if (!STT_API_KEY) missing.push('VITE_STT_API_KEY')
  if (!TTS_ENDPOINT) missing.push('VITE_TTS_ENDPOINT')
  if (!TTS_API_KEY) missing.push('VITE_TTS_API_KEY')
  if (!LLM_ENDPOINT) missing.push('VITE_LLM_ENDPOINT')
  if (!LLM_API_KEY) missing.push('VITE_LLM_API_KEY')
  
  if (missing.length > 0) {
    console.warn(
      `[VoiceConfig] Missing environment variables: ${missing.join(', ')}\n` +
      'Copy .env.example to .env.local and configure your API endpoints.'
    )
    return false
  }
  
  return true
}
