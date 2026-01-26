import { Box, Button } from '@mui/material';
import { iosButtonStyle } from '../shared/sharedStyles';

/**
 * PricingCard Component
 * Selectable pricing plan card with best value badge
 */
const PricingCard = ({
  planName,
  price,
  originalPrice,
  billingCycle,
  description,
  isSelected = false,
  isBestValue = false,
  onSelect,
}) => {
  return (
    <Button
      onClick={onSelect}
      sx={{
        position: 'relative',
        width: '100%',
        padding: 2.5,
        textTransform: 'none',
        backgroundColor: isSelected ? 'transparent' : 'white',
        border: isSelected ? '4px solid #14B8A6' : '2px solid #D1D5DB',
        borderRadius: 2,
        transition: 'all 0.3s ease',
        ...iosButtonStyle,
        '&:hover': {
          borderColor: isSelected ? '#14B8A6' : '#9CA3AF',
        },
      }}
    >
      {/* Best Value Badge */}
      {isBestValue && (
        <Box
          sx={{
            position: 'absolute',
            top: -12,
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: '#EF4444',
            color: 'white',
            padding: '4px 12px',
            borderRadius: 20,
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: 0.5,
            zIndex: 10,
          }}
        >
          BEST VALUE
        </Box>
      )}

      {/* Card Content */}
      <Box sx={{ width: '100%', textAlign: 'left' }}>
        {/* Plan Name with Radio Button */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            marginBottom: 1.5,
          }}
        >
          {/* Radio Button Indicator */}
          <Box
            sx={{
              width: 20,
              height: 20,
              borderRadius: '50%',
              border: isSelected ? 'none' : '2px solid #D1D5DB',
              backgroundColor: isSelected ? '#14B8A6' : 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            {isSelected && (
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: 'white',
                }}
              />
            )}
          </Box>

          <Box
            sx={{
              fontSize: 16,
              fontWeight: 700,
              color: '#1F2937',
            }}
          >
            {planName}
          </Box>
        </Box>

        {/* Price Section */}
        <Box sx={{ marginBottom: 1.5 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'baseline',
              gap: 1,
              marginBottom: 0.5,
            }}
          >
            <Box
              sx={{
                fontSize: 28,
                fontWeight: 700,
                color: '#1F2937',
              }}
            >
              ${price}
            </Box>
            {originalPrice && (
              <Box
                sx={{
                  fontSize: 14,
                  color: '#9CA3AF',
                  textDecoration: 'line-through',
                }}
              >
                ${originalPrice}
              </Box>
            )}
          </Box>

          {/* Save Badge */}
          {originalPrice && (
            <Box
              sx={{
                display: 'inline-block',
                backgroundColor: '#DBEAFE',
                color: '#0369A1',
                padding: '2px 8px',
                borderRadius: 1,
                fontSize: 11,
                fontWeight: 600,
              }}
            >
              SAVE 20%
            </Box>
          )}
        </Box>

        {/* Billing Cycle */}
        <Box
          sx={{
            fontSize: 13,
            color: '#6B7280',
            marginBottom: 1,
          }}
        >
          {billingCycle}
        </Box>

        {/* Description */}
        <Box
          sx={{
            fontSize: 13,
            color: '#6B7280',
            lineHeight: 1.5,
          }}
        >
          {description}
        </Box>
      </Box>
    </Button>
  );
};

export default PricingCard;
