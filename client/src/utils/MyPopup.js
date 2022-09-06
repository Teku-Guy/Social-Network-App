import React from 'react';
import { Portal  } from '@mui/material';

function MyPopup({content, children}) {
  return (
    <Portal
      inverted
      content={content}
      trigger={children}
    />
  )
}

export default MyPopup;