import React from 'react';
import PropTypes from 'prop-types';
import { Box, Flex, useColorModeValue } from '@chakra-ui/react';

export const borderBoxSizes = ['30px', '36px'];
export const borderBoxPixelSizes = [30, 36];
const borderRadius = 3;

function ToolbarBorderBox({ children, isActive, ...restProps }) {
  const activeStyles = {
    borderWidth: '0px',
    padding: '2px',
    bg: useColorModeValue('gray.300', 'gray.800'),
  };

  return (
    <Flex
      w={borderBoxSizes}
      h={borderBoxSizes}
      borderRadius={borderRadius}
      alignItems="center"
      justifyContent="center"
      {...(isActive && { ...activeStyles })}
      {...restProps}
    >
      {children}
    </Flex>
  );
}

ToolbarBorderBox.propTypes = {
  children: PropTypes.node,
};

export default ToolbarBorderBox;
