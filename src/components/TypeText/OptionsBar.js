import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@chakra-ui/react';
import { useFabricOverlayState } from 'context/fabric-overlay-context';

function TypeTextOptionsBar(props) {
  const { fabricOverlay } = useFabricOverlayState();

  //   React.useEffect(() => {
  //     if (!fabricOverlay) return;
  //     const canvas = fabricOverlay.fabricCanvas();
  //     console.log('canvas.getActiveObject()', canvas.getActiveObject());
  //   }, [fabricOverlay]);

  return (
    <Box
      background="red.500"
      w="400px"
      h="50px"
      position="absolute"
      left="400px"
      top="400px"
    >
      asdfasdf
    </Box>
  );
}

TypeTextOptionsBar.propTypes = {};

export default TypeTextOptionsBar;
