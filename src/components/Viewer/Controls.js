import React from 'react';
import { useZoom } from 'use-open-seadragon';
import { Box, Button, ButtonGroup, IconButton } from '@chakra-ui/react';
import { FiZoomIn, FiZoomOut } from 'react-icons/fi';
import { useFabricOverlayState } from 'context/fabric-overlay-context';
import { RiArrowGoBackFill, RiArrowGoForwardLine } from 'react-icons/ri';
import useButtonSize from 'hooks/use-button-size';

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
    //TODO: Figure out the Z-Index in relation to Annotation button dropdown
    <Box position="absolute" right="20px" top="20px" zIndex="10">
      <ButtonGroup spacing="3" size="lg">
        <IconButton
          icon={<FiZoomIn />}
          onClick={handleZoomIn}
          size={buttonSize}
        />
        <IconButton
          icon={<FiZoomOut />}
          onClick={handleZoomOut}
          size={buttonSize}
        />
        <IconButton
          icon={<RiArrowGoBackFill />}
          aria-label="Undo"
          size={buttonSize}
          disabled
        />
        <IconButton
          icon={<RiArrowGoForwardLine />}
          aria-label="Redo"
          size={buttonSize}
          disabled
        />
      </ButtonGroup>
    </Box>
  );
}

export default ViewerControls;
