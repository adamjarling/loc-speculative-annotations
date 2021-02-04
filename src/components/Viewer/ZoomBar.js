import React from 'react';
import { useZoom } from 'use-open-seadragon';
import { Box, ButtonGroup, IconButton } from '@chakra-ui/react';
import { FiZoomIn, FiZoomOut } from 'react-icons/fi';

function ViewerZoomBar(props) {
  const { zoomIn, zoomOut } = useZoom();

  return (
    //TODO: Figure out the Z-Index in relation to Annotation button dropdown
    <Box position="absolute" right="20px" top="20px" zIndex="10">
      <ButtonGroup spacing="3" size="lg">
        <IconButton icon={<FiZoomIn />} onClick={() => zoomIn()} />
        <IconButton icon={<FiZoomOut />} onClick={() => zoomOut()} />
      </ButtonGroup>
    </Box>
  );
}

export default ViewerZoomBar;
