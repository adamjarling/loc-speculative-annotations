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
  console.log('color', color);

  const [myState, _setMyState] = React.useState({
    activeShape: null, // active shape in Options Panel
    isFill: false, // fill or outline style?
    isActive, // Is the Shape tool itself active
    isSelectedOnCanvas: false, // Is a shape on canvas selected
  });
  const myStateRef = React.useRef(myState);
  const setMyState = data => {
    myStateRef.current = data;
    _setMyState(data);
  };

  /**
   * Handle color change
   */
  React.useEffect(() => {
    console.log('useEffect', color);
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

  React.useEffect(() => {
    if (!fabricOverlay) return;
    const canvas = fabricOverlay.fabricCanvas();
    console.log('useEffect');

    function handleMouseDown(options) {
      if (options.target || !myStateRef.current.activeShape) {
        return;
      }

      // Create new Shape instance
      let newShape;
      const shapeOptions = {
        color: myStateRef.current.color.hex,
        left: options.absolutePointer.x,
        top: options.absolutePointer.y,
      };
      const isFill = myStateRef.current.isFill;
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
            width: OBJECT_SIZE,
            height: OBJECT_SIZE,
            fill: isFill ? shapeOptions.color : 'rgba(0,0,0,0)',
            stroke: !isFill ? shapeOptions.color : false,
            strokeWidth: !isFill ? 10 : 0,
          });
          break;

        /**
         * Circle
         */
        case 'circle':
          newShape = new fabric.Circle({
            ...shapeOptions,
            radius: OBJECT_SIZE / 2,
            fill: shapeOptions.color,
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
            fill: shapeOptions.color,
          });
          break;

        /**
         * Star
         */
        case 'star':
          let points = starPolygonPoints(5, 150, 75);
          newShape = new fabric.Polygon(points, {
            ...shapeOptions,
            fill: 'rgba(0,0,0,0)',
            stroke: shapeOptions.color,
            strokeWidth: 10,
          });
          break;
        default:
          break;
      }

      // Add new shape to the canvas
      newShape && fabricOverlay.fabricCanvas().add(newShape);

      // De-activate currently selected shape
      setMyState({ ...myStateRef.current, activeShape: null });
    }

    function handleSelectionCleared(options) {
      if (!myStateRef.current.isSelectedOnCanvas) return;

      setMyState({
        ...myState,
        isSelectedOnCanvas: false,
      });
    }

    function handleSelected(options) {
      const optionsTargetType = options.target.get('type');
      if (
        !FABRIC_SHAPE_TYPES.find(shapeType => shapeType === optionsTargetType)
      )
        return;

      const canvas = fabricOverlay.fabricCanvas();
      const activeObject = canvas.getActiveObject();

      setMyState({
        ...myState,
        isSelectedOnCanvas: true,
      });
    }

    // Add click handlers
    canvas.on('mouse:down', handleMouseDown);
    canvas.on('selection:created', handleSelected);
    canvas.on('selection:updated', handleSelected);
    canvas.on('selection:cleared', handleSelectionCleared);

    // Remove handler
    return function clearFabricEventHandlers() {
      canvas.off('mouse:down', handleMouseDown);
      canvas.off('selection:created', handleSelected);
      canvas.off('selection:updated', handleSelected);
      canvas.off('selection:cleared', handleSelectionCleared);
    };
  }, [fabricOverlay]);

  const handleFillSelect = value => {
    console.log('value', value);
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
