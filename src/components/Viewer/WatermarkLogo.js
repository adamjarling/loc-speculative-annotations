import React from 'react';
import { Image, useColorModeValue } from '@chakra-ui/react';
import logoLightMode from 'images/loc-sa-logo__light-mode.png';
import logoDarkMode from 'images/loc-sa-logo__dark-mode.png';
import saLogo from 'images/logo2.png';

function ViewerWatermarkLogo() {
  const logo = useColorModeValue(logoLightMode, logoDarkMode);

  return (
    <Image
      maxW="120px"
      src={saLogo}
      alt="Structural Annotation Library of Congress Labs logo"
      position="absolute"
      bottom={`10px`}
      right={`10px`}
      zIndex="10"
    />
  );
}

export default ViewerWatermarkLogo;
