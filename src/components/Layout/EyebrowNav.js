import React from 'react';
import { Box, Link } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import useColorModeColors from 'hooks/use-color-mode-colors';

export default function EyebrowNav() {
  const { bg } = useColorModeColors();

  return (
    <Box bgColor={bg} py={['0px', '2px']} data-testid="eyebrow-row">
      <Link
        href="https://loc.gov/"
        fontSize="xs"
        ml={6}
        isExternal
        data-testid="loc-link"
      >
        Back to LOC.gov <ExternalLinkIcon mx="2px" />
      </Link>
    </Box>
  );
}
