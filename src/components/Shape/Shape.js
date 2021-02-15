import React from 'react';
import PropTypes from 'prop-types';
import ToolbarButton from 'components/Toolbar/Button';
import ToolbarOptionsPanel from 'components/Toolbar/OptionsPanel';
import { FaShapes } from 'react-icons/fa';
import { fabric } from 'openseadragon-fabricjs-overlay';
import {
  useFabricOverlayDispatch,
  useFabricOverlayState,
} from 'context/fabric-overlay-context';
import ShapePicker from 'components/Shape/Picker';
import OptionsBar from 'components/OptionsBar/OptionsBar';
import { starPolygonPoints } from 'services/fabric-helpers';

// Default size for height / width for new shapes
const OBJECT_SIZE = 200;
const FABRIC_SHAPE_TYPES = [
  'circle',
  'group',
  'line',
  'polygon',
  'rect',
  'triangle',
];

function Shape({ isActive }) {
  const dispatch = useFabricOverlayDispatch();
  const { color, fabricOverlay, viewer } = useFabricOverlayState();

  const [myState, _setMyState] = React.useState({
    activeShape: null, // active shape in Options Panel
    currentDragShape: null,
    isActive, // Is the Shape tool itself active
    isFill: true, // fill or outline style?
    isMouseDown: false,
    isSelectedOnCanvas: false, // Is a shape on canvas selected,
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
    setMyState({ ...myState, isActive });
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
    const canvas = fabricOverlay.fabricCanvas();

    console.log('useEffect() myState.activeShape', myState.activeShape);

    if (myState.activeShape) {
      // Disable OSD mouseclicks
      viewer.setMouseNavEnabled(false);
      viewer.outerTracker.setTracking(false);

      // Deselect all Fabric Canvas objects
      canvas.discardActiveObject();
      canvas.requestRenderAll();
    } else {
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

    function handleMouseDown(options) {
      if (
        options.target ||
        !myStateRef.current.activeShape ||
        !myStateRef.current.isActive
      ) {
        return;
      }

      // Save starting mouse down coordinates
      //let pointer = canvas.getPointer(options.e);
      console.log('options', options);
      let origX = options.absolutePointer.x;
      let origY = options.absolutePointer.y;

      // Create new Shape instance
      let newShape;
      const shapeOptions = {
        color: myStateRef.current.color.hex,
        left: origX,
        top: origY,
        originX: 'left',
        originY: 'top',
        width: 0,
        height: 0,
      };

      // Solid fill or stroke?
      let fillProps = myStateRef.current.isFill
        ? {
            fill: shapeOptions.color,
          }
        : {
            fill: 'rgba(0,0,0,0)',
            stroke: shapeOptions.color,
            strokeWidth: 10,
          };

      // Shape options
      switch (myStateRef.current.activeShape.name) {
        /**
         * Line
         */
        case 'line':
          newShape = new fabric.Line(
            [
              shapeOptions.left,
              shapeOptions.top,
              shapeOptions.left + OBJECT_SIZE,
              shapeOptions.top - OBJECT_SIZE,
            ],
            {
              fill: shapeOptions.color,
              stroke: shapeOptions.color,
              strokeWidth: 10,
            }
          );
          break;

        /**
         * Arrow
         */
        case 'arrow':
          const arrowLength = shapeOptions.left + OBJECT_SIZE * 1.25;
          const arrowHeadLength = 50;
          const arrowBody = new fabric.Line(
            [
              shapeOptions.left,
              shapeOptions.top,
              arrowLength,
              shapeOptions.top,
            ],
            {
              stroke: shapeOptions.color,
              strokeWidth: 20,
            }
          );
          const arrowHead = new fabric.Triangle({
            width: arrowHeadLength,
            height: 80,
            fill: shapeOptions.color,
            left: arrowLength + arrowHeadLength,
            top: shapeOptions.top - 15,
            angle: 90,
          });

          const objs = [arrowBody, arrowHead];
          newShape = new fabric.Group(objs);
          break;

        /**
         * Square
         */
        case 'square':
          newShape = new fabric.Rect({
            ...shapeOptions,
            ...fillProps,
          });
          break;

        /**
         * Circle
         */
        case 'circle':
          newShape = new fabric.Circle({
            ...shapeOptions,
            radius: OBJECT_SIZE / 2,
            ...fillProps,
          });
          break;

        /**
         * Triangle
         */
        case 'triangle':
          newShape = new fabric.Triangle({
            ...shapeOptions,
            width: OBJECT_SIZE,
            height: OBJECT_SIZE,
            ...fillProps,
          });
          break;

        /**
         * Star
         */
        case 'star':
          let points = starPolygonPoints(5, 150, 75);
          newShape = new fabric.Polygon(points, {
            ...shapeOptions,
            ...fillProps,
          });
          break;
        default:
          break;
      }

      setMyState({
        ...myStateRef.current,
        currentDragShape: newShape,
        isMouseDown: true,
        origX,
        origY,
      });

      // Add new shape to the canvas
      newShape && fabricOverlay.fabricCanvas().add(newShape);
    }

    function handleMouseMove(options) {
      if (
        options.target ||
        !myStateRef.current.activeShape ||
        !myStateRef.current.isActive ||
        !myStateRef.current.currentDragShape
      ) {
        return;
      }
      console.log('handleMouseMove() myStateRef.current', myStateRef.current);

      // Dynamically drag size element to the canvas
      const pointer = fabricOverlay.fabricCanvas().getPointer(options.e);
      if (myStateRef.current.origX > pointer.x) {
        myStateRef.current.currentDragShape.set({ left: Math.abs(pointer.x) });
      }
      if (myStateRef.current.origY > pointer.y) {
        myStateRef.current.currentDragShape.set({ top: Math.abs(pointer.y) });
      }
      myStateRef.current.currentDragShape.set({
        width: Math.abs(myStateRef.current.origX - pointer.x),
      });
      myStateRef.current.currentDragShape.set({
        height: Math.abs(myStateRef.current.origY - pointer.y),
      });
      fabricOverlay.fabricCanvas().renderAll();
    }

    function handleMouseUp(options) {
      console.log('myStateRef.current', myStateRef.current);
      if (
        !myStateRef.current.isActive ||
        !myStateRef.current.currentDragShape
      ) {
        return;
      }

      // Make newly created object "active"
      fabricOverlay
        .fabricCanvas()
        .setActiveObject(myStateRef.current.currentDragShape);
      fabricOverlay.fabricCanvas().renderAll();

      setMyState({
        ...myStateRef.current,
        currentDragShape: null,
      });
    }

    function handleSelectionCleared(options) {
      if (
        !myStateRef.current.isActive ||
        !myStateRef.current.isSelectedOnCanvas
      )
        return;

      setMyState({
        ...myStateRef.current,
        isSelectedOnCanvas: false,
      });
    }

    function handleSelected(options) {
      if (!myStateRef.current.isActive) return;
      console.log('handleSelected');

      // Filter out any non-shape selections
      const optionsTargetType = options.target.get('type');
      if (
        !FABRIC_SHAPE_TYPES.find(shapeType => shapeType === optionsTargetType)
      )
        return;

      setMyState({
        ...myStateRef.current,
        isSelectedOnCanvas: true,
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

  const handleFillSelect = value => {
    setMyState({ ...myState, isFill: value });
  };

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
        icon={<FaShapes />}
        isActive={isActive}
        label="Shape"
      />
      {isActive && (
        <ToolbarOptionsPanel>
          <ShapePicker
            activeShape={myState.activeShape}
            color={color}
            handleFillSelect={handleFillSelect}
            handleShapeSelect={handleShapeSelect}
            isFill={myState.isFill}
          />
        </ToolbarOptionsPanel>
      )}
      {/* {myState.isSelectedOnCanvas && (
        <OptionsBar left={175}>
          Options for selected shape object go here
        </OptionsBar>
      )} */}
    </>
  );
}

Shape.propTypes = { isActive: PropTypes.bool };

export default Shape;
