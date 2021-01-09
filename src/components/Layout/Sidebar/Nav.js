import React from 'react';
import { Box, Image, Link, VStack } from '@chakra-ui/react';
import locLogo from 'images/social-media-logos-Labs.svg';
import WorksListModal from 'components/WorksListModal';

export default function Nav() {
  return (
    <VStack as="nav" spacing="6px">
      <Link href="https://labs.loc.gov/" isExternal>
        <Image src={locLogo} alt="Library of Congress Labs" />
      </Link>
      <WorksListModal />
    </VStack>
  );
}
