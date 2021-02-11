import React from 'react';
import { useFabricOverlayState } from 'context/fabric-overlay-context';

export default function useKeyboardEvents() {
  const { fabricOverlay } = useFabricOverlayState();

  function handleEvent(e) {
    if (e.repeat) {
      return;
    }
    var key = e.which || e.keyCode; // key detection
    if (key === 37) {
      // handle Left key
      //moveSelected(Direction.LEFT);
    } else if (key === 38) {
      // handle Up key
      //moveSelected(Direction.UP);
    } else if (key === 39) {
      // handle Right key
      // moveSelected(Direction.RIGHT);
    } else if (key === 40) {
      // handle Down key
      //moveSelected(Direction.DOWN);
    } else if (key === 8 || key === 46) {
      const activeObject = fabricOverlay.fabricCanvas().getActiveObject();
      fabricOverlay.fabricCanvas().remove(activeObject);
    }
  }

  return { handleEvent };
}
