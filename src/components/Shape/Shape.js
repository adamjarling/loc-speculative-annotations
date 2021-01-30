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
import useRandomColor from 'hooks/use-random-color';

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
  const { fabricOverlay, viewer } = useFabricOverlayState();
  const { getRandomColor } = useRandomColor();

  const [myState, _setMyState] = React.useState({
    activeShape: null, // active shape in Options Panel
    isActive, // Is the Shape tool itself active
    isSelectedOnCanvas: false, // Is a shape on canvas selected
  });
  const myStateRef = React.useRef(myState);
  const setMyState = data => {
    myStateRef.current = data;
    _setMyState(data);
  };

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

    function handleMouseDown(options) {
      if (options.target || !myStateRef.current.activeShape) {
        return;
      }

      // Create new Shape instance
      let newShape;
      const shapeOptions = {
        left: options.absolutePointer.x,
        top: options.absolutePointer.y,
      };
      switch (myStateRef.current.activeShape.name) {
        case 'line':
          const lineColor = getRandomColor();
          newShape = new fabric.Line(
            [
              shapeOptions.left,
              shapeOptions.top,
              shapeOptions.left + OBJECT_SIZE,
              shapeOptions.top - OBJECT_SIZE,
            ],
            {
              fill: lineColor,
              stroke: lineColor,
              strokeWidth: 10,
            }
          );
          break;
        case 'arrow':
          const arrowColor = getRandomColor();
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
              stroke: arrowColor,
              strokeWidth: 20,
            }
          );
          const arrowHead = new fabric.Triangle({
            width: arrowHeadLength,
            height: 80,
            fill: arrowColor,
            left: arrowLength + arrowHeadLength,
            top: shapeOptions.top - 15,
            angle: 90,
          });

          const objs = [arrowBody, arrowHead];
          newShape = new fabric.Group(objs);
          break;
        case 'square':
          newShape = new fabric.Rect({
            ...shapeOptions,
            width: OBJECT_SIZE,
            height: OBJECT_SIZE,
            fill: 'rgba(0,0,0,0)',
            stroke: getRandomColor(),
            strokeWidth: 10,
          });
          break;
        case 'circle':
          newShape = new fabric.Circle({
            ...shapeOptions,
            radius: OBJECT_SIZE / 2,
            fill: getRandomColor(),
          });
          break;
        case 'triangle':
          newShape = new fabric.Triangle({
            ...shapeOptions,
            width: OBJECT_SIZE,
            height: OBJECT_SIZE,
            fill: getRandomColor(),
          });
          break;
        case 'star':
          let points = starPolygonPoints(5, 150, 75);
          newShape = new fabric.Polygon(points, {
            ...shapeOptions,
            fill: 'rgba(0,0,0,0)',
            stroke: getRandomColor(),
            strokeWidth: 10,
          });
          break;
        default:
          break;
      }

      // Add new shape to the canvas
      newShape && fabricOverlay.fabricCanvas().add(newShape);

      // De-activate currently selected shape
      setMyState({ ...myState, activeShape: null });
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
            handleShapeSelect={handleShapeSelect}
          />
        </ToolbarOptionsPanel>
      )}
      {myState.isSelectedOnCanvas && (
        <OptionsBar left={175}>
          Options for selected shape object go here
        </OptionsBar>
      )}
    </>
  );
}

Shape.propTypes = { isActive: PropTypes.bool };

export default Shape;
