import React from 'react';
import { useZoom } from 'use-open-seadragon';
import { Box, ButtonGroup, IconButton, Tooltip } from '@chakra-ui/react';
import { FiZoomIn, FiZoomOut } from 'react-icons/fi';
import { useFabricOverlayState } from 'context/fabric-overlay-context';
import useButtonSize from 'hooks/use-button-size';

import UndoRedo from 'components/UndoRedo/UndoRedo';

function ViewerControls() {
  const { viewer } = useFabricOverlayState();
  const { zoomIn, zoomOut } = useZoom();
  const buttonSize = useButtonSize();

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
    <Box position="absolute" right="20px" top="20px" zIndex="1">
      <ButtonGroup spacing="3" size="lg">
        <Tooltip label="Zoom in" aria-label="Zoom in">
          <IconButton
            icon={<FiZoomIn />}
            onClick={handleZoomIn}
            size={buttonSize}
          />
        </Tooltip>
        <Tooltip label="Zoom out" aria-label="Zoom out">
          <IconButton
            icon={<FiZoomOut />}
            onClick={handleZoomOut}
            size={buttonSize}
          />
        </Tooltip>
        <UndoRedo />
      </ButtonGroup>
    </Box>
  );
}

export default ViewerControls;
