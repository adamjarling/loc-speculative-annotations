import React from 'react';
import { Box, Flex } from '@chakra-ui/react';

export default function Sidebar({ children }) {
  return (
    <Flex
      as="section"
      w="80px"
      h="100vh"
      bg="blue.500"
      direction="column"
      justifyContent="space-between"
    >
      {children}
    </Flex>
  );
}
