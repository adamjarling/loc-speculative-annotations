import React from 'react';
import { Box, useBreakpointValue } from '@chakra-ui/react';
import saLogo from 'images/logo2.png';
import { ReactComponent as Logo } from 'images/SALogo+Hashtag.svg';

function ViewerWatermarkLogo() {
  const maxW = useBreakpointValue({ base: '90px', sm: '120px' });

  return (
    <Box
      maxW={maxW}
      src={saLogo}
      alt="Speculative Annotation logo"
      position="absolute"
      bottom={`10px`}
      right={`10px`}
      zIndex="10"
    >
      <Logo />
    </Box>
  );
}

export default ViewerWatermarkLogo;
