/**
 * Voice API Client
 * Handles communication with Speech-to-Text, Text-to-Speech, and Language Model APIs
 */

import {
  STT_ENDPOINT,
  STT_API_KEY,
  TTS_ENDPOINT,
  TTS_API_KEY,
  LLM_ENDPOINT,
  LLM_API_KEY
} from '../config/voiceConfig.js'

/**
 * Custom error class for Voice API operations
 */
export class VoiceAPIError extends Error {
  /**
   * @param {string} message - Error message
   * @param {string} service - Service name ('STT', 'TTS', or 'LLM')
   * @param {number|null} statusCode - HTTP status code if available
   */
  constructor(message, service, statusCode = null) {
    super(message)
    this.name = 'VoiceAPIError'
    this.service = service
    this.statusCode = statusCode
  }
}

/**
 * Transcribe audio to text using FastWhisper Tiny API
 * @param {Blob} audioBlob - Audio blob containing WAV data
 * @returns {Promise<string>} Transcribed text
 * @throws {VoiceAPIError} If transcription fails
 */
export async function transcribeAudio(audioBlob) {
  try {
    const formData = new FormData()
    formData.append('audio', audioBlob, 'recording.wav')
    
    const response = await fetch(STT_ENDPOINT, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${STT_API_KEY}`
      },
      body: formData
    })
    
    if (!response.ok) {
      throw new VoiceAPIError(
        `STT request failed: ${response.statusText}`,
        'STT',
        response.status
      )
    }
    
    const data = await response.json()
    const transcription = data.text || data.transcription || ''
    
    if (import.meta.env.DEV) {
      console.log('[STT] Transcription:', transcription)
    }
    
    return transcription
    
  } catch (error) {
    if (error instanceof VoiceAPIError) throw error
    
    if (import.meta.env.DEV) {
      console.error('[STT] Error:', error)
    }
    
    throw new VoiceAPIError(
      `STT network error: ${error.message}`,
      'STT'
    )
  }
}

/**
 * Generate LLM response from conversation history
 * @param {Array<{role: string, content: string}>} messages - Conversation history
 * @returns {Promise<string>} LLM response text
 * @throws {VoiceAPIError} If generation fails
 */
export async function generateLLMResponse(messages) {
  try {
    const response = await fetch(LLM_ENDPOINT, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LLM_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ messages })
    })
    
    if (!response.ok) {
      throw new VoiceAPIError(
        `LLM request failed: ${response.statusText}`,
        'LLM',
        response.status
      )
    }
    
    const data = await response.json()
    const responseText = data.response || data.content || data.text || ''
    
    if (import.meta.env.DEV) {
      console.log('[LLM] Response:', responseText)
    }
    
    return responseText
    
  } catch (error) {
    if (error instanceof VoiceAPIError) throw error
    
    if (import.meta.env.DEV) {
      console.error('[LLM] Error:', error)
    }
    
    throw new VoiceAPIError(
      `LLM network error: ${error.message}`,
      'LLM'
    )
  }
}

/**
 * Synthesize speech from text using Kokoro-82M API
 * @param {string} text - Text to convert to speech
 * @returns {Promise<Blob>} Audio blob (24kHz WAV)
 * @throws {VoiceAPIError} If synthesis fails
 */
export async function synthesizeSpeech(text) {
  try {
    const response = await fetch(TTS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${TTS_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text })
    })
    
    if (!response.ok) {
      throw new VoiceAPIError(
        `TTS request failed: ${response.statusText}`,
        'TTS',
        response.status
      )
    }
    
    const audioBlob = await response.blob()
    
    if (import.meta.env.DEV) {
      console.log('[TTS] Audio blob size:', audioBlob.size, 'bytes')
    }
    
    return audioBlob
    
  } catch (error) {
    if (error instanceof VoiceAPIError) throw error
    
    if (import.meta.env.DEV) {
      console.error('[TTS] Error:', error)
    }
    
    throw new VoiceAPIError(
      `TTS network error: ${error.message}`,
      'TTS'
    )
  }
}
