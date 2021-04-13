import React from 'react';
import { Box, Flex, Link } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import useColorModeColors from 'hooks/use-color-mode-colors';
import { ColorModeSwitcher } from 'ColorModeSwitcher';
import useButtonSize from 'hooks/use-button-size';

export default function EyebrowNav() {
  const { bg } = useColorModeColors();
  const buttonSize = useButtonSize();

  return (
    <Flex
      bgColor={bg}
      pr={2}
      // py={['0px', '2px']}
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
