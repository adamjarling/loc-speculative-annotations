import React from 'react';
import { Box } from '@chakra-ui/react';

function ToolbarBorderBoxInner({ ...restProps }) {
  return (
    <Box
      as="button"
      w="80%"
      h="80%"
      borderRadius={3}
      _focus={{
        outline: `none`,
      }}
      {...restProps}
    ></Box>
  );
}

export default ToolbarBorderBoxInner;
