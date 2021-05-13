import React from 'react';
import { Box, Flex, HStack, useColorModeValue } from '@chakra-ui/react';
import WorksListModal from 'components/WorksListModal';
import ShowHideAnnotations from 'components/ShowHideAnnotations';
import useButtonSize from 'hooks/use-button-size';
import { isBrowser, isTablet } from 'react-device-detect';
import MyAnnotations from 'components/MyAnnotations/MyAnnotations';
import Metadata from 'components/Metadata/Metadata';

function LayoutAppFooter() {
  const buttonSize = useButtonSize();
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
        {/* <MyAnnotations /> */}
      </HStack>
    </Flex>
  );
}

export default LayoutAppFooter;
