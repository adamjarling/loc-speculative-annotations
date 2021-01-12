import React from 'react';
import { Flex } from '@chakra-ui/react';

export default function LayoutAppSidebar({ children }) {
  return (
    <Flex
      as="section"
      w="80px"
      direction="column"
      justifyContent="space-between"
    >
      {children}
    </Flex>
  );
}
