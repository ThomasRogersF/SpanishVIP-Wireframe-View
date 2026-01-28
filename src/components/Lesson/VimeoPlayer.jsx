import React from 'react';

/**
 * VimeoPlayer - Simple Vimeo video player component
 * 
 * Props:
 * - videoId: Vimeo video ID (e.g., '1159303752')
 * - title: Video title for accessibility
 */
const VimeoPlayer = ({ videoId, title }) => {
  return (
    <iframe
      src={`https://player.vimeo.com/video/${videoId}?badge=0&autopause=0&player_id=0&app_id=58479`}
      style={{
        width: '100%',
        aspectRatio: '16 / 9',
        borderRadius: '16px',
        border: 'none',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        backgroundColor: '#000',
        marginBottom: '16px'
      }}
      frameBorder="0"
      allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      title={title}
    />
  );
};

export default VimeoPlayer;
