import React from 'react';
import { useZoom } from 'use-open-seadragon';
import { Box, Button, ButtonGroup, IconButton } from '@chakra-ui/react';
import { FiZoomIn, FiZoomOut } from 'react-icons/fi';
import { useFabricOverlayState } from 'context/fabric-overlay-context';

function ViewerZoomBar() {
  const { viewer } = useFabricOverlayState();
  const { zoomIn, zoomOut } = useZoom();

  const handleZoomIn = e => {
    try {
      if (viewer.viewport.getMaxZoom() > viewer.viewport.getZoom()) {
        zoomIn();
      }
    } catch (e) {
      console.error('Error handling Zoom In button click', e);
    }
  };

  const handleZoomOut = e => {
    try {
      if (viewer.viewport.getMinZoom() < viewer.viewport.getZoom()) {
        zoomOut();
      }
    } catch (e) {
      console.error('Error handling Zoom Out button click', e);
    }
  };

  return (
    //TODO: Figure out the Z-Index in relation to Annotation button dropdown
    <Box position="absolute" right="20px" top="20px" zIndex="10">
      <ButtonGroup spacing="3" size="lg">
        <IconButton icon={<FiZoomIn />} onClick={handleZoomIn} />
        <IconButton icon={<FiZoomOut />} onClick={handleZoomOut} />
      </ButtonGroup>
    </Box>
  );
}

export default ViewerZoomBar;
