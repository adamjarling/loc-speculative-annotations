import React from 'react';
import PropTypes from 'prop-types';
import { Box, useColorModeValue } from '@chakra-ui/react';

export const borderBoxSizes = ['30px', '36px'];
export const borderBoxPixelSizes = [30, 36];
const borderRadius = 3;

function ToolbarBorderBox({ children, isActive, ...restProps }) {
  const activeStyles = {
    borderWidth: '0px',
    padding: '2px',
    //borderColor: useColorModeValue('gray.300', 'white'),
    bg: useColorModeValue('gray.300', 'gray.800'),
  };

  return (
    <Box
      w={borderBoxSizes}
      h={borderBoxSizes}
      borderRadius={borderRadius}
      {...(isActive && { ...activeStyles })}
      {...restProps}
    >
      {children}
    </Box>
  );
}

ToolbarBorderBox.propTypes = {
  children: PropTypes.node,
};

export default ToolbarBorderBox;
