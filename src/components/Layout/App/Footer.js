import React from 'react';
import { Box, Flex, HStack, useColorModeValue } from '@chakra-ui/react';
import WorksListModal from 'components/WorksListModal';
import ShowHideAnnotations from 'components/ShowHideAnnotations';
import { isBrowser, isTablet } from 'react-device-detect';
import Metadata from 'components/Metadata/Metadata';

function LayoutAppFooter() {
  const bgColor = useColorModeValue('gray.200', 'gray.600');

  return (
    <Flex
      as="footer"
      bgColor={bgColor}
      justifyContent="space-between"
      alignItems={isTablet ? 'flex-end' : 'center'}
      px={isBrowser || isTablet ? 3 : '2px'}
      py={1}
      zIndex="1"
    >
      <Box>{(isTablet || isBrowser) && <ShowHideAnnotations />}</Box>

      <HStack>
        <Metadata />
        <WorksListModal />
      </HStack>
    </Flex>
  );
}

export default LayoutAppFooter;
