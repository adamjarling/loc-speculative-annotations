import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Button, ButtonGroup } from '@chakra-ui/react';
import WorksListModal from 'components/WorksListModal';

function ViewerFooter(props) {
  return (
    <Flex
      as="footer"
      h="6vh"
      justifyContent="space-between"
      alignItems="center"
      mx="3"
    >
      <WorksListModal />
      <ButtonGroup>
        <Button>My Annotation</Button>
        <Button>Curator Annotation</Button>
      </ButtonGroup>
    </Flex>
  );
}

ViewerFooter.propTypes = {};

export default ViewerFooter;
