import React from 'react';
import { Box } from '@chakra-ui/react';

function ViewerContactInfo() {
  const absoluteValues = {
    top: '10px',
    left: '10px',
  };
  return (
    <Box
      position="absolute"
      left={absoluteValues.left}
      top={absoluteValues.top}
      border="1px dashed"
      borderRadius="10px"
      borderColor="brand.pink.500"
      width="150px"
      zIndex="10"
    >
      <Box fontSize="xs" p={1}>
        Name:
        <br />
        Age:
        <br />
        Town:
      </Box>
    </Box>
  );
}

export default ViewerContactInfo;
