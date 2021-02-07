import React from 'react';
import PropTypes from 'prop-types';
import { Box, useColorModeValue } from '@chakra-ui/react';

const colorBoxSizes = ['30px', '36px'];
const borderRadius = 3;

function ToolbarBorderBox({ children, isActive }) {
  const activeStyles = {
    borderWidth: '1px',
    padding: '0px',
    borderColor: useColorModeValue('gray.300', 'white'),
  };

  return (
    <Box
      w={colorBoxSizes}
      h={colorBoxSizes}
      borderRadius={borderRadius}
      {...(isActive && { ...activeStyles })}
    >
      {children}
    </Box>
  );
}

ToolbarBorderBox.propTypes = {
  children: PropTypes.node,
};

export default ToolbarBorderBox;
