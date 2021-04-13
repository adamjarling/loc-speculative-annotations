import React from 'react';
import { Flex, useColorModeValue } from '@chakra-ui/react';

function LayoutAppBody({ children }) {
  const bgColor = useColorModeValue('white', 'gray.600');

  return (
    <Flex flexGrow={1} bgColor={bgColor}>
      {children}
    </Flex>
  );
}

export default LayoutAppBody;
