import React from 'react';
import { Flex, HStack, useColorModeValue } from '@chakra-ui/react';
import WorksListModal from 'components/WorksListModal';
import ShowHideAnnotations from 'components/ShowHideAnnotations';
import { ColorModeSwitcher } from 'ColorModeSwitcher';
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
      alignItems="center"
      px={isBrowser || isTablet ? 3 : '2px'}
      py={2}
      boxShadow="base"
      zIndex="1"
    >
      <Flex direction="row">
        {(isTablet || isBrowser) && <ShowHideAnnotations />}
      </Flex>

      <HStack>
        <Metadata />
        <WorksListModal />
        {/* <MyAnnotations /> */}
        <ColorModeSwitcher size={buttonSize} />
      </HStack>
    </Flex>
  );
}

export default LayoutAppFooter;
