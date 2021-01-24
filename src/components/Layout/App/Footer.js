import React from 'react';
import {
  Box,
  Flex,
  Button,
  ButtonGroup,
  useBreakpointValue,
} from '@chakra-ui/react';
import WorksListModal from 'components/WorksListModal';
import MyAnnotations from 'components/MyAnnotations';
import ShowHideAnnotations from 'components/ShowHideAnnotations';
import ClearCanvas from 'components/ClearCanvas';
import Share from 'components/Share/Share';
import SaveCanvas from 'components/Save/Canvas';
import { ColorModeSwitcher } from '../../../ColorModeSwitcher';
import useButtonSize from 'hooks/use-button-size';

function ViewerFooter() {
  const buttonSize = useButtonSize();
  const isMobileVisible = useBreakpointValue({ base: false, md: true });

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
        {isMobileVisible && <ShowHideAnnotations />}
      </Flex>

      <ButtonGroup>
        <MyAnnotations />
        <ClearCanvas />
        <Button size={buttonSize}>Undo</Button>
        <Button size={buttonSize}>Redo</Button>
        <Share />
        <SaveCanvas />
        <ColorModeSwitcher size={buttonSize} />
      </ButtonGroup>
    </Flex>
  );
}

export default ViewerFooter;
