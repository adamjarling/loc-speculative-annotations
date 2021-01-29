import React from 'react';
import PropTypes from 'prop-types';
import { Box, useColorModeValue } from '@chakra-ui/react';

function OptionsBar({ children }) {
  const bg = useColorModeValue('white', 'gray.700');

  return (
    <Box
      bg={bg}
      p={3}
      minW="400px"
      position="absolute"
      left="120px"
      top="20px"
      shadow="lg"
    >
      {children}
    </Box>
  );
}

OptionsBar.propTypes = {
  children: PropTypes.node,
};

export default OptionsBar;
