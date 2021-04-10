import React from 'react';
import { Box, Image } from '@chakra-ui/react';
import saLogo from 'images/logo.png';

function SALogo() {
  return (
    <Box data-testid="logo">
      <Image
        src={saLogo}
        alt="Speculative Annotations"
        w="auto"
        maxH="50px"
        mt="0"
        zIndex="1000"
      />
    </Box>
  );
}

export default SALogo;
