import React from 'react';
import { Flex, Link, useBreakpointValue } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import useColorModeColors from 'hooks/use-color-mode-colors';
import { ColorModeSwitcher } from 'ColorModeSwitcher';

export default function EyebrowNav() {
  const { bg } = useColorModeColors();
  const isVisible = useBreakpointValue({ base: false, sm: true });

  return !isVisible ? null : (
    <Flex
      bgColor={bg}
      pr={2}
      alignItems="center"
      justifyContent="space-between"
      data-testid="eyebrow-row"
    >
      <Link
        href="https://loc.gov/"
        fontSize="xs"
        ml={6}
        isExternal
        data-testid="loc-link"
      >
        Back to LOC.gov <ExternalLinkIcon mx="2px" />
      </Link>
      <ColorModeSwitcher />
    </Flex>
  );
}
