import { useState } from 'react';
import { Box, Button } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import useCountdown from '../hooks/useCountdown';
import TutorCard from '../components/Sales/TutorCard';
import TestimonialSlider from '../components/Sales/TestimonialSlider';
import PricingCard from '../components/Sales/PricingCard';
import { useNavigation } from '../hooks/useNavigation.js';
import { iosButtonStyle, scrollbarHide } from '../components/shared/sharedStyles';

/**
 * VIPAccessOfferScreen
 * Comprehensive sales page for VIP 1-on-1 tutoring offer
 * Uses useNavigation hook for navigation - no props required
 */
const VIPAccessOfferScreen = () => {
  // Get navigation functions from context
  const { showDashboard } = useNavigation();

  const { formattedTime } = useCountdown(299);
  const [selectedPlan, setSelectedPlan] = useState('intensive');

  // Tutor data
  const tutors = [
    {
      name: 'Carlos',
      experience: '5+ years',
      avatarEmoji: '👨‍🏫',
      countryFlag: '🇨🇴',
      gradientColors: ['#FFA500', '#FFD700'],
      isOnline: true,
    },
    {
      name: 'Maria',
      experience: '8+ years',
      avatarEmoji: '👩‍🏫',
      countryFlag: '🇨🇴',
      gradientColors: ['#EC4899', '#F472B6'],
      isOnline: true,
    },
    {
      name: 'Diego',
      experience: '6+ years',
      avatarEmoji: '👨‍🏫',
      countryFlag: '🇨🇴',
      gradientColors: ['#3B82F6', '#60A5FA'],
      isOnline: true,
    },
    {
      name: 'Sofia',
      experience: '7+ years',
      avatarEmoji: '👩‍🏫',
      countryFlag: '🇨🇴',
      gradientColors: ['#A855F7', '#D946EF'],
      isOnline: true,
    },
    {
      name: 'Miguel',
      experience: '4+ years',
      avatarEmoji: '👨‍🏫',
      countryFlag: '🇨🇴',
      gradientColors: ['#10B981', '#34D399'],
      isOnline: true,
    },
    {
      name: 'Ana',
      experience: '9+ years',
      avatarEmoji: '👩‍🏫',
      countryFlag: '🇨🇴',
      gradientColors: ['#EF4444', '#F87171'],
      isOnline: true,
    },
  ];

  // Testimonials data
  const testimonials = [
    {
      text: "The tutors finally helped me understand 'Ser' vs 'Estar'! I was so confused before, but now it clicks.",
      author: 'Jessica M.',
      achievement: 'Reached A2 in 3 months',
      avatarColor: '#FFA500',
    },
    {
      text: 'One-on-one sessions transformed my confidence in speaking Spanish. I went from nervous to fluent!',
      author: 'Michael R.',
      achievement: 'Completed B1 Level',
      avatarColor: '#3B82F6',
    },
    {
      text: 'The personalized correction plan was exactly what I needed. My accent improved dramatically.',
      author: 'Sarah L.',
      achievement: 'Native-like pronunciation',
      avatarColor: '#EC4899',
    },
  ];

  const handleSelectPlan = (planId) => {
    setSelectedPlan(planId);
  };

  const handleStartTrial = () => {
    console.log('Starting trial with plan:', selectedPlan);
    showDashboard();
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        backgroundColor: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Close Button */}
      <Button
        onClick={showDashboard}
        sx={{
          position: 'fixed',
          top: 16,
          left: 20,
          zIndex: 20,
          minWidth: 40,
          minHeight: 40,
          width: 40,
          height: 40,
          borderRadius: '50%',
          backgroundColor: 'white',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          ...iosButtonStyle,
        }}
      >
        <CloseIcon sx={{ fontSize: 20, color: '#1F2937' }} />
      </Button>

      {/* Scrollable Content */}
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          pb: 32,
        }}
      >
        {/* Top Urgency Bar */}
        <Box
          sx={{
            background: 'linear-gradient(90deg, #14B8A6 0%, #0369A1 100%)',
            color: 'white',
            padding: '12px 20px',
            textAlign: 'center',
            fontSize: 14,
            fontWeight: 600,
            position: 'sticky',
            top: 0,
            zIndex: 10,
          }}
        >
          ⏰ Limited Time Offer: {formattedTime} remaining
        </Box>

        {/* Tutor Carousel Section */}
        <Box
          sx={{
            background: 'linear-gradient(135deg, #DBEAFE 0%, #E0F2FE 100%)',
            padding: '24px 20px',
          }}
        >
          <Box sx={{ marginBottom: 2 }}>
            <Box
              sx={{
                fontSize: 18,
                fontWeight: 700,
                color: '#1F2937',
                marginBottom: 1,
              }}
            >
              Meet Your Tutors
            </Box>
            <Box
              sx={{
                fontSize: 13,
                color: '#6B7280',
              }}
            >
              Native Colombian teachers ready to help
            </Box>
          </Box>

          {/* Carousel Container */}
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              overflowX: 'auto',
              pb: 1,
              ...scrollbarHide,
            }}
          >
            {tutors.map((tutor, index) => (
              <TutorCard key={index} {...tutor} />
            ))}
          </Box>
        </Box>

        {/* Hero Section */}
        <Box
          sx={{
            background: 'linear-gradient(135deg, #F3E8FF 0%, #FCE7F3 100%)',
            padding: '32px 20px',
            textAlign: 'center',
          }}
        >
          <Box sx={{ fontSize: 64, marginBottom: 2 }}>👨‍🏫</Box>

          {/* Trustpilot Badge */}
          <Box
            sx={{
              display: 'inline-block',
              backgroundColor: 'white',
              padding: '8px 12px',
              borderRadius: 2,
              marginBottom: 3,
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
            }}
          >
            <Box sx={{ fontSize: 12, fontWeight: 600, color: '#1F2937' }}>
              ⭐ 4.9/5 on Trustpilot
            </Box>
          </Box>

          <Box
            sx={{
              fontSize: 28,
              fontWeight: 700,
              color: '#1F2937',
              marginBottom: 1,
              lineHeight: 1.3,
            }}
          >
            Unlock 1-on-1 Tutoring
          </Box>
          <Box
            sx={{
              fontSize: 14,
              color: '#6B7280',
              lineHeight: 1.6,
            }}
          >
            Get personalized lessons from native Colombian teachers
          </Box>
        </Box>

        {/* Value Stack Card */}
        <Box
          sx={{
            margin: '24px 20px',
            backgroundColor: 'white',
            border: '1px solid #E5E7EB',
            borderRadius: 2,
            padding: 3,
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
          }}
        >
          <Box sx={{ marginBottom: 2 }}>
            <Box
              sx={{
                fontSize: 16,
                fontWeight: 700,
                color: '#1F2937',
                marginBottom: 2,
              }}
            >
              What You Get
            </Box>

            {[
              'Unlimited Group Classes',
              'Personalized Correction Plan',
              'Native Colombian Teachers',
              'Certificate of Fluency',
            ].map((item, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  marginBottom: index < 3 ? 1.5 : 0,
                  fontSize: 14,
                  color: '#1F2937',
                }}
              >
                <Box sx={{ fontSize: 18 }}>✓</Box>
                {item}
              </Box>
            ))}
          </Box>
        </Box>

        {/* Testimonial Section */}
        <Box sx={{ margin: '24px 20px' }}>
          <Box
            sx={{
              fontSize: 16,
              fontWeight: 700,
              color: '#1F2937',
              marginBottom: 2,
            }}
          >
            What Students Say
          </Box>
          <TestimonialSlider testimonials={testimonials} />
        </Box>

        {/* Pricing Cards */}
        <Box sx={{ margin: '24px 20px' }}>
          <Box
            sx={{
              fontSize: 16,
              fontWeight: 700,
              color: '#1F2937',
              marginBottom: 2,
            }}
          >
            Choose Your Plan
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <PricingCard
              planName="Flexible"
              price="249"
              billingCycle="/month"
              description="Perfect for casual learners"
              isSelected={selectedPlan === 'flexible'}
              onSelect={() => handleSelectPlan('flexible')}
            />

            <PricingCard
              planName="Intensive"
              price="199"
              originalPrice="249"
              billingCycle="/month"
              description="Best for serious learners"
              isSelected={selectedPlan === 'intensive'}
              isBestValue={true}
              onSelect={() => handleSelectPlan('intensive')}
            />
          </Box>
        </Box>
      </Box>

      {/* Sticky Footer */}
      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'white',
          borderTop: '1px solid #E5E7EB',
          boxShadow: '0 -4px 12px rgba(0, 0, 0, 0.08)',
          padding: '16px 20px 20px',
          zIndex: 15,
        }}
      >
        {/* Free Trial Badge */}
        <Box
          sx={{
            display: 'inline-block',
            backgroundColor: '#DCFCE7',
            color: '#166534',
            padding: '6px 12px',
            borderRadius: 20,
            fontSize: 11,
            fontWeight: 700,
            marginBottom: 2,
            width: '100%',
            textAlign: 'center',
          }}
        >
          FREE 7-DAY TRIAL
        </Box>

        {/* CTA Button */}
        <Button
          onClick={handleStartTrial}
          fullWidth
          sx={{
            background: 'linear-gradient(90deg, #14B8A6 0%, #0D9488 100%)',
            color: 'white',
            padding: '14px 20px',
            borderRadius: 2,
            fontSize: 16,
            fontWeight: 700,
            marginBottom: 1.5,
            textTransform: 'none',
            ...iosButtonStyle,
          }}
        >
          Start My Transformation
        </Button>

        {/* Disclaimer */}
        <Box
          sx={{
            fontSize: 11,
            color: '#6B7280',
            textAlign: 'center',
            lineHeight: 1.4,
          }}
        >
          Then ${selectedPlan === 'intensive' ? '199' : '249'}/month. Cancel anytime in settings.
        </Box>
      </Box>
    </Box>
  );
};

export default VIPAccessOfferScreen;
