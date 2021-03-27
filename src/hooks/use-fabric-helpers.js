import React from 'react';
import { useFabricOverlayState } from 'context/fabric-overlay-context';

export default function useCanvasHelpers() {
  const { activeTool, fabricOverlay } = useFabricOverlayState();
  const [canvas, setCanvas] = React.useState();

  React.useEffect(() => {
    if (!fabricOverlay) return;
    setCanvas(fabricOverlay.fabricCanvas());
  }, [fabricOverlay]);

  // Remove all Fabric canvas objects
  const clearCanvas = () => {
    if (!canvas) return;
    canvas.clear();
  };

  const clearUserObjects = () => {
    if (!canvas) return;
    const userObjects = getUserObjects();
    for (let i in userObjects) {
      canvas.remove(userObjects[i]);
    }
  };

  // Deselect all Fabric canvas objects
  const deselectAll = () => {
    if (!canvas) return;

    canvas.discardActiveObject();
    canvas.requestRenderAll();
  };

  const getUserObjects = () => {
    if (!canvas) return;
    const objects = canvas.getObjects();
    const selectableObjects = objects.filter(obj => obj.selectable);
    return selectableObjects;
  };

  const makeObjectsInvisible = (fabricObjects = []) => {
    if (!canvas) return;

    for (let obj of fabricObjects) {
      obj.opacity = 0;
    }
    canvas.renderAll();
  };

  const makeObjectsVisible = (fabricObjects = []) => {
    for (let obj of fabricObjects) {
      obj.opacity = 1;
    }
    canvas.renderAll();
  };

  const updateCursor = () => {
    if (!canvas) return;

    canvas.defaultCursor = 'auto';
    canvas.hoverCursor = 'move';
  };

  return {
    clearCanvas,
    clearUserObjects,
    deselectAll,
    getUserObjects,
    makeObjectsInvisible,
    makeObjectsVisible,
    updateCursor,
  };
}
