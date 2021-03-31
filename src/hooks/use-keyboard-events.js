import React from 'react';
import { useFabricOverlayState } from 'context/fabric-overlay-context';
import useFabricHelpers from 'hooks/use-fabric-helpers';
const Mousetrap = require('mousetrap');

// Distance value when moving a selected item
const STEP = 10;

// https://stackoverflow.com/questions/44320104/fabricjs-how-to-move-the-selected-object-by-keyboard
export default function useKeyboardEvents() {
  const { fabricOverlay } = useFabricOverlayState();

  React.useEffect(() => {
    if (!fabricOverlay) return;
    const canvas = fabricOverlay.fabricCanvas();

    /**
     * Helper function to handle arrow keyboard events
     * @param {String} direction Move direction ["LEFT", "TOP", "RIGHT", "DOWN"]
     * @returns void
     */
    function moveSelected(direction) {
      const activeObject = canvas.getActiveObject();
      //const activeGroup = canvas.getActiveGroup();
      let activeGroup;
      if (!activeObject) return;

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

    /**
     * Handle keyboard events
     */

    /**
     * Undo and Redo
     */
    Mousetrap.bind(['command+z', 'ctrl+z', 'alt+backspace'], function () {
      console.log('undo');
      canvas.undo();
    });

    /**
     * Redo
     */
    Mousetrap.bind(['command+shift+z', 'ctrl+y', 'ctrl+shift+z'], function () {
      console.log('redo');
      canvas.redo();
    });

    /**
     * Move left
     */
    Mousetrap.bind(['left'], function () {
      moveSelected('LEFT');
    });

    /**
     * Move up
     */
    Mousetrap.bind(['up'], function () {
      moveSelected('UP');
    });

    /**
     * Move right
     */
    Mousetrap.bind(['right'], function () {
      moveSelected('RIGHT');
    });

    /**
     * Move down
     */
    Mousetrap.bind(['down'], function () {
      moveSelected('DOWN');
    });

    /**
     * Delete
     */
    Mousetrap.bind(['backspace', 'del'], function () {
      const activeObject = canvas.getActiveObject();
      // Object has children (ie. arrow has children objects triangle and line)
      if (activeObject.getObjects) {
        let objs = activeObject.getObjects();
        for (let i in objs) {
          canvas.remove(objs[i]);
        }
      }
      canvas.remove(activeObject);
    });
  }, [fabricOverlay]);
}
