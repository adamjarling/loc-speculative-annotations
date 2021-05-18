import React from 'react';
import { Image, useBreakpointValue } from '@chakra-ui/react';
import saLogo from 'images/logo2.png';

function ViewerWatermarkLogo() {
  const maxW = useBreakpointValue({ base: '90px', sm: '120px' });

  return (
    <Image
      maxW={maxW}
      src={saLogo}
      alt="Speculative Annotation logo"
      position="absolute"
      bottom={`10px`}
      right={`10px`}
      zIndex="10"
    />
  );
}

export default ViewerWatermarkLogo;
