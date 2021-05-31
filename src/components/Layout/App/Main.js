import React from 'react';
import { Flex } from '@chakra-ui/react';

export default function LayoutAppMain({ children }) {
  return (
    <Flex as="main" w="100%" flexDirection="column">
      {children}
    </Flex>
  );
}
