import React from 'react';
import PropTypes from 'prop-types';
import { Box, Flex } from '@chakra-ui/react';

function LayoutAppBody({ children }) {
  return (
    <Flex height="86vh" as="main">
      {children}
    </Flex>
  );
}

LayoutAppBody.propTypes = {};

export default LayoutAppBody;
