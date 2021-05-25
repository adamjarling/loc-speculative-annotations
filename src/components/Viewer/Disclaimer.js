import React from 'react';
import { Text, useBreakpointValue, useColorModeValue } from '@chakra-ui/react';

export default function Disclaimer() {
  const textColor = useColorModeValue('gray.500', 'gray.300');
  const fontSize = useBreakpointValue({ base: 'xx-small', sm: 'xs' });

  return (
    <Text
      position="absolute"
      fontSize={fontSize}
      bottom="15px"
      left="0"
      right="0"
      margin="auto"
      textAlign="center"
      textColor={textColor}
      zIndex="10"
    >
      The original item can be found at the Library of Congress
    </Text>
  );
}
