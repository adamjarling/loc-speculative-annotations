import React from 'react';
import PropTypes from 'prop-types';
import { Box, useColorModeValue } from '@chakra-ui/react';

function OptionsBar({ children, top = 20, left = 120 }) {
  const bg = useColorModeValue('white', 'gray.700');

  return (
    <Box
      bg={bg}
      p={3}
      minW="400px"
      position="absolute"
      left={`${left}px`}
      top={`${top}px`}
      shadow="lg"
    >
      {children}
    </Box>
  );
}

OptionsBar.propTypes = {
  children: PropTypes.node,
  left: PropTypes.number,
  top: PropTypes.number,
};

export default OptionsBar;
