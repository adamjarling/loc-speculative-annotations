import React from 'react';
import { Box, useBreakpointValue } from '@chakra-ui/react';
import { ReactComponent as Logo } from 'images/SALogo+Hashtag.svg';

function ViewerWatermarkLogo() {
  const maxW = useBreakpointValue({ base: '90px', sm: '140px' });

  return (
    <Box
      alt="Speculative Annotation logo"
      position="absolute"
      bottom={`15px`}
      right={`15px`}
      zIndex="10"
    >
      <Logo />
    </Box>
  );
}

export default ViewerWatermarkLogo;
