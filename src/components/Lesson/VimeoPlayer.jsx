import React, { useRef, useEffect } from 'react';
import { Box } from '@mui/material';

/**
 * VimeoPlayer - Simple Vimeo video player component
 * 
 * Features:
 * - Vimeo Player API integration for completion tracking
 * - Uses Vimeo's native player controls
 * - Rounded corners styling and responsive aspect ratio (16:9)
 * - Completion callback
 * 
 * Props:
 * - videoId: Vimeo video ID (e.g., '1159303752')
 * - title: Video title for accessibility
 * - onComplete: Callback function when video completes
 */
const VimeoPlayer = ({ videoId, title, onComplete }) => {
  const iframeRef = useRef(null);
  const playerRef = useRef(null);

  // Initialize Vimeo Player
  useEffect(() => {
    if (typeof window !== 'undefined' && window.Vimeo && iframeRef.current) {
      const player = new window.Vimeo.Player(iframeRef.current, {
        id: videoId,
        width: 640,
        autoplay: false,
        controls: true,
        responsive: true
      });

      playerRef.current = player;

      // Track video end
      player.on('ended', () => {
        if (onComplete) {
          onComplete();
        }
      });

      // Cleanup on unmount
      return () => {
        if (playerRef.current) {
          playerRef.current.off('ended');
          playerRef.current.unload().catch(error => {
            console.error('Error unloading player:', error);
          });
        }
      };
    }
  }, [videoId, onComplete]);

  return (
    <Box
      sx={{
        width: '100%',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        backgroundColor: '#000',
        mb: 2
      }}
    >
      <iframe
        ref={iframeRef}
        src={`https://player.vimeo.com/video/${videoId}?badge=0&autopause=0&player_id=0&app_id=58479`}
        style={{
          width: '100%',
          aspectRatio: '16 / 9',
          border: 'none'
        }}
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        title={title}
      />
    </Box>
  );
};

export default VimeoPlayer;
