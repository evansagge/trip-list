import React from 'react';
import {
  Backdrop,
  CircularProgress
} from '@material-ui/core';

const LoadingBackdrop = () => {
  return (
    <Backdrop open>
      <CircularProgress color="inherit" />
    </Backdrop>
  )
}

export default LoadingBackdrop;