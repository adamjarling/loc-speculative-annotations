import React from 'react';
import PropTypes from 'prop-types';
import { Box, useColorModeValue } from '@chakra-ui/react';

function ToolbarOptionsPanel({ children }) {
  const bg = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box
      backgroundColor={bg}
      position="absolute"
      top="6"
      left="24"
      p={3}
      boxShadow="xl"
    >
      {children}
    </Box>
  );
}

ToolbarOptionsPanel.propTypes = {
  children: PropTypes.node,
};

export default ToolbarOptionsPanel;
