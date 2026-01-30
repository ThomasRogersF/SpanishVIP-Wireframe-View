import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { keyframes } from '@mui/material/styles'
import { useNavigation } from '../hooks/useNavigation.js'
import useSDKConfig from '../hooks/useSDKConfig.js'

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`

const glow = keyframes`
  0% { box-shadow: 0 0 5px rgba(255, 255, 255, 0.1); }
  50% { box-shadow: 0 0 20px rgba(255, 255, 255, 0.3); }
  100% { box-shadow: 0 0 5px rgba(255, 255, 255, 0.1); }
`

/**
 * LevelSelectionScreen
 * Allows users to switch their curriculum level.
 * Features a carousel-style selection with animations.
 */
function LevelSelectionScreen() {
    const { level, setLevel, showDashboard } = useNavigation()
    const config = useSDKConfig()

    // Levels configuration
    const levels = [
        {
            id: 'A0',
            name: 'Explorador',
            subtitle: 'Complete Beginner',
            color: '#FACC15', // Yellow
            gradient: 'linear-gradient(135deg, #FACC15 0%, #CA8A04 100%)',
            description: 'Start your journey from scratch used to Spanish sounds and basic phrases.',
            available: true
        },
        {
            id: 'A1',
            name: 'Aventurero',
            subtitle: 'Beginner',
            color: '#0AA6A6', // Teal
            gradient: 'linear-gradient(135deg, #0AA6A6 0%, #0F766E 100%)',
            description: 'Build your foundation with essential vocabulary and simple sentences.',
            available: true
        },
        {
            id: 'A2',
            name: 'Navegante',
            subtitle: 'Elementary',
            color: '#3B82F6', // Blue
            gradient: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
            description: 'Navigate daily situations and express opinions with more confidence.',
            available: true
        },
        {
            id: 'B1',
            name: 'Conquistador',
            subtitle: 'Intermediate',
            color: '#8B5CF6', // Purple
            gradient: 'linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)',
            description: 'Conquer complex topics and engage in deeper conversations.',
            available: true
        },
        {
            id: 'B2',
            name: 'Maestro',
            subtitle: 'Upper Intermediate',
            color: '#EF4444', // Red
            gradient: 'linear-gradient(135deg, #EF4444 0%, #B91C1C 100%)',
            description: 'Master the language with fluency and sophisticated expression.',
            available: true
        }
    ]

    const handleSelect = (selectedLevelId) => {
        setLevel(selectedLevelId)
        // Optional: Add a delay or success animation before going back
        setTimeout(() => {
            showDashboard()
        }, 300)
    }

    return (
        <Box
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: '#111827', // Dark background for "cool" feel
                color: '#FFFFFF',
                overflow: 'hidden',
                position: 'relative'
            }}
        >
            {/* Background decoration */}
            <Box
                sx={{
                    position: 'absolute',
                    top: '-20%',
                    right: '-20%',
                    width: '60%',
                    height: '60%',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, rgba(0,0,0,0) 70%)',
                    zIndex: 0,
                    pointerEvents: 'none'
                }}
            />

            {/* Header */}
            <Box sx={{ p: 3, pt: 6, zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box
                    onClick={() => showDashboard()}
                    sx={{
                        cursor: 'pointer',
                        p: 1,
                        borderRadius: '50%',
                        '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
                    }}
                >
                    <ArrowBackIcon />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 700, fontFamily: "'Lexend', sans-serif" }}>
                    Select Level
                </Typography>
                <Box sx={{ width: 40 }} /> {/* Spacer */}
            </Box>

            {/* Main Content */}
            <Box
                sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    pb: 4,
                    zIndex: 1,
                    animation: `${fadeIn} 0.5s ease-out`
                }}
            >
                <Typography
                    variant="h4"
                    align="center"
                    sx={{
                        mb: 1,
                        fontWeight: 800,
                        fontFamily: "'Lexend', sans-serif",
                        background: 'linear-gradient(90deg, #FFFFFF 0%, #9CA3AF 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}
                >
                    Bienvenido
                </Typography>
                <Typography
                    variant="body1"
                    align="center"
                    sx={{ mb: 6, color: '#9CA3AF' }}
                >
                    Choose your path to mastery
                </Typography>

                {/* Carousel Container */}
                <Box
                    sx={{
                        display: 'flex',
                        overflowX: 'auto',
                        scrollSnapType: 'x mandatory',
                        gap: 3,
                        px: 4,
                        pb: 4,
                        '&::-webkit-scrollbar': { display: 'none' }, // Hide scrollbar
                        scrollbarWidth: 'none'
                    }}
                >
                    {levels.map((lvl, index) => {
                        const isSelected = level === lvl.id

                        return (
                            <Box
                                key={lvl.id}
                                onClick={() => handleSelect(lvl.id)}
                                sx={{
                                    flex: '0 0 80%', // Takes up 80% of width
                                    maxWidth: '320px',
                                    scrollSnapAlign: 'center',
                                    background: isSelected ? lvl.gradient : 'rgba(255, 255, 255, 0.05)',
                                    border: isSelected ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
                                    borderRadius: '24px',
                                    p: 3,
                                    cursor: 'pointer',
                                    position: 'relative',
                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                    transform: isSelected ? 'scale(1.05)' : 'scale(1)',
                                    opacity: isSelected ? 1 : 0.7,
                                    boxShadow: isSelected ? `0 10px 30px -10px ${lvl.color}66` : 'none',
                                    animation: `${fadeIn} 0.5s ease-out ${index * 0.1}s backwards`,
                                    '&:hover': {
                                        transform: isSelected ? 'scale(1.05)' : 'scale(1.02)',
                                        opacity: 1
                                    }
                                }}
                            >
                                {/* Level Badge */}
                                <Box
                                    sx={{
                                        display: 'inline-block',
                                        px: 1.5,
                                        py: 0.5,
                                        borderRadius: '8px',
                                        backgroundColor: 'rgba(0,0,0,0.2)',
                                        backdropFilter: 'blur(4px)',
                                        mb: 2
                                    }}
                                >
                                    <Typography variant="caption" sx={{ fontWeight: 700, letterSpacing: '0.5px' }}>
                                        LEVEL {lvl.id}
                                    </Typography>
                                </Box>

                                {/* Title */}
                                <Typography
                                    variant="h4"
                                    sx={{
                                        fontWeight: 800,
                                        mb: 0.5,
                                        fontFamily: "'Lexend', sans-serif"
                                    }}
                                >
                                    {lvl.name}
                                </Typography>

                                {/* Subtitle */}
                                <Typography
                                    variant="subtitle1"
                                    sx={{
                                        mb: 3,
                                        opacity: 0.9,
                                        fontWeight: 500
                                    }}
                                >
                                    {lvl.subtitle}
                                </Typography>

                                {/* Description */}
                                <Typography
                                    variant="body2"
                                    sx={{
                                        mb: 3,
                                        opacity: 0.8,
                                        lineHeight: 1.6
                                    }}
                                >
                                    {lvl.description}
                                </Typography>

                                {/* Status Indicator */}
                                <Box sx={{ mt: 'auto', display: 'flex', alignItems: 'center', gap: 1 }}>
                                    {isSelected ? (
                                        <>
                                            <CheckCircleIcon sx={{ fontSize: 20 }} />
                                            <Typography variant="caption" sx={{ fontWeight: 600 }}>Active Logic</Typography>
                                        </>
                                    ) : (
                                        <Typography variant="caption" sx={{ opacity: 0.6 }}>Tap to select</Typography>
                                    )}
                                </Box>

                                {/* Visual Flair */}
                                {isSelected && (
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            bottom: -20,
                                            right: -20,
                                            width: 100,
                                            height: 100,
                                            borderRadius: '50%',
                                            background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(0,0,0,0) 70%)',
                                            pointerEvents: 'none'
                                        }}
                                    />
                                )}
                            </Box>
                        )
                    })}
                </Box>
            </Box>
        </Box>
    )
}

export default LevelSelectionScreen
