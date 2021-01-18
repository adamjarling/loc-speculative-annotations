import React from 'react';
import { Box, Flex, Button, ButtonGroup } from '@chakra-ui/react';
import WorksListModal from 'components/WorksListModal';
import MyAnnotations from 'components/MyAnnotations';
import ShowHideAnnotations from 'components/ShowHideAnnotations';
import ClearCanvas from 'components/ClearCanvas';
import Share from 'components/Share/Share';
import SaveCanvas from 'components/Save/Canvas';
import { ColorModeSwitcher } from '../../../ColorModeSwitcher';

function ViewerFooter() {
  return (
    <Flex
      as="footer"
      justifyContent="space-between"
      alignItems="center"
      px={3}
      py={2}
      boxShadow="base"
      zIndex="1"
    >
      <Flex direction="row">
        <WorksListModal />
        <ShowHideAnnotations />
      </Flex>

      <ButtonGroup>
        {/* <MyAnnotations /> */}
        <ClearCanvas />
        <Button size="sm">Undo</Button>
        <Button size="sm">Redo</Button>
        <Share />
        <SaveCanvas />
        <ColorModeSwitcher size="sm" />
      </ButtonGroup>
    </Flex>
  );
}

export default ViewerFooter;
