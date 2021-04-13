import React from 'react';
import { Box, Flex } from '@chakra-ui/react';

export default function LayoutAppMain({ children }) {
  return (
    <Flex as="main" h="100%" w="100%" flexDirection="column">
      {children}
    </Flex>
  );
}
