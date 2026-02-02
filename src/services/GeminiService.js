/**
 * GeminiService - Multimodal AI service for audio conversations
 * 
 * This service provides a comprehensive interface to Google's Gemini API
 * with support for audio input (STT), text-to-speech (TTS), and function calling.
 * 
 * @example
 * const geminiService = new GeminiService();
 * 
 * // Start a chat session with system instruction and tools
 * geminiService.startChat(systemPrompt, toolDefinitions);
 * 
 * // Send audio and get response
 * const audioBlob = await recorder.stop();
 * const response = await geminiService.sendAudioMessage(audioBlob);
 * 
 * // Generate TTS audio
 * const audioBlob = await geminiService.generateTTS(response.text);
 * 
 * // Play the audio
 * const audioUrl = URL.createObjectURL(audioBlob);
 * const audio = new Audio(audioUrl);
 * audio.play();
 */

import { GoogleGenerativeAI } from '@google/generative-ai';

// Configuration constants
const GEMINI_CONFIG = {
  CHAT_MODEL: 'gemini-2.0-flash',
  MAX_AUDIO_SIZE_MB: 20,
  SUPPORTED_AUDIO_FORMATS: ['audio/webm;codecs=opus', 'audio/webm', 'audio/mp3', 'audio/wav', 'audio/ogg'],
  DEFAULT_TEMPERATURE: 0.7,
  DEFAULT_MAX_TOKENS: 150,
};

// ElevenLabs configuration
const ELEVENLABS_CONFIG = {
  API_URL: 'https://api.elevenlabs.io/v1/text-to-speech',
  // Spanish voice IDs (you can change these to your preferred voices)
  VOICES: {
    JORGE: 'pNInz6obpgDQGcFmaJgB', // Adam - male voice (good for Spanish)
    // Alternative voices you can try:
    // 'EXAVITQu4vr4xnSDxMaL', // Bella - female
    // 'ErXwobaYiN019PkySvjV', // Antoni - male
    // 'VR6AewLTigWG4xSOukaG', // Arnold - male
  },
  DEFAULT_VOICE: 'pNInz6obpgDQGcFmaJgB', // Adam
  MODEL_ID: 'eleven_multilingual_v2', // Supports Spanish
  VOICE_SETTINGS: {
    stability: 0.5,
    similarity_boost: 0.75,
    style: 0.0,
    use_speaker_boost: true
  }
};

/**
 * Custom error class for GeminiService errors
 */
class GeminiServiceError extends Error {
  constructor(message, code, originalError = null) {
    super(message);
    this.name = 'GeminiServiceError';
    this.code = code;
    this.originalError = originalError;
    this.userMessage = this.getUserFriendlyMessage(code);
  }

  getUserFriendlyMessage(code) {
    const messages = {
      'API_KEY_MISSING': 'API key is not configured. Please add VITE_GEMINI_API_KEY to your .env file.',
      'NETWORK_ERROR': 'Unable to connect to the AI service. Please check your internet connection.',
      'RATE_LIMIT': 'Too many requests. Please wait a moment and try again.',
      'AUDIO_FORMAT_ERROR': 'The audio format is not supported. Please use a different recording format.',
      'AUDIO_SIZE_ERROR': 'The audio file is too large. Please record a shorter message.',
      'TTS_ERROR': 'Unable to generate speech audio. Please try again.',
      'CHAT_NOT_INITIALIZED': 'Chat session not initialized. Please call startChat() first.',
      'INVALID_RESPONSE': 'Received an invalid response from the AI service.',
      'FUNCTION_CALL_ERROR': 'Error processing function call from the AI.'
    };
    return messages[code] || 'An unexpected error occurred. Please try again.';
  }
}

/**
 * GeminiService class for managing multimodal AI interactions
 */
class GeminiService {
  constructor() {
    console.debug('[GeminiService] Initializing service...');
    
    // Validate API key
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey || apiKey === 'your_api_key_here') {
      throw new GeminiServiceError(
        'VITE_GEMINI_API_KEY environment variable is not set or is using the placeholder value',
        'API_KEY_MISSING'
      );
    }

    // Initialize the Google Generative AI client
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.chatSession = null;
    this.chatModel = null;
    
    console.debug('[GeminiService] Service initialized successfully');
  }

  /**
   * Start a new chat session with system instruction and tools
   * @param {string} systemInstruction - The system prompt for the AI persona
   * @param {Array} tools - Array of function declarations for function calling
   * @returns {Object} The chat session object
   */
  startChat(systemInstruction, tools = []) {
    console.debug('[GeminiService] Starting chat session...');
    console.debug('[GeminiService] System instruction length:', systemInstruction?.length || 0);
    console.debug('[GeminiService] Tools provided:', tools.length);

    try {
      // Get the chat model (supports audio input)
      this.chatModel = this.genAI.getGenerativeModel({
        model: GEMINI_CONFIG.CHAT_MODEL,
        systemInstruction: systemInstruction,
        tools: tools.length > 0 ? tools : undefined,
        generationConfig: {
          temperature: GEMINI_CONFIG.DEFAULT_TEMPERATURE,
          maxOutputTokens: GEMINI_CONFIG.DEFAULT_MAX_TOKENS,
        }
      });

      // Start the chat session
      this.chatSession = this.chatModel.startChat({
        history: []
      });

      console.debug('[GeminiService] Chat session started successfully');
      return this.chatSession;
    } catch (error) {
      console.error('[GeminiService] Error starting chat session:', error);
      throw new GeminiServiceError(
        'Failed to start chat session',
        'CHAT_INITIALIZATION_ERROR',
        error
      );
    }
  }

  /**
   * Send an audio message to the chat session
   * @param {Blob} audioBlob - The audio blob from MediaRecorder
   * @returns {Promise<Object>} Response object with text, functionCalls, and finishReason
   */
  async sendAudioMessage(audioBlob) {
    console.debug('[GeminiService] Processing audio message...');
    console.debug('[GeminiService] Audio blob size:', (audioBlob.size / 1024 / 1024).toFixed(2), 'MB');
    console.debug('[GeminiService] Audio blob type:', audioBlob.type);

    // Validate chat session
    if (!this.chatSession) {
      throw new GeminiServiceError(
        'Chat session not initialized. Call startChat() first.',
        'CHAT_NOT_INITIALIZED'
      );
    }

    // Validate audio format
    if (!GEMINI_CONFIG.SUPPORTED_AUDIO_FORMATS.includes(audioBlob.type)) {
      throw new GeminiServiceError(
        `Unsupported audio format: ${audioBlob.type}`,
        'AUDIO_FORMAT_ERROR'
      );
    }

    // Validate audio size
    const audioSizeMB = audioBlob.size / 1024 / 1024;
    if (audioSizeMB > GEMINI_CONFIG.MAX_AUDIO_SIZE_MB) {
      throw new GeminiServiceError(
        `Audio file too large: ${audioSizeMB.toFixed(2)}MB (max: ${GEMINI_CONFIG.MAX_AUDIO_SIZE_MB}MB)`,
        'AUDIO_SIZE_ERROR'
      );
    }

    try {
      // Convert blob to base64
      const base64Audio = await this.blobToBase64(audioBlob);
      console.debug('[GeminiService] Audio converted to base64, length:', base64Audio.length);

      // Create content array with audio data
      const content = {
        inlineData: {
          mimeType: audioBlob.type,
          data: base64Audio
        }
      };

      // Send message to chat session
      console.debug('[GeminiService] Sending audio to Gemini API...');
      const result = await this.chatSession.sendMessage([content]);
      const response = result.response;

      console.debug('[GeminiService] Received response from Gemini API');

      // Extract text response
      const text = response.text();
      console.debug('[GeminiService] Response text length:', text?.length || 0);

      // Extract function calls if present
      const functionCalls = [];
      if (response.functionCalls && response.functionCalls()) {
        const calls = response.functionCalls();
        functionCalls.push(...calls);
        console.debug('[GeminiService] Function calls detected:', functionCalls.length);
      }

      // Get finish reason
      const finishReason = response.candidates?.[0]?.finishReason || 'STOP';
      console.debug('[GeminiService] Finish reason:', finishReason);

      return {
        text,
        functionCalls,
        finishReason
      };
    } catch (error) {
      console.error('[GeminiService] Error sending audio message:', error);

      // Check for rate limiting
      if (error.message?.includes('429') || error.message?.includes('quota')) {
        throw new GeminiServiceError(
          'Rate limit exceeded',
          'RATE_LIMIT',
          error
        );
      }

      // Check for network errors
      if (error.message?.includes('fetch') || error.message?.includes('network')) {
        throw new GeminiServiceError(
          'Network error occurred',
          'NETWORK_ERROR',
          error
        );
      }

      // Generic error
      throw new GeminiServiceError(
        'Failed to process audio message',
        'INVALID_RESPONSE',
        error
      );
    }
  }

  /**
   * Generate text-to-speech audio from text using ElevenLabs API
   * @param {string} text - The text to convert to speech
   * @param {Object} voiceConfig - Optional voice configuration (not used with ElevenLabs)
   * @returns {Promise<Blob>} Audio blob that can be played
   */
  async generateTTS(text, voiceConfig = null) {
    console.debug('[GeminiService] Generating TTS audio with ElevenLabs...');
    console.debug('[GeminiService] Text length:', text?.length || 0);

    if (!text || text.trim().length === 0) {
      throw new GeminiServiceError(
        'Text is required for TTS generation',
        'TTS_ERROR'
      );
    }

    // Validate ElevenLabs API key
    const apiKey = import.meta.env.VITE_ELEVENLABS_API_KEY;
    if (!apiKey || apiKey === 'your_elevenlabs_api_key_here') {
      throw new GeminiServiceError(
        'VITE_ELEVENLABS_API_KEY environment variable is not set',
        'API_KEY_MISSING'
      );
    }

    try {
      const voiceId = ELEVENLABS_CONFIG.DEFAULT_VOICE;
      const url = `${ELEVENLABS_CONFIG.API_URL}/${voiceId}`;

      console.debug('[GeminiService] Sending TTS request to ElevenLabs API...');
      console.debug('[GeminiService] Voice ID:', voiceId);

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': apiKey
        },
        body: JSON.stringify({
          text: text,
          model_id: ELEVENLABS_CONFIG.MODEL_ID,
          voice_settings: ELEVENLABS_CONFIG.VOICE_SETTINGS
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('[GeminiService] ElevenLabs API error:', response.status, errorText);
        
        if (response.status === 401) {
          throw new GeminiServiceError(
            'Invalid ElevenLabs API key',
            'API_KEY_MISSING'
          );
        } else if (response.status === 429) {
          throw new GeminiServiceError(
            'ElevenLabs rate limit exceeded',
            'RATE_LIMIT'
          );
        } else {
          throw new Error(`ElevenLabs API error: ${response.status} ${errorText}`);
        }
      }

      // Get audio blob from response
      const audioBlob = await response.blob();
      console.debug('[GeminiService] TTS audio received from ElevenLabs');
      console.debug('[GeminiService] Audio blob size:', (audioBlob.size / 1024).toFixed(2), 'KB');
      console.debug('[GeminiService] Audio blob type:', audioBlob.type);

      return audioBlob;
    } catch (error) {
      console.error('[GeminiService] Error generating TTS:', error);

      // Check for rate limiting
      if (error.message?.includes('429') || error.message?.includes('quota')) {
        throw new GeminiServiceError(
          'Rate limit exceeded',
          'RATE_LIMIT',
          error
        );
      }

      // Check for network errors
      if (error.message?.includes('fetch') || error.message?.includes('network')) {
        throw new GeminiServiceError(
          'Network error occurred',
          'NETWORK_ERROR',
          error
        );
      }

      // If already a GeminiServiceError, rethrow
      if (error instanceof GeminiServiceError) {
        throw error;
      }

      // Generic error
      throw new GeminiServiceError(
        'Failed to generate TTS audio',
        'TTS_ERROR',
        error
      );
    }
  }

  /**
   * Convert a Blob to base64 string
   * @param {Blob} blob - The blob to convert
   * @returns {Promise<string>} Base64 encoded string (without data URL prefix)
   */
  async blobToBase64(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onloadend = () => {
        // Remove the data URL prefix (e.g., "data:audio/webm;base64,")
        const base64 = reader.result.split(',')[1];
        resolve(base64);
      };
      
      reader.onerror = (error) => {
        console.error('[GeminiService] Error converting blob to base64:', error);
        reject(new GeminiServiceError(
          'Failed to convert audio blob to base64',
          'AUDIO_FORMAT_ERROR',
          error
        ));
      };
      
      reader.readAsDataURL(blob);
    });
  }

  /**
   * Convert base64 string to Blob
   * @param {string} base64Data - Base64 encoded data (without data URL prefix)
   * @param {string} mimeType - MIME type of the data (e.g., 'audio/mp3')
   * @returns {Blob} Blob object
   */
  base64ToBlob(base64Data, mimeType) {
    try {
      // Decode base64 to binary string
      const binaryString = atob(base64Data);
      
      // Convert binary string to byte array
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      
      // Create and return blob
      return new Blob([bytes], { type: mimeType });
    } catch (error) {
      console.error('[GeminiService] Error converting base64 to blob:', error);
      throw new GeminiServiceError(
        'Failed to convert base64 to audio blob',
        'AUDIO_FORMAT_ERROR',
        error
      );
    }
  }

  /**
   * Reset the chat session
   * Clears conversation history and allows starting fresh
   */
  resetChat() {
    console.debug('[GeminiService] Resetting chat session...');
    this.chatSession = null;
    this.chatModel = null;
    console.debug('[GeminiService] Chat session reset complete');
  }

  /**
   * Get the current chat session
   * @returns {Object|null} The current chat session or null if not initialized
   */
  getChatSession() {
    return this.chatSession;
  }

  /**
   * Check if chat session is active
   * @returns {boolean} True if chat session is initialized
   */
  isChatActive() {
    return this.chatSession !== null;
  }
}

// Export the service class and configuration
export default GeminiService;
export { GEMINI_CONFIG, ELEVENLABS_CONFIG, GeminiServiceError };
