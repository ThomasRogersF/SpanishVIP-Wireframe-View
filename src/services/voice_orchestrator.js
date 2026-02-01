/**
 * Voice Orchestrator Service
 * 
 * Manages the full conversation pipeline: audio → STT → LLM → TTS → playback
 * Maintains conversation history and orchestrates all voice interaction stages
 */

import { transcribeAudio, generateLLMResponse, synthesizeSpeech } from './api_client.js';
import { playAudio, cleanup } from './audio_manager.js';

// ============================================================================
// CONSTANTS
// ============================================================================

const SYSTEM_PROMPT = "You are a friendly, casual conversation partner helping me practice. Keep your responses short (1-2 sentences max) and engaging. Do not use markdown or emojis, just spoken text.";

const MAX_CONVERSATION_HISTORY = 50; // Configurable limit for memory management
const MIN_AUDIO_SIZE_BYTES = 1024; // 1KB minimum threshold

export const PIPELINE_STAGES = {
  IDLE: 'idle',
  TRANSCRIBING: 'transcribing',
  THINKING: 'thinking',
  SYNTHESIZING: 'synthesizing',
  SPEAKING: 'speaking'
};

// ============================================================================
// INTERNAL STATE
// ============================================================================

let messages = [];
let isProcessing = false;
let conversationStartTime = null;

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Log development messages with timestamps
 */
function devLog(message, data = null) {
  if (import.meta.env.DEV) {
    const timestamp = new Date().toISOString();
    console.log(`[VoiceOrchestrator ${timestamp}]`, message, data || '');
  }
}

/**
 * Calculate time elapsed since a start time
 */
function getElapsedTime(startTime) {
  return Date.now() - startTime;
}

/**
 * Create a timestamped message object
 */
function createMessage(role, content) {
  return {
    role,
    content,
    timestamp: new Date().toISOString()
  };
}

/**
 * Validate message format
 */
function validateMessage(message) {
  return (
    message &&
    typeof message === 'object' &&
    typeof message.role === 'string' &&
    typeof message.content === 'string' &&
    ['system', 'user', 'assistant'].includes(message.role)
  );
}

/**
 * Trim conversation history to prevent memory issues
 */
function trimHistory() {
  if (messages.length > MAX_CONVERSATION_HISTORY + 1) { // +1 for system prompt
    devLog('Trimming conversation history', { 
      before: messages.length, 
      limit: MAX_CONVERSATION_HISTORY 
    });
    
    // Keep system prompt (first message) and last N messages
    const systemPrompt = messages[0];
    const recentMessages = messages.slice(-MAX_CONVERSATION_HISTORY);
    messages = [systemPrompt, ...recentMessages];
    
    devLog('History trimmed', { after: messages.length });
  }
}

// ============================================================================
// CORE FUNCTIONS
// ============================================================================

/**
 * Initialize a new conversation
 * 
 * @param {Object} callbacks - Optional callbacks for lifecycle events
 * @returns {Object} Success indicator with conversation metadata
 */
export function startConversation(callbacks = {}) {
  devLog('Starting new conversation');
  
  // Initialize messages with system prompt
  messages = [createMessage('system', SYSTEM_PROMPT)];
  isProcessing = false;
  conversationStartTime = Date.now();
  
  devLog('Conversation initialized', {
    messageCount: messages.length,
    systemPrompt: SYSTEM_PROMPT
  });
  
  return {
    success: true,
    conversationId: conversationStartTime,
    timestamp: new Date().toISOString()
  };
}

/**
 * Handle user speech input and execute full pipeline
 * 
 * @param {Blob} audioBlob - Recorded audio from user
 * @param {Object} callbacks - Pipeline callbacks
 * @param {Function} callbacks.onStageChange - Called on each stage transition
 * @param {Function} callbacks.onError - Called on pipeline errors
 * @param {Function} callbacks.onComplete - Called on successful completion
 * @returns {Promise<Object>} Pipeline result
 */
export async function handleUserSpeech(audioBlob, callbacks = {}) {
  const { onStageChange, onError, onComplete } = callbacks;
  const pipelineStartTime = Date.now();
  
  devLog('handleUserSpeech called', {
    audioBlobSize: audioBlob?.size,
    isProcessing
  });
  
  // ============================================================================
  // VALIDATION
  // ============================================================================
  
  // Check for concurrent processing
  if (isProcessing) {
    const error = new Error('Pipeline already processing. Please wait.');
    devLog('Concurrent call rejected', { isProcessing });
    
    if (onError) {
      onError({
        stage: 'validation',
        error,
        userMessage: 'Please wait for the current response to complete.'
      });
    }
    
    throw error;
  }
  
  // Validate audio blob size
  if (!audioBlob || audioBlob.size < MIN_AUDIO_SIZE_BYTES) {
    const error = new Error('Audio too short or empty');
    devLog('Audio validation failed', { 
      size: audioBlob?.size, 
      minSize: MIN_AUDIO_SIZE_BYTES 
    });
    
    if (onError) {
      onError({
        stage: 'validation',
        error,
        userMessage: 'Recording too short. Please try speaking again.'
      });
    }
    
    return { success: false, error: 'Audio too short' };
  }
  
  // Set processing flag
  isProcessing = true;
  
  let userText = '';
  let assistantText = '';
  let audioResponseBlob = null;
  
  try {
    // ==========================================================================
    // STAGE 1: TRANSCRIPTION
    // ==========================================================================
    
    const sttStartTime = Date.now();
    devLog('Stage 1: Starting transcription');
    
    if (onStageChange) {
      onStageChange(PIPELINE_STAGES.TRANSCRIBING, null);
    }
    
    try {
      userText = await transcribeAudio(audioBlob);
      const sttDuration = getElapsedTime(sttStartTime);
      
      devLog('Transcription complete', { 
        text: userText, 
        duration: `${sttDuration}ms` 
      });
      
      // Add user message to conversation history
      const userMessage = createMessage('user', userText);
      if (!validateMessage(userMessage)) {
        throw new Error('Invalid user message format');
      }
      
      messages.push(userMessage);
      devLog('User message added to history', { 
        messageCount: messages.length,
        userText 
      });
      
    } catch (error) {
      devLog('Transcription error', { error: error.message });
      
      if (onError) {
        onError({
          stage: 'stt',
          error,
          userMessage: error.userMessage || 'Failed to transcribe audio. Please try again.'
        });
      }
      
      throw error;
    }
    
    // ==========================================================================
    // STAGE 2: LLM GENERATION
    // ==========================================================================
    
    const llmStartTime = Date.now();
    devLog('Stage 2: Starting LLM generation', { 
      messageCount: messages.length,
      userText 
    });
    
    if (onStageChange) {
      onStageChange(PIPELINE_STAGES.THINKING, { userText });
    }
    
    try {
      assistantText = await generateLLMResponse(messages);
      const llmDuration = getElapsedTime(llmStartTime);
      
      devLog('LLM generation complete', { 
        text: assistantText, 
        duration: `${llmDuration}ms` 
      });
      
      // Add assistant message to conversation history
      const assistantMessage = createMessage('assistant', assistantText);
      if (!validateMessage(assistantMessage)) {
        throw new Error('Invalid assistant message format');
      }
      
      messages.push(assistantMessage);
      devLog('Assistant message added to history', { 
        messageCount: messages.length,
        assistantText 
      });
      
      // Trim history if needed
      trimHistory();
      
    } catch (error) {
      devLog('LLM generation error', { error: error.message });
      
      if (onError) {
        onError({
          stage: 'llm',
          error,
          userMessage: error.userMessage || 'Failed to generate response. Please try again.'
        });
      }
      
      throw error;
    }
    
    // ==========================================================================
    // STAGE 3: SPEECH SYNTHESIS
    // ==========================================================================
    
    const ttsStartTime = Date.now();
    devLog('Stage 3: Starting speech synthesis', { assistantText });
    
    if (onStageChange) {
      onStageChange(PIPELINE_STAGES.SYNTHESIZING, { assistantText });
    }
    
    try {
      audioResponseBlob = await synthesizeSpeech(assistantText);
      const ttsDuration = getElapsedTime(ttsStartTime);
      
      devLog('Speech synthesis complete', { 
        audioBlobSize: audioResponseBlob.size,
        duration: `${ttsDuration}ms` 
      });
      
    } catch (error) {
      devLog('Speech synthesis error', { error: error.message });
      
      if (onError) {
        onError({
          stage: 'tts',
          error,
          userMessage: error.userMessage || 'Failed to synthesize speech. Please try again.'
        });
      }
      
      throw error;
    }
    
    // ==========================================================================
    // STAGE 4: PLAYBACK
    // ==========================================================================
    
    const playbackStartTime = Date.now();
    devLog('Stage 4: Starting playback', { 
      audioBlobSize: audioResponseBlob.size 
    });
    
    if (onStageChange) {
      onStageChange(PIPELINE_STAGES.SPEAKING, { audioBlob: audioResponseBlob });
    }
    
    try {
      await playAudio(audioResponseBlob);
      const playbackDuration = getElapsedTime(playbackStartTime);
      
      devLog('Playback complete', { duration: `${playbackDuration}ms` });
      
    } catch (error) {
      devLog('Playback error', { error: error.message });
      
      if (onError) {
        onError({
          stage: 'playback',
          error,
          userMessage: error.userMessage || 'Failed to play audio. Please try again.'
        });
      }
      
      throw error;
    }
    
    // ==========================================================================
    // PIPELINE COMPLETE
    // ==========================================================================
    
    const totalDuration = getElapsedTime(pipelineStartTime);
    devLog('Pipeline complete', {
      totalDuration: `${totalDuration}ms`,
      userText,
      assistantText,
      messageCount: messages.length
    });
    
    if (onComplete) {
      onComplete({
        userText,
        assistantText,
        messages: getConversationHistory(),
        duration: totalDuration
      });
    }
    
    return {
      success: true,
      userText,
      assistantText,
      duration: totalDuration
    };
    
  } catch (error) {
    // Error already handled in individual stages
    devLog('Pipeline failed', { 
      error: error.message,
      duration: `${getElapsedTime(pipelineStartTime)}ms`
    });
    
    return {
      success: false,
      error: error.message,
      userText,
      assistantText
    };
    
  } finally {
    // Always reset processing flag
    isProcessing = false;
    devLog('Processing flag reset', { isProcessing });
  }
}

/**
 * Get conversation history (excluding system prompt)
 * 
 * @returns {Array<Object>} Array of message objects with role, content, timestamp
 */
export function getConversationHistory() {
  // Return copy of messages array, excluding system prompt
  const history = messages.slice(1).map(msg => ({
    role: msg.role,
    content: msg.content,
    timestamp: msg.timestamp
  }));
  
  devLog('Getting conversation history', { messageCount: history.length });
  
  return history;
}

/**
 * Reset conversation to initial state
 */
export function resetConversation() {
  devLog('Resetting conversation', { 
    previousMessageCount: messages.length 
  });
  
  // Stop any active playback
  cleanup();
  
  // Clear messages except system prompt
  messages = [createMessage('system', SYSTEM_PROMPT)];
  isProcessing = false;
  conversationStartTime = Date.now();
  
  devLog('Conversation reset complete', {
    messageCount: messages.length,
    isProcessing
  });
}

/**
 * Check if pipeline is currently processing
 * 
 * @returns {boolean} True if processing, false otherwise
 */
export function isCurrentlyProcessing() {
  return isProcessing;
}

// ============================================================================
// EXPORTS
// ============================================================================

export default {
  startConversation,
  handleUserSpeech,
  getConversationHistory,
  resetConversation,
  isCurrentlyProcessing,
  PIPELINE_STAGES
};
