import React from 'react';
import { useFabricOverlayState } from 'context/fabric-overlay-context';
import { act } from '@testing-library/react';

export default function useKeyboardEvents() {
  const { fabricOverlay } = useFabricOverlayState();

  function handleEvent(e) {
    if (e.repeat) {
      return;
    }
    var key = e.which || e.keyCode;
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
      const canvas = fabricOverlay.fabricCanvas();
      const activeObject = canvas.getActiveObject();

      // Object has children (ie. arrow has children objects triangle and line)
      if (activeObject.getObjects) {
        let objs = activeObject.getObjects();
        for (let i in objs) {
          canvas.remove(objs[i]);
        }
      }
      canvas.remove(activeObject);
    }
  }

  return { handleEvent };
}
