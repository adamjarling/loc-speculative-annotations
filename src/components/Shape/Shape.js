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
import {
  fabricCalcArrowAngle,
  starPolygonPoints,
} from 'services/fabric-helpers';

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
      let pointer = canvas.getPointer(options.e);
      let origX = pointer.x;
      let origY = pointer.y;

      // Create new Shape instance
      let newShape = null;
      const shapeOptions = {
        color: myStateRef.current.color.hex,
        left: origX,
        top: origY,
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
            [pointer.x, pointer.y, pointer.x, pointer.y],
            {
              fill: shapeOptions.color,
              originX: 'center',
              originY: 'center',
              stroke: shapeOptions.color,
              strokeWidth: 10,
            }
          );
          fabricOverlay.fabricCanvas().add(newShape);
          break;

        /**
         * Arrow
         */
        case 'arrow':
          newShape = {};
          newShape.arrowBody = new fabric.Line(
            [pointer.x, pointer.y, pointer.x, pointer.y],
            {
              fill: shapeOptions.color,
              originX: 'center',
              originY: 'center',
              stroke: shapeOptions.color,
              strokeWidth: 10,
            }
          );
          let centerX = (newShape.arrowBody.x1 + newShape.arrowBody.x2) / 2;
          let centerY = (newShape.arrowBody.y1 + newShape.arrowBody.y2) / 2;
          let deltaX = newShape.arrowBody.left - centerX;
          let deltaY = newShape.arrowBody.top - centerY;

          newShape.arrowHead = new fabric.Triangle({
            left: newShape.arrowBody.get('x1') + deltaX,
            top: newShape.arrowBody.get('y1') + deltaY,
            originX: 'center',
            originY: 'center',
            selectable: false,
            pointType: 'arrow_start',
            angle: -45,
            width: 40,
            height: 40,
            fill: shapeOptions.color,
          });
          newShape.deltas = {
            deltaX,
            deltaY,
          };
          fabricOverlay
            .fabricCanvas()
            .add(newShape.arrowBody, newShape.arrowHead);
          break;

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

        /**
         * Triangle
         */
        case 'triangle':
          newShape = new fabric.Triangle({
            ...shapeOptions,
            ...fillProps,
          });
          fabricOverlay.fabricCanvas().add(newShape);
          break;

        /**
         * Star
         */
        case 'star':
          let points = starPolygonPoints(5, 50, 25);
          newShape = new fabric.Polygon(points, {
            ...shapeOptions,
            ...fillProps,
          });
          fabricOverlay.fabricCanvas().add(newShape);
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
      //newShape && fabricOverlay.fabricCanvas().add(newShape);
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
      const c = myStateRef.current;

      // Dynamically drag size element to the canvas
      const pointer = fabricOverlay.fabricCanvas().getPointer(options.e);

      if (['square', 'star', 'triangle'].indexOf(c.activeShape.name) > -1) {
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
      } else if (c.activeShape.name === 'line') {
        /**
         * Line
         */
        c.currentDragShape.set({
          x2: pointer.x,
          y2: pointer.y,
        });
      } else if (c.activeShape.name === 'arrow') {
        /**
         * Arrow
         */
        // TODO: Either wire this up or use a polygon arrow?
        let { arrowBody, arrowHead, deltas } = c.currentDragShape;
        arrowBody.set({
          x2: pointer.x,
          y2: pointer.y,
        });
        arrowHead.set({
          left: pointer.x + deltas.deltaX,
          top: pointer.y + deltas.deltaY,
          angle: fabricCalcArrowAngle(
            arrowBody.x1,
            arrowBody.y1,
            arrowBody.x2,
            arrowBody.y2
          ),
        });
      }

      fabricOverlay.fabricCanvas().renderAll();
    }

    function handleMouseUp(options) {
      if (
        !myStateRef.current.isActive ||
        !myStateRef.current.currentDragShape
      ) {
        return;
      }

      // Make newly created object "active"
      if (myStateRef.current.activeShape.name === 'arrow') {
        // Handle an arrow differently since it's composed of
        // 2 different shape objects
        const { arrowBody, arrowHead } = myStateRef.current.currentDragShape;
        let group = new fabric.Group([arrowBody, arrowHead]);
        fabricOverlay.fabricCanvas().remove([arrowBody, arrowHead]);
        fabricOverlay.fabricCanvas().add(group);
        fabricOverlay.fabricCanvas().setActiveObject(group);
      } else {
        // All other shapes
        fabricOverlay
          .fabricCanvas()
          .setActiveObject(myStateRef.current.currentDragShape);
      }

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
