import React from 'react';
import { Box, useColorModeValue } from '@chakra-ui/react';

function ToolbarBorderBoxInner({ ...restProps }) {
  const bg = useColorModeValue('white', 'gray.700');

  return (
    <Box
      as="button"
      w="100%"
      h="100%"
      borderRadius={3}
      //borderWidth="2px"
      //borderColor={bg}
      _focus={{
        // outline: `lightgray auto 1px`,
        outline: `none`,
      }}
      {...restProps}
    ></Box>
  );
}

ToolbarBorderBoxInner.propTypes = {};

export default ToolbarBorderBoxInner;
