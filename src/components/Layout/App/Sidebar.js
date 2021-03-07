import React from 'react';
import { Flex } from '@chakra-ui/react';

export default function LayoutAppSidebar({ children }) {
  return (
    <Flex
      as="section"
      w={{ base: '50px', sm: '60px', md: '80px' }}
      direction="column"
      justifyContent="space-between"
      alignItems="center"
      boxShadow="base"
      zIndex="1"
    >
      {children}
    </Flex>
  );
}
