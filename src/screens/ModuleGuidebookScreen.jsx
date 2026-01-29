import React from 'react';
import { Box, Typography, IconButton, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigation } from '../hooks/useNavigation';
import { 
  TextBlock, 
  VocabListBlock, 
  TableBlock, 
  TipBoxBlock 
} from '../components/Guidebook';
import moduleGuidebooks from '../data/moduleGuidebookData';
import { touchOptimized } from '../components/shared/sharedStyles';

/**
 * ModuleGuidebookScreen - Scrollable reference page for module theory, vocabulary, and grammar
 * 
 * @component
 * @param {Object} props
 * @param {string} [props.guidebookId="guide_b1_u01"] - ID of the guidebook to display
 * @param {Function} [props.onClose] - Optional custom close handler
 * 
 * @example
 * <ModuleGuidebookScreen guidebookId="guide_b1_u01" />
 */
const ModuleGuidebookScreen = ({ 
  guidebookId = "guide_b1_u01", 
  onClose 
}) => {
  const { showDashboard } = useNavigation();
  const guidebookData = moduleGuidebooks[guidebookId];

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      showDashboard();
    }
  };

  const renderContentBlock = (section, index) => {
    switch (section.type) {
      case 'text':
        return (
          <TextBlock 
            key={index}
            heading={section.heading} 
            body={section.body} 
          />
        );
      case 'vocab_list':
        return (
          <VocabListBlock 
            key={index}
            heading={section.heading} 
            items={section.items} 
          />
        );
      case 'table':
        return (
          <TableBlock 
            key={index}
            heading={section.heading} 
            headers={section.headers} 
            rows={section.rows} 
          />
        );
      case 'tip_box':
        return (
          <TipBoxBlock 
            key={index}
            content={section.content} 
          />
        );
      default:
        return null;
    }
  };

  // Error state if guidebook data is missing
  if (!guidebookData) {
    return (
      <Box 
        sx={{ 
          height: '100%', 
          display: 'flex', 
          flexDirection: 'column',
          bgcolor: '#F8FAFC'
        }}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-start' }}>
          <IconButton 
            onClick={handleClose}
            sx={{ ...touchOptimized, color: '#64748B' }}
            aria-label="Close guidebook"
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Box 
          sx={{ 
            flex: 1, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center' 
          }}
        >
          <Typography color="text.secondary">
            Guidebook not found
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box 
      component="main"
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        bgcolor: '#F8FAFC',
        overflow: 'hidden'
      }}
    >
      {/* Header Section */}
      <Box 
        sx={{ 
          bgcolor: '#FFFFFF',
          borderBottom: '1px solid #E5E7EB',
          px: 2,
          py: 1.5,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Box sx={{ display: 'flex', mb: 1 }}>
          <IconButton 
            onClick={handleClose}
            sx={{ 
              ...touchOptimized, 
              color: '#64748B',
              ml: -1 // Align with content
            }}
            aria-label="Close guidebook"
          >
            <CloseIcon />
          </IconButton>
        </Box>
        
        <Typography 
          variant="h1" 
          sx={{ 
            fontFamily: 'Lexend',
            fontSize: { xs: '24px', sm: '28px' },
            fontWeight: 700,
            color: '#1F2937',
            mb: 0.5
          }}
        >
          {guidebookData.title}
        </Typography>
        
        <Typography 
          variant="body1" 
          sx={{ 
            fontSize: { xs: '15px', sm: '16px' },
            lineHeight: 1.6,
            color: '#6B7280'
          }}
        >
          {guidebookData.description}
        </Typography>
      </Box>

      {/* Scrollable Content Area */}
      <Box 
        role="region"
        aria-label="Module guidebook content"
        sx={{ 
          flex: 1,
          overflow: 'auto',
          bgcolor: '#F8FAFC',
          px: 2,
          py: 3,
          WebkitOverflowScrolling: 'touch'
        }}
      >
        {guidebookData.sections && guidebookData.sections.length > 0 ? (
          guidebookData.sections.map((section, index) => {
            const block = renderContentBlock(section, index);
            if (!block) return null;

            const isLast = index === guidebookData.sections.length - 1;

            return (
              <React.Fragment key={index}>
                <Box sx={{ mb: 2.5 }}>
                  {block}
                </Box>
                {!isLast && (
                  <Divider 
                    variant="middle" 
                    sx={{ my: 2.5, borderColor: '#E5E7EB' }} 
                  />
                )}
              </React.Fragment>
            );
          })
        ) : (
          <Box sx={{ py: 4, textAlign: 'center' }}>
            <Typography color="text.secondary">
              No content available
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ModuleGuidebookScreen;
