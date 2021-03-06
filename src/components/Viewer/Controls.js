import React from 'react';
import { useZoom } from 'use-open-seadragon';
import { Box, ButtonGroup, IconButton, Tooltip } from '@chakra-ui/react';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { useFabricOverlayState } from 'context/fabric-overlay-context';
import { ReactComponent as MagnifyingIcon } from 'images/MagnifyingGlass.svg';

function ViewerControls() {
  const { viewer } = useFabricOverlayState();
  const { zoomIn, zoomOut } = useZoom();

  const handleReset = e => {
    viewer.viewport.goHome();
  };

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
    <Box position="absolute" right="10px" top="10px" zIndex="1">
      <ButtonGroup spacing="1" size="sm">
        <Tooltip label="Zoom out" aria-label="Zoom out">
          <IconButton
            icon={<FaMinus />}
            onClick={handleZoomOut}
            size="sm"
            variant="ghost"
          />
        </Tooltip>
        <Tooltip label="Reset zoom" aria-label="Reset zoom">
          <IconButton
            icon={<MagnifyingIcon />}
            onClick={handleReset}
            variant="ghost"
          />
        </Tooltip>
        <Tooltip label="Zoom in" aria-label="Zoom in">
          <IconButton icon={<FaPlus />} onClick={handleZoomIn} size="sm" />
        </Tooltip>
      </ButtonGroup>
    </Box>
  );
}

export default ViewerControls;
