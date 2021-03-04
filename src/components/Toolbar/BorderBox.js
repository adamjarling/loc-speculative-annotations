import React from 'react';
import PropTypes from 'prop-types';
import { Box, useColorModeValue } from '@chakra-ui/react';

export const borderBoxSizes = ['30px', '36px'];
export const borderBoxPixelSizes = [30, 36];
const borderRadius = 3;

function ToolbarBorderBox({ children, isActive, ...restProps }) {
  const activeStyles = {
    borderWidth: '1px',
    padding: '0px',
    borderColor: useColorModeValue('gray.300', 'white'),
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
