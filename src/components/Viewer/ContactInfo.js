import React from 'react';
import { Box } from '@chakra-ui/react';
import { useFabricOverlayState } from 'context/fabric-overlay-context';

function ViewerContactInfo() {
  const { activeTool } = useFabricOverlayState();
  const absoluteValues = {
    top: '10px',
    left: '10px',
  };

  // Prevent this component from displaying through the Type Tool font selection UI
  if (activeTool === 'TYPE') {
    return null;
  }

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
