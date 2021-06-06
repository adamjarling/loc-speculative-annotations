import React from 'react';
import PropTypes from 'prop-types';
import { Box, useColorModeValue } from '@chakra-ui/react';

function ToolbarOptionsPanel({ children, ...restProps }) {
  const bg = useColorModeValue('white', 'gray.700');

  return (
    <Box
      backgroundColor={bg}
      position="absolute"
      top="3"
      left={['56px', '64px', '72px', '84px']}
      p={[1, 2]}
      boxShadow="xl"
      {...restProps}
    >
      {children}
    </Box>
  );
}

ToolbarOptionsPanel.propTypes = {
  children: PropTypes.node,
};

export default ToolbarOptionsPanel;
