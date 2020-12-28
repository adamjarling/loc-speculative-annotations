import React from 'react';
import { useFabricOverlayState } from 'context/fabric-overlay-context';
import { Box, Text } from '@chakra-ui/react';
import StampLibraryOfCongress from 'components/Stamp/LibraryOfCongress';
import { fabric } from 'openseadragon-fabricjs-overlay';

export default function StampWrapper() {
  const { fabricOverlay, viewer } = useFabricOverlayState();
  const [activeStampRef, setActiveStampRef] = React.useState();
  const [foo, setFoo] = React.useState();

  const onOsdClick = obj => console.log('OSD canvas-click', obj);

  React.useEffect(() => {
    if (!viewer) return;
    viewer.setMouseNavEnabled(activeStampRef ? false : true);
    viewer.outerTracker.setTracking(activeStampRef ? false : true);
    viewer.addHandler('canvas-click', onOsdClick);

    return () => viewer.removeHandler('canvas-click', onOsdClick);
  }, [activeStampRef, viewer]);

  React.useEffect(() => {
    if (!fabricOverlay) return;
    const canvas = fabricOverlay.fabricCanvas();

    canvas.on('touch:drag', () => setFoo('YO'));

    // MOUSE DOWN
    canvas.on('mouse:down', evt => {
      console.log('Wrapper MOUSE DOWN', activeStampRef, evt);
      console.log('viewer.isMouseNavEnabled', viewer.isMouseNavEnabled());
      // viewer.setMouseNavEnabled(false);
      // viewer.outerTracker.setTracking(false);

      if (activeStampRef && !evt.target) {
        const { x, y } = evt.absolutePointer;
        const imgInstance = new fabric.Image(activeStampRef.current, {
          left: x,
          top: y,
        });
        fabricOverlay.fabricCanvas().add(imgInstance);
      }
    });

    // MOUSE UP
    canvas.on('mouse:up', evt => {
      console.log('Wrapper MOUSE UP', activeStampRef, evt);
      viewer.setMouseNavEnabled(true);
      viewer.outerTracker.setTracking(true);
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
      <Text fontSize="xl">Stamp Prototype: {foo}</Text>
      <StampLibraryOfCongress handleStampClick={handleStampClick} />
    </Box>
  );
}
