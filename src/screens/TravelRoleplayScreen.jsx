import React, { useState, useRef, useEffect } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MicrophoneButton from '../components/Lesson/MicrophoneButton';
import { useRecording } from '../hooks/useRecording';
import { useNavigation } from '../hooks/useNavigation.js';
import travelLessonData from '../data/travelLessonData.js';

/**
 * TravelRoleplayScreen - Airport check-in roleplay with AI agent
 * Activity 10 of 12 in Travel Lesson flow
 * Features chat interface with message bubbles, voice input, and grammar corrections
 * 
 * Uses useNavigation hook for navigation - no props required
 */
const TravelRoleplayScreen = () => {
  // Get navigation functions from context
  const { showTravelSuccess, showTravelAudioDiscrimination } = useNavigation();

  // Get roleplay data from travelLessonData
  const { roleplay } = travelLessonData;
  const {
    activityNumber,
    totalActivities,
    scenario,
    starterMessage,
    exampleConversation,
    feedback
  } = roleplay;

  // Recording state
  const { isRecording, startRecording, stopRecording } = useRecording();

  // Chat state
  const [messages, setMessages] = useState([]);
  const [transcribedText, setTranscribedText] = useState('');
  const [roleplayComplete, setRoleplayComplete] = useState(false);
  const [turnCount, setTurnCount] = useState(0);

  // Ref for auto-scrolling chat
  const chatEndRef = useRef(null);

  // Mock AI responses for the roleplay
  const mockAgentResponses = [
    {
      spanish: 'Perfecto, gracias por su pasaporte. Veo que su vuelo (flight) sale a las 14:30. ¿Tiene equipaje (luggage) para facturar?',
      english: 'Perfect, thank you for your passport. I see your flight leaves at 14:30. Do you have luggage to check?',
      correction: null
    },
    {
      spanish: 'Muy bien. Su asiento es el 24A, ventana. La puerta de embarque (boarding gate) es la B12. ¡Buen viaje!',
      english: 'Very well. Your seat is 24A, window. The boarding gate is B12. Have a good trip!',
      correction: null
    }
  ];

  // Mock user responses with potential grammar corrections
  const mockUserResponses = [
    {
      text: 'Hola, yo viajaba a Madrid. Aquí está mi pasaporte.',
      correction: '(pequeña corrección: "viajo" en presente, o "voy a viajar" - you\'re traveling now, not describing a past habit!)'
    },
    {
      text: 'Sí, tengo una maleta para facturar.',
      correction: null
    }
  ];

  // Initialize with starter message
  useEffect(() => {
    setMessages([
      {
        id: 1,
        role: 'agent',
        text: starterMessage.spanish,
        translation: starterMessage.english,
        correction: null
      }
    ]);
  }, [starterMessage]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle microphone start
  const handleMicStart = () => {
    startRecording();
    setTranscribedText('');
  };

  // Handle microphone end - simulate transcription and AI response
  const handleMicEnd = () => {
    stopRecording();
    
    // Simulate voice transcription delay
    setTimeout(() => {
      const userResponseIndex = Math.min(turnCount, mockUserResponses.length - 1);
      const userResponse = mockUserResponses[userResponseIndex];
      
      // Set transcribed text for display
      setTranscribedText(userResponse.text);
      
      // Add user message to chat
      const newUserMessage = {
        id: messages.length + 1,
        role: 'user',
        text: userResponse.text,
        translation: null,
        correction: userResponse.correction
      };
      
      setMessages(prev => [...prev, newUserMessage]);
      
      // Simulate AI response delay
      setTimeout(() => {
        if (turnCount < mockAgentResponses.length) {
          const agentResponse = mockAgentResponses[turnCount];
          
          const newAgentMessage = {
            id: messages.length + 2,
            role: 'agent',
            text: agentResponse.spanish,
            translation: agentResponse.english,
            correction: null
          };
          
          setMessages(prev => [...prev, newAgentMessage]);
          setTurnCount(prev => prev + 1);
          
          // Check for completion (after 2 exchanges)
          if (turnCount >= 1) {
            setRoleplayComplete(true);
          }
        }
        
        setTranscribedText('');
      }, 1500);
    }, 1000);
  };

  // Handle continue to success screen
  const handleContinue = () => {
    showTravelSuccess();
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      {/* Top Bar */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 20px',
          borderBottom: '1px solid #E5E7EB',
        }}
      >
        <IconButton
          onClick={showTravelAudioDiscrimination}
          sx={{
            color: '#666',
          }}
        >
          <CloseIcon />
        </IconButton>

        <Box
          sx={{
            background: '#0EA5E9',
            color: 'white',
            padding: '6px 12px',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          ✈️ Airport Check-in
        </Box>

        <Typography
          sx={{
            fontSize: '12px',
            color: '#6B7280',
            fontWeight: 500,
          }}
        >
          {activityNumber}/{totalActivities}
        </Typography>
      </Box>

      {/* Progress Bar */}
      <Box sx={{ px: 2.5, pt: 1.5, pb: 0.5, backgroundColor: '#FFFFFF' }}>
        <Box
          sx={{
            height: 6,
            backgroundColor: '#E5E7EB',
            borderRadius: 3,
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              height: '100%',
              width: `${(activityNumber / totalActivities) * 100}%`,
              backgroundColor: '#14B8A6',
              borderRadius: 3,
              transition: 'width 0.3s ease',
            }}
          />
        </Box>
      </Box>

      {/* Agent Avatar Section */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '20px',
          background: 'linear-gradient(180deg, #E0F2FE 0%, #FFFFFF 100%)',
        }}
      >
        <Box
          sx={{
            width: 72,
            height: 72,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #BAE6FD 0%, #7DD3FC 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '48px',
            boxShadow: '0 4px 12px rgba(14, 165, 233, 0.2)',
            marginBottom: '8px',
          }}
        >
          👩‍✈️
        </Box>
        <Typography
          sx={{
            fontSize: '14px',
            fontWeight: 600,
            color: '#0369A1',
          }}
        >
          {scenario.location}
        </Typography>
        <Typography
          sx={{
            fontSize: '12px',
            color: '#64748B',
          }}
        >
          {scenario.description}
        </Typography>
      </Box>

      {/* System Prompt Card (AI Behavior Info) */}
      <Box
        sx={{
          margin: '0 20px 16px',
          padding: '12px 16px',
          background: '#FEF3C7',
          border: '1px solid #FCD34D',
          borderRadius: '12px',
          display: 'flex',
          gap: '8px',
          alignItems: 'flex-start',
        }}
      >
        <Box sx={{ fontSize: '16px', flexShrink: 0 }}>🤖</Box>
        <Box>
          <Typography
            sx={{
              fontSize: '11px',
              fontWeight: 600,
              color: '#92400E',
              marginBottom: '2px',
            }}
          >
            AI Agent Behavior
          </Typography>
          <Typography
            sx={{
              fontSize: '11px',
              color: '#78350F',
              lineHeight: 1.4,
            }}
          >
            The agent will correct Preterite vs Imperfect mistakes gently in parentheses.
          </Typography>
        </Box>
      </Box>

      {/* Chat Messages Container */}
      <Box
        sx={{
          flex: 1,
          overflow: 'auto',
          padding: '0 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        {messages.map((message) => (
          <Box
            key={message.id}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: message.role === 'agent' ? 'flex-start' : 'flex-end',
            }}
          >
            {/* Message Bubble */}
            <Box
              sx={{
                maxWidth: '85%',
                padding: '12px 16px',
                borderRadius: message.role === 'agent' 
                  ? '12px 12px 12px 4px' 
                  : '12px 12px 4px 12px',
                background: message.role === 'agent' ? '#E0F2FE' : '#14B8A6',
                border: message.role === 'agent' ? '1px solid #BAE6FD' : 'none',
              }}
            >
              {/* Agent Label */}
              {message.role === 'agent' && (
                <Typography
                  sx={{
                    fontSize: '11px',
                    fontWeight: 600,
                    color: '#0369A1',
                    marginBottom: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  👩‍✈️ Agent
                </Typography>
              )}
              
              {/* Message Text */}
              <Typography
                sx={{
                  fontSize: '14px',
                  color: message.role === 'agent' ? '#1F2937' : '#FFFFFF',
                  fontWeight: 500,
                  lineHeight: 1.5,
                }}
              >
                {message.text}
              </Typography>
              
              {/* Translation for agent messages */}
              {message.role === 'agent' && message.translation && (
                <Typography
                  sx={{
                    fontSize: '12px',
                    color: '#64748B',
                    fontStyle: 'italic',
                    marginTop: '8px',
                  }}
                >
                  {message.translation}
                </Typography>
              )}
            </Box>
            
            {/* Grammar Correction (below user messages) */}
            {message.correction && (
              <Box
                sx={{
                  maxWidth: '85%',
                  marginTop: '6px',
                  padding: '8px 12px',
                  background: '#FEF3C7',
                  borderRadius: '8px',
                  border: '1px solid #FCD34D',
                }}
              >
                <Typography
                  sx={{
                    fontSize: '12px',
                    color: '#B45309',
                    fontStyle: 'italic',
                    lineHeight: 1.4,
                  }}
                >
                  {message.correction}
                </Typography>
              </Box>
            )}
          </Box>
        ))}
        
        {/* Auto-scroll anchor */}
        <div ref={chatEndRef} />
      </Box>

      {/* Completion Card */}
      {roleplayComplete && (
        <Box
          sx={{
            margin: '16px 20px',
            padding: '16px',
            background: '#F0FDF4',
            border: '2px solid #10B981',
            borderRadius: '12px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.15)',
          }}
        >
          <Box sx={{ fontSize: '32px', marginBottom: '8px' }}>✅</Box>
          <Typography
            sx={{
              fontSize: '16px',
              fontWeight: 600,
              color: '#059669',
              marginBottom: '4px',
            }}
          >
            {feedback.complete}
          </Typography>
          <Typography
            sx={{
              fontSize: '13px',
              color: '#6B7280',
            }}
          >
            {feedback.encouragement}
          </Typography>
        </Box>
      )}

      {/* Bottom Section - Microphone or Continue Button */}
      <Box
        sx={{
          padding: '20px',
          borderTop: '1px solid #E5E7EB',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px',
          background: '#FFFFFF',
        }}
      >
        {!roleplayComplete ? (
          <>
            {/* Transcribed Text Display */}
            {transcribedText && (
              <Box
                sx={{
                  width: '100%',
                  padding: '12px 16px',
                  background: '#F3F4F6',
                  borderRadius: '12px',
                  marginBottom: '8px',
                }}
              >
                <Typography
                  sx={{
                    fontSize: '12px',
                    color: '#6B7280',
                    marginBottom: '4px',
                  }}
                >
                  You said:
                </Typography>
                <Typography
                  sx={{
                    fontSize: '14px',
                    color: '#1F2937',
                    fontWeight: 500,
                  }}
                >
                  {transcribedText}
                </Typography>
              </Box>
            )}
            
            <MicrophoneButton
              isRecording={isRecording}
              onPressStart={handleMicStart}
              onPressEnd={handleMicEnd}
            />

            <Typography
              sx={{
                fontSize: '14px',
                color: '#6B7280',
                fontWeight: 500,
              }}
            >
              {isRecording ? 'Recording... Release to send' : 'Hold to speak'}
            </Typography>
          </>
        ) : (
          <button
            onClick={handleContinue}
            style={{
              background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '14px 32px',
              fontSize: '16px',
              fontWeight: 600,
              fontFamily: 'Lexend, sans-serif',
              cursor: 'pointer',
              width: '100%',
              maxWidth: '300px',
              boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 16px rgba(16, 185, 129, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.3)';
            }}
          >
            Complete Lesson 🎉
          </button>
        )}
      </Box>
    </Box>
  );
};

export default TravelRoleplayScreen;
