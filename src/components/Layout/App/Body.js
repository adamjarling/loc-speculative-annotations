import React from 'react';
import { Flex } from '@chakra-ui/react';

function LayoutAppBody({ children }) {
  return (
    <Flex flexGrow={1} as="main">
      {children}
    </Flex>
  );
}

export default LayoutAppBody;
