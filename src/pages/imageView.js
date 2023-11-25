import { Box } from '@mui/material';
import * as React from 'react';
import backgroundPhoto from '../img/mainpage-background2.jpg'

export function ImageView () {
  
    return (
      <Box class="background">
        <img
          src={backgroundPhoto}
          alt=""
          style={{ maxWidth: '100%', height: '700px' }}
        />
      </Box>
    );
  };

  
export default ImageView;