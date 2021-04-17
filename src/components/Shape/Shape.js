import React from 'react';
import PropTypes from 'prop-types';
import ToolbarButton from 'components/Toolbar/Button';
import ToolbarOptionsPanel from 'components/Toolbar/OptionsPanel';
import { BsCircleSquare } from 'react-icons/bs';
import { fabric } from 'openseadragon-fabricjs-overlay';
import {
  useFabricOverlayDispatch,
  useFabricOverlayState,
} from 'context/fabric-overlay-context';
import ShapePicker from 'components/Shape/Picker';
import useFabricHelpers from 'hooks/use-fabric-helpers';

const FABRIC_SHAPE_TYPES = ['circle', 'rect'];

function Shape({ isActive }) {
  const dispatch = useFabricOverlayDispatch();
  const { color, fabricOverlay, viewer } = useFabricOverlayState();
  const { deselectAll, setDefaultCursor, updateCursor } = useFabricHelpers();

  const [myState, _setMyState] = React.useState({
    activeShape: null, // active shape in Options Panel
    color,
    currentDragShape: null,
    isActive, // Is the Shape tool itself active
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
   * Handle primary tool change
   */
  React.useEffect(() => {
    setMyState({ ...myState, activeShape: null, isActive });
    updateCursor();
  }, [isActive]);

  /**
   * Handle color change
   */
  React.useEffect(() => {
    setMyState({ ...myState, color });
  }, [color.hex]);

  /**
   * Handle an individual shape being selected
   */
  React.useEffect(() => {
    if (!fabricOverlay) return;

    if (myState.activeShape) {
      setDefaultCursor('crosshair');

      // Disable OSD mouseclicks
      viewer.setMouseNavEnabled(false);
      viewer.outerTracker.setTracking(false);

      // Deselect all Fabric Canvas objects
      deselectAll();
    } else {
      updateCursor();

      // Enable OSD mouseclicks
      viewer.setMouseNavEnabled(true);
      viewer.outerTracker.setTracking(true);
    }
  }, [myState.activeShape]);

  /**
   * Add shapes and handle mouse events
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
        !myStateRef.current.activeShape ||
        !myStateRef.current.isActive
      ) {
        return;
      }

      // Save starting mouse down coordinates
      let pointer = canvas.getPointer(options.e);
      let origX = pointer.x;
      let origY = pointer.y;

      // Create new Shape instance
      let newShape = null;
      const shapeOptions = {
        color: myStateRef.current.color.hex,
        perPixelTargetFind: true,
        left: origX,
        top: origY,
        width: 0,
        height: 0,
      };

      // Stroke fill
      let fillProps = {
        fill: 'rgba(0,0,0,0)',
        stroke: shapeOptions.color,
        strokeWidth: 10,
      };

      // Shape options
      switch (myStateRef.current.activeShape.name) {
        /**
         * Square
         */
        case 'square':
          newShape = new fabric.Rect({
            ...shapeOptions,
            ...fillProps,
            width: pointer.x - origX,
            height: pointer.y - origY,
          });
          fabricOverlay.fabricCanvas().add(newShape);
          break;

        /**
         * Circle
         */
        case 'circle':
          newShape = new fabric.Ellipse({
            ...shapeOptions,
            ...fillProps,
            originX: 'left',
            originY: 'top',
            rx: pointer.x - origX,
            ry: pointer.y - origY,
            angle: 0,
          });
          fabricOverlay.fabricCanvas().add(newShape);
          break;

        default:
          break;
      }

      canvas.setActiveObject(newShape);

      setMyState({
        ...myStateRef.current,
        currentDragShape: newShape,
        isMouseDown: true,
        origX,
        origY,
      });
    }

    /**
     * Mouse move
     */
    function handleMouseMove(options) {
      if (
        //options.target ||
        !myStateRef.current.activeShape ||
        !myStateRef.current.isActive ||
        !myStateRef.current.currentDragShape
      ) {
        return;
      }
      const c = myStateRef.current;

      // Dynamically drag size element to the canvas
      const pointer = fabricOverlay.fabricCanvas().getPointer(options.e);

      if (['square'].indexOf(c.activeShape.name) > -1) {
        /**
         * Rectangle or Triangle
         */
        if (c.origX > pointer.x) {
          c.currentDragShape.set({
            left: Math.abs(pointer.x),
          });
        }
        if (c.origY > pointer.y) {
          c.currentDragShape.set({ top: Math.abs(pointer.y) });
        }
        c.currentDragShape.set({
          width: Math.abs(c.origX - pointer.x),
          height: Math.abs(c.origY - pointer.y),
        });
      } else if (c.activeShape.name === 'circle') {
        /**
         * Ellipse (circle)
         */
        let rx = Math.abs(c.origX - pointer.x) / 2;
        let ry = Math.abs(c.origY - pointer.y) / 2;
        if (rx > c.currentDragShape.strokeWidth) {
          rx -= c.currentDragShape.strokeWidth / 2;
        }
        if (ry > c.currentDragShape.strokeWidth) {
          ry -= c.currentDragShape.strokeWidth / 2;
        }
        c.currentDragShape.set({ rx, ry });

        if (c.origX > pointer.x) {
          c.currentDragShape.set({ originX: 'right' });
        } else {
          c.currentDragShape.set({ originX: 'left' });
        }
        if (c.origY > pointer.y) {
          c.currentDragShape.set({ originY: 'bottom' });
        } else {
          c.currentDragShape.set({ originY: 'top' });
        }
      }

      fabricOverlay.fabricCanvas().renderAll();
    }

    /**
     * Mouse up
     */
    function handleMouseUp(options) {
      if (
        !myStateRef.current.isActive ||
        !myStateRef.current.currentDragShape
      ) {
        return;
      }

      // Render a minimum height in case the new shape hasn't been drag-sized yet
      if (myStateRef.current.currentDragShape.width < 10) {
        const setProps =
          options.target.type === 'ellipse'
            ? { rx: 100, ry: 100 }
            : { height: 100, width: 100 };
        myStateRef.current.currentDragShape.set(setProps);
        fabricOverlay.fabricCanvas().renderAll();
      }

      setMyState({
        ...myStateRef.current,
        currentDragShape: null,
        isMouseDown: false,
      });
    }

    function handleSelectionCleared(options) {
      if (!myStateRef.current.isActive) return;

      setMyState({
        ...myStateRef.current,
      });
    }

    function handleSelected(options) {
      if (!myStateRef.current.isActive) return;

      // Filter out any non-shape selections
      const optionsTargetType = options.target.get('type');
      if (
        !FABRIC_SHAPE_TYPES.find(shapeType => shapeType === optionsTargetType)
      )
        return;

      setMyState({
        ...myStateRef.current,
      });
    }

    // Add click handlers
    canvas.on('mouse:down', handleMouseDown);
    canvas.on('mouse:move', handleMouseMove);
    canvas.on('mouse:up', handleMouseUp);
    canvas.on('selection:created', handleSelected);
    canvas.on('selection:updated', handleSelected);
    canvas.on('selection:cleared', handleSelectionCleared);

    // Remove handler
    return function clearFabricEventHandlers() {
      canvas.off('mouse:down', handleMouseDown);
      canvas.off('mouse:move', handleMouseMove);
      canvas.off('mouse:up', handleMouseUp);
      canvas.off('selection:created', handleSelected);
      canvas.off('selection:updated', handleSelected);
      canvas.off('selection:cleared', handleSelectionCleared);
    };
  }, [fabricOverlay]);

  const handleShapeSelect = shape => {
    setMyState({ ...myState, activeShape: shape });
  };

  const handleToolbarClick = () => {
    dispatch({ type: 'updateTool', tool: isActive ? '' : 'SHAPE' });
  };

  return (
    <>
      <ToolbarButton
        onClick={handleToolbarClick}
        icon={<BsCircleSquare />}
        isActive={isActive}
        label="Shape"
      />
      {isActive && (
        <ToolbarOptionsPanel>
          <ShapePicker
            activeShape={myState.activeShape}
            color={color}
            handleShapeSelect={handleShapeSelect}
          />
        </ToolbarOptionsPanel>
      )}
    </>
  );
}

Shape.propTypes = { isActive: PropTypes.bool };

export default Shape;
