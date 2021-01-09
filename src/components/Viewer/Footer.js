import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Button, ButtonGroup } from '@chakra-ui/react';

function ViewerFooter(props) {
  return (
    <Flex as="footer" h="6vh" justifyContent="flex-end" alignItems="center">
      <ButtonGroup>
        <Button>My Annotation</Button>
        <Button>Curator Annotation</Button>
      </ButtonGroup>
    </Flex>
  );
}

ViewerFooter.propTypes = {};

export default ViewerFooter;
