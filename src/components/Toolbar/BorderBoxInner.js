import React from 'react';
import PropTypes from 'prop-types';
import { Box, useColorModeValue } from '@chakra-ui/react';

function ToolbarBorderBoxInner({ ...restProps }) {
  const bg = useColorModeValue('white', 'gray.700');
  return (
    <Box
      as="button"
      w="100%"
      height="100%"
      borderRadius={3}
      borderWidth="2px"
      borderColor={bg}
      {...restProps}
    ></Box>
  );
}

ToolbarBorderBoxInner.propTypes = {};

export default ToolbarBorderBoxInner;
