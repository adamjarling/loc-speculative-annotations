import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { ColorModeSwitcher } from 'ColorModeSwitcher';
import logo from 'images/logo.png';
import Toolbar from 'components/Toolbar';
import WorkSpace from 'components/WorkSpace';

export default function Layout({ children }) {
  return (
    <Flex flexDir="column" height="100vh">
      <Box flex="1 0 auto" bg="yellow.500">
        <Flex>
          <Toolbar />
          <Box bg="blue.500" flex="1">
            asdfasdf
          </Box>
        </Flex>
      </Box>

      <Box bg="green.500" width="100%" flexShrink="0" height="100px">
        asdfasdf
      </Box>
    </Flex>
  );
}

{
  /* <ColorModeSwitcher justifySelf="flex-end" />
      <VStack spacing={8}>
        <React.Fragment>
          <img src={logo} alt="logo" style={{ width: '200px' }} />
          {children}
          <LayoutFooter />
        </React.Fragment>
      </VStack> */
}
