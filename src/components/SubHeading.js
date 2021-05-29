import React from 'react';
import { Heading } from '@chakra-ui/react';

export default function SubHeading({ children }) {
  return (
    <Heading size="md" pt={5}>
      {children}
    </Heading>
  );
}
