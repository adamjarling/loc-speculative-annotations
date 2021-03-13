import React from 'react';
import { useFabricOverlayState } from 'context/fabric-overlay-context';

export default function useCanvasHelpers() {
  const { activeTool, fabricOverlay } = useFabricOverlayState();
  const [canvas, setCanvas] = React.useState();

  React.useEffect(() => {
    if (!fabricOverlay) return;
    setCanvas(fabricOverlay.fabricCanvas());
  }, [fabricOverlay]);

  // Deselect all Fabric canvas objects
  const deselectAll = () => {
    if (!canvas) return;

    canvas.discardActiveObject();
    canvas.requestRenderAll();
  };

  const updateCursor = () => {
    if (!canvas) return;

    canvas.defaultCursor = 'auto';
    canvas.hoverCursor = 'move';
  };

  return {
    deselectAll,
    updateCursor,
  };
}
