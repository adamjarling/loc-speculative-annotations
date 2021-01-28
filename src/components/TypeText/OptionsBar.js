import React from 'react';
import PropTypes from 'prop-types';
import { Box, useColorModeValue } from '@chakra-ui/react';
import { useFabricOverlayState } from 'context/fabric-overlay-context';

function TypeTextOptionsBar({ selectedCoords = { top: 0, left: 0 } }) {
  const { fabricOverlay } = useFabricOverlayState();
  const bg = useColorModeValue('white', 'gray.700');

  //   React.useEffect(() => {
  //     if (!fabricOverlay) return;
  //     const canvas = fabricOverlay.fabricCanvas();
  //     console.log('canvas.getActiveObject()', canvas.getActiveObject());
  //   }, [fabricOverlay]);

  return (
    <Box
      bg={bg}
      p={3}
      minW="400px"
      position="absolute"
      left="120px"
      top="20px"
      shadow="lg"
    >
      I'm the options bar for selected text
    </Box>
  );
}

TypeTextOptionsBar.propTypes = {
  selectedCoords: PropTypes.object,
};

export default TypeTextOptionsBar;
