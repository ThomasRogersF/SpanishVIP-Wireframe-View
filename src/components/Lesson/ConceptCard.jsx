import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

/**
 * ConceptCard - Displays a grammar concept with icon, headline, and explanation text
 * 
 * @param {Object} props
 * @param {string} props.headline - Main concept title
 * @param {string} props.text - Concept explanation
 * @param {string} props.icon - Emoji or icon character
 */
const ConceptCard = ({ headline, text, icon }) => {
  return (
    <Box
      sx={{
        bgcolor: '#F0FDFA',
        borderRadius: '16px',
        p: 3,
        maxWidth: '400px',
        width: '100%',
        maxHeight: '100%',
        overflowY: 'auto',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
      }}
    >
      {/* Icon container */}
      <Box
        sx={{
          width: '90px',
          height: '90px',
          borderRadius: '50%',
          bgcolor: '#CCFBF1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mx: 'auto',
          fontSize: '48px',
        }}
      >
        <Typography component="span" sx={{ fontSize: '48px', lineHeight: 1 }}>
          {icon}
        </Typography>
      </Box>

      {/* Headline */}
      <Typography
        sx={{
          fontFamily: 'Lexend',
          fontSize: { xs: '22px', sm: '24px' },
          fontWeight: 700,
          color: '#1F2937',
        }}
      >
        {headline}
      </Typography>

      {/* Body text */}
      <Typography
        sx={{
          fontSize: { xs: '15px', sm: '16px' },
          lineHeight: 1.5,
          color: '#6B7280',
        }}
      >
        {text}
      </Typography>
    </Box>
  )
}

export default ConceptCard
