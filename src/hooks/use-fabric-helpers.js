import React from 'react';
import { useFabricOverlayState } from 'context/fabric-overlay-context';

export default function useCanvasHelpers() {
  const { fabricOverlay } = useFabricOverlayState();
  const [canvas, setCanvas] = React.useState();

  React.useEffect(() => {
    if (!fabricOverlay) return;
    setCanvas(fabricOverlay.fabricCanvas());
  }, [fabricOverlay]);

  /**
   * Remove all Fabric canvas objects
   * @returns void
   */
  const clearCanvas = () => {
    if (!canvas) return;
    canvas.clear();
  };

  /**
   * Remove all user objects from canvas
   * @returns void
   */
  const clearUserObjects = () => {
    if (!canvas) return;
    const userObjects = getUserObjects();
    for (let i in userObjects) {
      canvas.remove(userObjects[i]);
    }
  };

  /**
   * Deselect all Fabric canvas objects
   * @returns void
   */
  const deselectAll = () => {
    if (!canvas) return;

    canvas.discardActiveObject();
    canvas.requestRenderAll();
  };

  /**
   * Get all non-selectable objects
   * @returns {Array}
   */
  const getNonSelectableObjects = () => {
    if (!canvas) return;
    const objects = canvas.getObjects();
    const nonSelectableObjects = objects.filter(
      obj => obj.selectable === false
    );
    return nonSelectableObjects;
  };

  /**
   * Get all user added objects
   * @returns {Array}
   */
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

  /**
   * Remove an array of Fabric canvas objects
   * @param {Array} objects Fabric JS objects
   * @returns void
   */
  const removeObjectsFromCanvas = (objects = []) => {
    if (!canvas) return;
    objects.forEach(obj => canvas.remove(obj));
  };

  const setDefaultCursor = (defaultCursor = 'auto') => {
    if (!canvas) return;
    canvas.defaultCursor = defaultCursor;
  };

  const setHoverCursor = (hoverCursor = 'move') => {
    if (!canvas) return;
    canvas.hoverCursor = hoverCursor;
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
    getNonSelectableObjects,
    getUserObjects,
    makeObjectsInvisible,
    makeObjectsVisible,
    removeObjectsFromCanvas,
    setDefaultCursor,
    setHoverCursor,
    updateCursor,
  };
}
