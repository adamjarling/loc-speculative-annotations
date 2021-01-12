import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Button, ButtonGroup } from '@chakra-ui/react';
import WorksListModal from 'components/WorksListModal';
import MyAnnotations from 'components/MyAnnotations';
import SaveCanvasList from 'components/Save/CanvasList';
import SaveDrawer from 'components/Save/Drawer';
import { GrUserManager } from 'react-icons/gr';

function ViewerFooter(props) {
  return (
    <Flex
      as="footer"
      h="6vh"
      justifyContent="space-between"
      alignItems="center"
      px="3"
      boxShadow="base"
      zIndex="1"
    >
      <WorksListModal />

      <ButtonGroup>
        <MyAnnotations />
        {/* <SaveDrawer /> */}
        <Button leftIcon={<GrUserManager />}>Curator Annotation</Button>
      </ButtonGroup>
    </Flex>
  );
}

ViewerFooter.propTypes = {};

export default ViewerFooter;
