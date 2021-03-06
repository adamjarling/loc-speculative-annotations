import React from 'react';
import PropTypes from 'prop-types';
import { GiStamper } from 'react-icons/gi';
import { fabric } from '@adamjarling/openseadragon-fabricjs-overlay';
import ToolbarButton from 'components/Toolbar/Button';
import ToolbarOptionsPanel from 'components/Toolbar/OptionsPanel';
import {
  useFabricOverlayDispatch,
  useFabricOverlayState,
} from 'context/fabric-overlay-context';
import StampPicker from 'components/Stamp/Picker';
import useFabricHelpers from 'hooks/use-fabric-helpers';
import { useToolbarOptionsState } from 'context/toolbar-options-context';

function Stamp({ isActive }) {
  const { fabricOverlay, viewer } = useFabricOverlayState();
  const { color } = useToolbarOptionsState();
  const dispatch = useFabricOverlayDispatch();
  const { deselectAll, setDefaultCursor } = useFabricHelpers();

  const [myState, _setMyState] = React.useState({
    activeStamp: null,
    color,
    currentDragShape: null,
    isActive, // Is the Stamp tool itself active
    isMouseDown: false,
    origX: null, // starting X point for drag creating an object
    origY: null, // starting Y point for drag creating an object
  });
  const myStateRef = React.useRef(myState);
  const setMyState = data => {
    myStateRef.current = data;
    _setMyState(data);
  };

  /**
   * Handle state change for active toolbar, and color change
   */
  React.useEffect(() => {
    if (!fabricOverlay) return;
    setMyState({ ...myState, color, isActive });

    // Leaving Stamp tool, re-enable OSD interactions
    if (!isActive) {
      setDefaultCursor('auto');

      // Enable OSD mouseclicks
      viewer.setMouseNavEnabled(true);
      viewer.outerTracker.setTracking(true);
    }
  }, [color, isActive]);

  /**
   * Handle an individual stamp being selected
   */
  React.useEffect(() => {
    if (!fabricOverlay) return;
    const canvas = fabricOverlay.fabricCanvas();

    if (myState.activeStamp) {
      canvas.defaultCursor = 'crosshair';

      // Disable OSD mouseclicks
      viewer.setMouseNavEnabled(false);
      viewer.outerTracker.setTracking(false);

      // Deselect all Fabric Canvas objects
      deselectAll();
    }
  }, [myState.activeStamp]);

  /**
   * Add stamp object and handle mouse events
   */
  React.useEffect(() => {
    if (!fabricOverlay) return;
    const canvas = fabricOverlay.fabricCanvas();

    /**
     * Mouse down
     */
    function handleMouseDown(options) {
      if (
        options.target ||
        !myStateRef.current.activeStamp ||
        !myStateRef.current.isActive ||
        // Block the extra touchstart event fired for touch devices
        options.e.type === 'touchstart'
      ) {
        return;
      }

      // Save starting mouse down coordinates
      let pointer = canvas.getPointer(options.e);
      let origX = pointer.x;
      let origY = pointer.y;

      // REMEMBER: SVG elements don't support the "width" and "height" properties directly
      // Must use scaleToWidth() and scaleToHeight() FabricJS methods
      const shapeOptions = {
        left: origX,
        top: origY,
      };

      let shape = null;

      fabric.loadSVGFromURL(
        myStateRef.current.activeStamp.src,
        function (objects, options) {
          shape = fabric.util.groupSVGElements(objects, options);

          if (shape.type === 'group') {
            // The SVG file has multiple objects
            const shapeObjects = shape.getObjects();
            shapeObjects.forEach(
              (obj, i) => (shape.item(i).fill = myStateRef.current.color.hex)
            );
            shape.addWithUpdate();
          } else {
            // SVG file only has one solid object
            shape.fill = myStateRef.current.color.hex;
          }

          shape.set(shapeOptions);
          shape.scaleToWidth(50);
          //shape.scaleToHeight(100);
          canvas.add(shape).setActiveObject(shape).renderAll();

          setMyState({
            ...myStateRef.current,
            currentDragShape: shape,
            isMouseDown: true,
            origX,
            origY,
          });
        }
      );
    }

    /**
     * Mouse move
     */
    function handleMouseMove(options) {
      if (
        //options.target ||
        !myStateRef.current.activeStamp ||
        !myStateRef.current.isActive ||
        !myStateRef.current.currentDragShape ||
        !myStateRef.current.isMouseDown
      ) {
        return;
      }
      const c = myStateRef.current;

      // Dynamically drag size element to the canvas
      const pointer = fabricOverlay.fabricCanvas().getPointer(options.e);
      const width = Math.abs(c.origX - pointer.x);
      const height = Math.abs(c.origY - pointer.y);

      /**
       * Drag size
       */
      if (c.origX > pointer.x) {
        c.currentDragShape.set({
          left: Math.abs(pointer.x),
        });
      }
      if (c.origY > pointer.y) {
        c.currentDragShape.set({ top: Math.abs(pointer.y) });
      }
      c.currentDragShape.scaleToWidth(width);
      c.currentDragShape.scaleToHeight(height);

      fabricOverlay.fabricCanvas().renderAll();
    }

    /**
     * Mouse up
     */
    function handleMouseUp(options) {
      if (!myStateRef.current.isActive) {
        return;
      }

      setMyState({
        ...myStateRef.current,
        isMouseDown: false,
      });

      // NOTE: this setTimeout function is a patch to handle a timing condition in the compiled code
      // when a user clicks on the canvas (mousedown and immediate mouseup), instead dragging out the Stamp size.
      // The mouseup event was firing before Fabric's loadSVGFromUrl callback function fired.
      // TODO: There is a better way to handle this eventually
      return setTimeout(() => {
        if (
          !myStateRef.current.isActive ||
          !myStateRef.current.currentDragShape
        ) {
          return;
        }

        setMyState({
          ...myStateRef.current,
          currentDragShape: null,
        });
      }, 100);
    }

    function handleSelectionCleared(options) {
      if (!myStateRef.current.isActive) return;

      setMyState({
        ...myStateRef.current,
      });
    }

    // Add click handlers
    canvas.on('mouse:down', handleMouseDown);
    canvas.on('mouse:move', handleMouseMove);
    canvas.on('mouse:up', handleMouseUp);
    canvas.on('selection:cleared', handleSelectionCleared);

    // Remove handler
    return function clearFabricEventHandlers() {
      canvas.off('mouse:down', handleMouseDown);
      canvas.off('mouse:move', handleMouseMove);
      canvas.off('mouse:up', handleMouseUp);
      canvas.off('selection:cleared', handleSelectionCleared);
    };
  }, [fabricOverlay]);

  const handleToolbarButtonClick = () => {
    dispatch({ type: 'updateTool', tool: isActive ? '' : 'STAMP' });
  };

  const handleStampChange = stampObj => {
    setMyState({ ...myState, activeStamp: stampObj });
  };

  return (
    <div>
      <ToolbarButton
        onClick={handleToolbarButtonClick}
        icon={<GiStamper />}
        isActive={isActive}
        label="Stamp"
        disabled={false}
        data-testid="stamp-control"
      />
      {isActive && (
        <ToolbarOptionsPanel data-testid="stamp-options-wrapper">
          <StampPicker
            activeStamp={myState.activeStamp}
            color={color}
            handleStampChange={handleStampChange}
          />
        </ToolbarOptionsPanel>
      )}
    </div>
  );
}

Stamp.propTypes = {
  activeTool: PropTypes.string,
};

export default Stamp;
