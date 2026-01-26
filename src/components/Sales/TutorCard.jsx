import { Box } from '@mui/material';
import { iosButtonStyle } from '../shared/sharedStyles';

/**
 * TutorCard Component
 * Individual tutor profile card for the carousel
 */
const TutorCard = ({
  name,
  experience,
  avatarEmoji,
  avatarUrl,
  countryFlag,
  isOnline = true,
  gradientColors = ['#FFA500', '#FFD700']
}) => {
  const [bgColor1, bgColor2] = gradientColors;

  return (
    <Box
      sx={{
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 1,
        ...iosButtonStyle,
      }}
    >
      {/* Avatar Container */}
      <Box
        sx={{
          position: 'relative',
          width: 80,
          height: 80,
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${bgColor1}, ${bgColor2})`,
          border: '3px solid white',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 40,
          overflow: 'hidden',
        }}
      >
        {/* Avatar Image or Emoji */}
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        ) : (
          avatarEmoji
        )}

        {/* Country Flag - Top Right */}
        <Box
          sx={{
            position: 'absolute',
            top: -4,
            right: -4,
            fontSize: 24,
            backgroundColor: 'white',
            borderRadius: '50%',
            width: 32,
            height: 32,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          {countryFlag}
        </Box>

        {/* Online Status Indicator - Bottom Right */}
        {isOnline && (
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              width: 16,
              height: 16,
              backgroundColor: '#10B981',
              borderRadius: '50%',
              border: '2px solid white',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
            }}
          />
        )}
      </Box>

      {/* Tutor Info */}
      <Box sx={{ textAlign: 'center' }}>
        <Box
          sx={{
            fontSize: 14,
            fontWeight: 600,
            color: '#1F2937',
            lineHeight: 1.2,
          }}
        >
          {name}
        </Box>
        <Box
          sx={{
            fontSize: 12,
            color: '#6B7280',
            lineHeight: 1.2,
            marginTop: 0.25,
          }}
        >
          {experience}
        </Box>
      </Box>
    </Box>
  );
};

export default TutorCard;
