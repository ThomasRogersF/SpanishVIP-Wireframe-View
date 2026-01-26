import { useState, useEffect } from 'react';
import { Box, Fade } from '@mui/material';
import { keyframes } from '@mui/system';

/**
 * slideTestimonial keyframe animation
 * Slides content from right (16px offset) to final position with easing
 */
const slideTestimonial = keyframes`
  from {
    transform: translateX(16px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

/**
 * TestimonialSlider Component
 * Auto-rotating testimonial display with slide and fade transitions
 */
const TestimonialSlider = ({ testimonials = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-rotate testimonials every 5 seconds
  useEffect(() => {
    if (testimonials.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  if (testimonials.length === 0) {
    return null;
  }

  const current = testimonials[currentIndex];

  return (
    <Fade key={currentIndex} in={true} timeout={500}>
      <Box
        sx={{
          background: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)',
          borderRadius: 3,
          padding: 3,
          border: '1px solid #BFDBFE',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
          animation: `${slideTestimonial} 0.5s ease-out`,
        }}
      >
        {/* Star Rating */}
        <Box sx={{ marginBottom: 2, fontSize: 20, letterSpacing: 2 }}>
          ⭐⭐⭐⭐⭐
        </Box>

        {/* Testimonial Text */}
        <Box
          sx={{
            position: 'relative',
            marginBottom: 3,
          }}
        >
          {/* Quote Icon Background */}
          <Box
            sx={{
              position: 'absolute',
              top: -16,
              left: -8,
              fontSize: 64,
              opacity: 0.1,
              color: '#0369A1',
              lineHeight: 1,
            }}
          >
            "
          </Box>

          <Box
            sx={{
              fontSize: 16,
              fontStyle: 'italic',
              color: '#1F2937',
              lineHeight: 1.6,
              position: 'relative',
              zIndex: 1,
            }}
          >
            {current.text}
          </Box>
        </Box>

        {/* Author Info */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}
        >
          {/* Avatar */}
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${current.avatarColor || '#FFA500'}, ${current.avatarColor || '#FFD700'})`,
              border: '2px solid white',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              flexShrink: 0,
            }}
          />

          {/* Author Details */}
          <Box>
            <Box
              sx={{
                fontSize: 14,
                fontWeight: 600,
                color: '#1F2937',
              }}
            >
              {current.author}
            </Box>
            <Box
              sx={{
                fontSize: 12,
                color: '#6B7280',
                marginTop: 0.25,
              }}
            >
              {current.achievement}
            </Box>
          </Box>
        </Box>
      </Box>
    </Fade>
  );
};

export default TestimonialSlider;
