import React from 'react';
import { Flex, HStack } from '@chakra-ui/react';
import WorksListModal from 'components/WorksListModal';
import ShowHideAnnotations from 'components/ShowHideAnnotations';
import { ColorModeSwitcher } from 'ColorModeSwitcher';
import useButtonSize from 'hooks/use-button-size';
import { isBrowser, isTablet } from 'react-device-detect';
import MyAnnotations from 'components/MyAnnotations/MyAnnotations';
import Metadata from 'components/Metadata/Metadata';

function LayoutAppFooter() {
  const buttonSize = useButtonSize();

  return (
    <Flex
      as="footer"
      justifyContent="space-between"
      alignItems="center"
      px={isBrowser || isTablet ? 3 : '2px'}
      py={2}
      boxShadow="base"
      zIndex="1"
    >
      <Flex direction="row">{isBrowser && <ShowHideAnnotations />}</Flex>

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
