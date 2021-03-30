import { useFabricOverlayState } from 'context/fabric-overlay-context';

// https://stackoverflow.com/questions/44320104/fabricjs-how-to-move-the-selected-object-by-keyboard
export default function useKeyboardEvents() {
  const { fabricOverlay } = useFabricOverlayState();

  function handleEvent(e) {
    if (e.repeat) {
      return;
    }

    var key = e.key;
    const canvas = fabricOverlay.fabricCanvas();
    const activeObject = canvas.getActiveObject();
    //const activeGroup = canvas.getActiveGroup();
    let activeGroup;
    if (!activeObject) return;

    const STEP = 10;

    function moveSelected(direction) {
      if (activeObject) {
        switch (direction) {
          case 'LEFT':
            activeObject.left = activeObject.left - STEP;
            break;
          case 'UP':
            activeObject.top = activeObject.top - STEP;
            break;
          case 'RIGHT':
            activeObject.left = activeObject.left + STEP;
            break;
          case 'DOWN':
            activeObject.top = activeObject.top + STEP;
            break;
          default:
            break;
        }
        activeObject.setCoords();
        canvas.renderAll();
      }
      // TODO: Wire this up if we actually need it?
      else if (activeGroup) {
        switch (direction) {
          case direction.LEFT:
            activeGroup.left = activeGroup.left - STEP;
            break;
          case direction.UP:
            activeGroup.top = activeGroup.top - STEP;
            break;
          case direction.RIGHT:
            activeGroup.left = activeGroup.left + STEP;
            break;
          case direction.DOWN:
            activeGroup.top = activeGroup.top + STEP;
            break;
          default:
            break;
        }
        activeGroup.setCoords();
        canvas.renderAll();
        console.log('selected group was moved');
      } else {
        console.log('no object selected');
      }
    }

    if (key === 'ArrowLeft') {
      // handle Left key
      moveSelected('LEFT');
    } else if (key === 'ArrowUp') {
      // handle Up key
      moveSelected('UP');
    } else if (key === 'ArrowRight') {
      // handle Right key
      moveSelected('RIGHT');
    } else if (key === 'ArrowDown') {
      // handle Down key
      moveSelected('DOWN');
    } else if (key === 'Backspace' || key === 'Clear') {
      // Handle Delete key
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
