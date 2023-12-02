
import * as React from 'react';
import backgroundPhoto from '../img/mainpage-background2.jpg'

export function ImageView() {

  return (
      <img
        src={backgroundPhoto}
        alt=""
        style={{ maxWidth: '100%', height: '700px' }}
      />
  );
};


export default ImageView;