import React from 'react';
import { useFabricOverlayState } from 'context/fabric-overlay-context';
import { Box, Text } from '@chakra-ui/react';
import StampLibraryOfCongress from 'components/Stamp/LibraryOfCongress';
import { fabric } from 'openseadragon-fabricjs-overlay';

export default function StampWrapper() {
  const { fabricOverlay, viewer } = useFabricOverlayState();
  const [activeStampRef, setActiveStampRef] = React.useState();

  React.useEffect(() => {
    if (!viewer) return;
    viewer.setMouseNavEnabled(activeStampRef ? false : true);
    viewer.addHandler('canvas-click', obj =>
      console.log('OSD canvas-click', obj)
    );
  }, [activeStampRef, viewer]);

  React.useEffect(() => {
    if (!fabricOverlay) return;
    const canvas = fabricOverlay.fabricCanvas();

    // MOUSE DOWN
    canvas.on('mouse:down', evt => {
      viewer.setMouseNavEnabled(false);

      if (!activeStampRef || evt.target) return;

      const { x, y } = evt.absolutePointer;
      const imgInstance = new fabric.Image(activeStampRef.current, {
        left: x,
        top: y,
      });
      fabricOverlay.fabricCanvas().add(imgInstance);
    });

    // MOUSE UP
    canvas.on('mouse:up', evt => {
      viewer.setMouseNavEnabled(true);
    });

    return () => {
      // Remove event handlers
      canvas.off('mouse:down');
      canvas.off('mouse:up');
    };
  }, [fabricOverlay, activeStampRef, viewer]);

  const handleStampClick = ref => {
    setActiveStampRef(ref);
  };

  return (
    <Box boxShadow="md" padding="6">
      <Text fontSize="xl">Stamp Prototype</Text>
      <StampLibraryOfCongress handleStampClick={handleStampClick} />
    </Box>
  );
}
