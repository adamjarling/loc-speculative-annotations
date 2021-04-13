import React from 'react';
import { Flex, useColorModeValue } from '@chakra-ui/react';

export default function LayoutAppSidebar({ children }) {
  const bgColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Flex
      as="aside"
      bgColor={bgColor}
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
