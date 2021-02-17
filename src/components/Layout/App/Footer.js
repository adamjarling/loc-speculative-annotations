import React from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  IconButton,
  useBreakpointValue,
} from '@chakra-ui/react';
import WorksListModal from 'components/WorksListModal';
import ShowHideAnnotations from 'components/ShowHideAnnotations';
import ClearCanvas from 'components/ClearCanvas';
import Share from 'components/Share/Share';
import MyAnnotationsSave from 'components/MyAnnotations/Save';
import { ColorModeSwitcher } from '../../../ColorModeSwitcher';
import useButtonSize from 'hooks/use-button-size';
import { RiArrowGoBackFill, RiArrowGoForwardLine } from 'react-icons/ri';
import { isBrowser } from 'react-device-detect';

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
        {isBrowser && <ShowHideAnnotations />}
      </Flex>

      <ButtonGroup>
        <ClearCanvas />
        <IconButton
          icon={<RiArrowGoBackFill />}
          aria-label="Undo"
          size={buttonSize}
        />
        <IconButton
          icon={<RiArrowGoForwardLine />}
          aria-label="Redo"
          size={buttonSize}
        />
        <Share />
        <MyAnnotationsSave />
        <ColorModeSwitcher size={buttonSize} />
      </ButtonGroup>
    </Flex>
  );
}

export default ViewerFooter;
