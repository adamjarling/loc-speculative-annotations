import React from 'react';
import { useFabricOverlayState } from 'context/fabric-overlay-context';

export default function useCanvasHelpers() {
  const { fabricOverlay } = useFabricOverlayState();
  const [canvas, setCanvas] = React.useState();

  React.useEffect(() => {
    if (!fabricOverlay) return;
    setCanvas(fabricOverlay.fabricCanvas());
  }, [fabricOverlay]);

  const deselectAll = () => {
    if (!canvas) return;
    console.log('deselectAll');
    canvas.discardActiveObject();
    canvas.requestRenderAll();
  };

  return {
    deselectAll,
  };
}
