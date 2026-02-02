import GeminiService, { GeminiServiceError } from './GeminiService.js';

/**
 * System instruction defining Jorge's persona and the lesson flow
 * @constant {string}
 */
const JORGE_SYSTEM_INSTRUCTION = `
**CONTEXT: SPANISH LEARNING SCENARIO (Level A1)**
You are 'Jorge', a taxi driver in Bogotá, acting as a conversation partner for a student learning Spanish.

This is NOT a general chat. This is a structured educational roleplay.

**YOUR PRIME DIRECTIVES:**
1. **Language:** Speak ONLY in Spanish. If the user speaks English, politely say you don't understand and ask for Spanish (e.g., "¿Cómo? No te entiendo. ¿En español?").
2. **Level Control:** Speak simply. Use common vocabulary. Enunciate clearly.
3. **Patience:** If the user struggles, do not solve the problem for them. Wait or offer a simple hint.

**YOUR PERSONA:**
- Name: Jorge.
- Role: Friendly, chatty taxi driver.
- Tone: Warm, encouraging, slightly fast (Colombian style) but clear.

**THE LESSON FLOW (State Machine):**
1. [STATE_GREETING]: Start the conversation. Say hello and ask "Where are we going?" (¿A dónde vamos?)
   - WAIT for user to mention a destination.
2. [STATE_SMALL_TALK]: Acknowledge destination. Ask "Is it your first time in Colombia?"
   - WAIT for Yes/No.
3. [STATE_ORIGIN]: Ask "Where are you from?" (¿De dónde eres?)
   - FAIL STATE: If user uses incorrect grammar (e.g., "Yo ser de..."), gently correct them implicitly (e.g., "Ah, eres de...").
   - SUCCESS: Move to next state.
4. [STATE_PAYMENT]: Say you arrived. Ask "Cash or Card?" (¿Efectivo o tarjeta?)
5. [STATE_END]: Say "Welcome" and call the \`finish_lesson\` tool.

**CRITICAL:**
- Do not output the state name.
- Keep responses short (under 15 words).
- If the user is silent or stuck, call the \`show_hint\` tool.
`;

/**
 * Function calling tools for lesson control
 * @constant {Object}
 */
const LESSON_TOOLS = {
  functionDeclarations: [
    {
      name: 'finish_lesson',
      description: 'Call this when the user successfully completes the payment step and the ride is over.',
      parameters: {
        type: 'object',
        properties: {
          success: {
            type: 'boolean',
            description: 'Whether the lesson was completed successfully'
          }
        },
        required: ['success']
      }
    },
    {
      name: 'show_hint',
      description: 'Call this if the user is stuck, silent, or answers incorrectly multiple times.',
      parameters: {
        type: 'object',
        properties: {
          hint_text: {
            type: 'string',
            description: 'The hint text to display to the user, e.g., "Try saying: Voy al hotel..."'
          }
        },
        required: ['hint_text']
      }
    }
  ]
};

/**
 * TaxiRideLessonHandler - Manages the "Jorge the Taxi Driver" voice lesson
 * 
 * This handler extends GeminiService to provide a structured conversational
 * lesson where students practice Spanish with Jorge, a friendly taxi driver
 * in Bogotá. The lesson follows a 5-state flow with function calling for
 * hints and lesson completion.
 * 
 * @extends GeminiService
 * 
 * @example
 * const handler = new TaxiRideLessonHandler();
 * await handler.initializeLesson();
 * 
 * // User speaks into microphone
 * const audioBlob = await recorder.stop();
 * const response = await handler.processTurn(audioBlob);
 * 
 * // Play Jorge's response
 * if (response.audioBlob) {
 *   const audio = new Audio(URL.createObjectURL(response.audioBlob));
 *   audio.play();
 * }
 * 
 * // Handle function calls
 * if (response.functionCalls.length > 0) {
 *   response.functionCalls.forEach(call => {
 *     if (call.name === 'finish_lesson') {
 *       // Show success modal
 *     } else if (call.name === 'show_hint') {
 *       // Display hint chip
 *     }
 *   });
 * }
 */
class TaxiRideLessonHandler extends GeminiService {
  /**
   * Creates a new TaxiRideLessonHandler instance
   */
  constructor() {
    super();
    this.chatSession = null;
    console.log('[TaxiRideLessonHandler] Handler instance created');
  }

  /**
   * Initializes the lesson by starting a chat session with Jorge's persona
   * 
   * @returns {Promise<boolean>} True if initialization was successful
   * @throws {GeminiServiceError} If initialization fails
   * 
   * @example
   * const handler = new TaxiRideLessonHandler();
   * await handler.initializeLesson();
   */
  async initializeLesson() {
    try {
      console.log('[TaxiRideLessonHandler] Initializing lesson with Jorge persona...');
      
      // Start chat session with system instruction and tools
      this.chatSession = await this.startChat(JORGE_SYSTEM_INSTRUCTION, [LESSON_TOOLS]);
      
      console.log('[TaxiRideLessonHandler] Lesson initialized successfully');
      return true;
    } catch (error) {
      console.error('[TaxiRideLessonHandler] Failed to initialize lesson:', error);
      
      if (error instanceof GeminiServiceError) {
        throw error;
      }
      
      throw new GeminiServiceError(
        'Failed to initialize Jorge lesson',
        'INITIALIZATION_ERROR',
        error
      );
    }
  }

  /**
   * Processes a single conversation turn with audio input
   * 
   * @param {Blob} audioBlob - Audio blob from MediaRecorder containing user's spoken Spanish
   * @returns {Promise<Object>} Response object containing text, audio, and function calls
   * @returns {string} return.text - Jorge's text response
   * @returns {Blob|null} return.audioBlob - TTS audio blob to play
   * @returns {Array<Object>} return.functionCalls - Array of function calls from Gemini
   * @returns {string} return.finishReason - Reason the response finished
   * @throws {GeminiServiceError} If chat is not initialized or processing fails
   * 
   * @example
   * const audioBlob = await recorder.stop();
   * const response = await handler.processTurn(audioBlob);
   * 
   * console.log('Jorge says:', response.text);
   * 
   * if (response.audioBlob) {
   *   const audio = new Audio(URL.createObjectURL(response.audioBlob));
   *   await audio.play();
   * }
   * 
   * response.functionCalls.forEach(call => {
   *   if (call.name === 'finish_lesson') {
   *     console.log('Lesson completed:', call.args.success);
   *   } else if (call.name === 'show_hint') {
   *     console.log('Hint:', call.args.hint_text);
   *   }
   * });
   */
  async processTurn(audioBlob) {
    try {
      // Validate chat session is initialized
      if (!this.chatSession) {
        throw new GeminiServiceError(
          'Lesson not initialized. Call initializeLesson() first.',
          'SESSION_NOT_INITIALIZED'
        );
      }

      console.log('[TaxiRideLessonHandler] Processing audio turn...');
      console.log('[TaxiRideLessonHandler] Audio blob size:', audioBlob.size, 'bytes');

      // Send audio to Gemini for STT and processing
      const response = await this.sendAudioMessage(audioBlob);
      
      console.log('[TaxiRideLessonHandler] Received response from Gemini');
      console.log('[TaxiRideLessonHandler] Response text:', response.text);
      console.log('[TaxiRideLessonHandler] Function calls:', response.functionCalls?.length || 0);
      console.log('[TaxiRideLessonHandler] Finish reason:', response.finishReason);

      // Process function calls if present
      const functionCalls = [];
      if (response.functionCalls && response.functionCalls.length > 0) {
        response.functionCalls.forEach(call => {
          console.log(`[TaxiRideLessonHandler] Function call: ${call.name}`, call.args);
          
          if (call.name === 'finish_lesson') {
            functionCalls.push({
              name: 'finish_lesson',
              args: {
                success: call.args.success
              }
            });
          } else if (call.name === 'show_hint') {
            functionCalls.push({
              name: 'show_hint',
              args: {
                hint_text: call.args.hint_text
              }
            });
          }
        });
      }

      // Generate TTS audio if there's text response
      let ttsAudioBlob = null;
      if (response.text && response.text.trim().length > 0) {
        console.log('[TaxiRideLessonHandler] Generating TTS for Jorge\'s response...');
        
        try {
          ttsAudioBlob = await this.generateTTS(response.text);
          console.log('[TaxiRideLessonHandler] TTS generated successfully, size:', ttsAudioBlob?.size || 0, 'bytes');
        } catch (ttsError) {
          console.error('[TaxiRideLessonHandler] TTS generation failed:', ttsError);
          // Don't throw - we can still return the text response
          throw new GeminiServiceError(
            'Could not generate Jorge\'s voice response',
            'TTS_ERROR',
            ttsError
          );
        }
      }

      // Return structured response
      const result = {
        text: response.text || '',
        audioBlob: ttsAudioBlob,
        functionCalls: functionCalls,
        finishReason: response.finishReason || 'STOP'
      };

      console.log('[TaxiRideLessonHandler] Turn processed successfully');
      return result;

    } catch (error) {
      console.error('[TaxiRideLessonHandler] Error processing turn:', error);

      // Provide user-friendly error messages
      if (error instanceof GeminiServiceError) {
        // Add lesson-specific context to existing errors
        if (error.code === 'API_ERROR') {
          throw new GeminiServiceError(
            'Jorge is not available right now. Please try again.',
            error.code,
            error.originalError
          );
        } else if (error.code === 'AUDIO_PROCESSING_ERROR') {
          throw new GeminiServiceError(
            'Could not understand your audio. Please speak clearly and try again.',
            error.code,
            error.originalError
          );
        }
        throw error;
      }

      // Wrap unknown errors
      throw new GeminiServiceError(
        'An unexpected error occurred during the lesson',
        'UNKNOWN_ERROR',
        error
      );
    }
  }

  /**
   * Resets the lesson to start from the beginning
   * 
   * @returns {void}
   * 
   * @example
   * handler.resetLesson();
   * await handler.initializeLesson(); // Start fresh
   */
  resetLesson() {
    console.log('[TaxiRideLessonHandler] Resetting lesson...');
    
    try {
      this.resetChat();
      this.chatSession = null;
      console.log('[TaxiRideLessonHandler] Lesson reset successfully');
    } catch (error) {
      console.error('[TaxiRideLessonHandler] Error resetting lesson:', error);
      // Don't throw - reset should always succeed
      this.chatSession = null;
    }
  }

  /**
   * Checks if the lesson is currently active
   * 
   * @returns {boolean} True if lesson is initialized and active
   * 
   * @example
   * if (handler.isLessonActive()) {
   *   const response = await handler.processTurn(audioBlob);
   * } else {
   *   await handler.initializeLesson();
   * }
   */
  isLessonActive() {
    const isActive = this.isChatActive();
    console.log('[TaxiRideLessonHandler] Lesson active status:', isActive);
    return isActive;
  }
}

// Named export for ES6 import syntax
export { TaxiRideLessonHandler };

// Default export for backward compatibility
export default TaxiRideLessonHandler;
