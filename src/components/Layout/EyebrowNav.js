import React from 'react';
import {
  Box,
  Flex,
  Link,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';

export default function EyebrowNav() {
  const bg = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box bgColor={bg} py={1}>
      <Link href="https://loc.gov/" fontSize="xs" ml={6} isExternal>
        Back to LOC.gov <ExternalLinkIcon mx="2px" />
      </Link>
    </Box>
  );
}
