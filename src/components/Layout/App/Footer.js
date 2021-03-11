import React from 'react';
import { ButtonGroup, Flex } from '@chakra-ui/react';
import WorksListModal from 'components/WorksListModal';
import ShowHideAnnotations from 'components/ShowHideAnnotations';
import ClearCanvas from 'components/ClearCanvas';
import Share from 'components/Share/Share';
import MyAnnotationsSave from 'components/MyAnnotations/Save';
import { ColorModeSwitcher } from 'ColorModeSwitcher';
import useButtonSize from 'hooks/use-button-size';
import { isBrowser, isTablet } from 'react-device-detect';
import Download from 'components/Download';

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
      <Flex direction="row">
        <WorksListModal />
        {isBrowser && <ShowHideAnnotations />}
      </Flex>

      <ButtonGroup>
        <ClearCanvas />
        <Share />
        <MyAnnotationsSave />
        {isBrowser && <Download />}
        <ColorModeSwitcher size={buttonSize} />
      </ButtonGroup>
    </Flex>
  );
}

export default LayoutAppFooter;
