import React from 'react';
import { useFabricOverlayState } from 'context/fabric-overlay-context';
import { Box, Text } from '@chakra-ui/react';
import StampLibraryOfCongress from 'components/Stamp/LibraryOfCongress';
import pngStamp from 'images/loc-logo-horizantal.png';
import { fabric } from 'openseadragon-fabricjs-overlay';

const defaultMouseCoordsState = { x: null, y: null };

export default function StampWrapper() {
  const { fabricOverlay } = useFabricOverlayState();
  const [activeStampRef, setActiveStampRef] = React.useState();

  React.useEffect(() => {
    console.log('\nuseEffect fabricOverlay');
    if (!fabricOverlay) return;
    const canvas = fabricOverlay.fabricCanvas();

    // Add event handlers
    canvas.on('mouse:down', handleMouseDown);

    return () => {
      // Remove event handlers
      canvas.off('mouse:down');
    };
  }, [fabricOverlay, activeStampRef]);

  const createCursor = function () {
    const cursor = new fabric.Image(activeStampRef.current);
    return cursor;
  };

  const handleMouseDown = evt => {
    if (!activeStampRef) return;

    const { x, y } = evt.absolutePointer;
    const imgInstance = new fabric.Image(activeStampRef.current, {
      left: x,
      top: y,
    });
    fabricOverlay.fabricCanvas().add(imgInstance);
  };

  const handleStampClick = ref => {
    setActiveStampRef(ref);
  };

  return (
    <Box boxShadow="md" padding="6">
      <Text fontSize="xl">Stamp Prototype</Text>
      {/* <img src={pngStamp} ref={imgRef} /> */}
      <StampLibraryOfCongress handleStampClick={handleStampClick} />
    </Box>
  );
}
