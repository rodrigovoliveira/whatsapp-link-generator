import React, { useEffect } from 'react';
import { Box } from '@mui/material';

interface AdUnitProps {
  slot: string;
  format?: 'auto' | 'fluid' | 'rectangle';
  responsive?: boolean;
  style?: React.CSSProperties;
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

const AdUnit: React.FC<AdUnitProps> = ({ 
  slot, 
  format = 'auto',
  responsive = true,
  style 
}) => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error('Error loading AdSense ad:', err);
    }
  }, []);

  return (
    <Box
      component="div"
      sx={{
        display: 'block',
        textAlign: 'center',
        overflow: 'hidden',
        backgroundColor: 'transparent',
        margin: '20px auto',
        ...style
      }}
    >
      <div
        className="adsbygoogle"
        style={{
          display: 'block',
          margin: '0 auto',
        }}
        data-ad-client="ca-pub-6626399903538096"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive}
      />
    </Box>
  );
};

export default AdUnit; 