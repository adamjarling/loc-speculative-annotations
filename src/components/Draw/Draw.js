import React from 'react';
import { FaPaintBrush } from 'react-icons/fa';
import { BiHighlight } from 'react-icons/bi';
import {
  useFabricOverlayDispatch,
  useFabricOverlayState,
} from 'context/fabric-overlay-context';
import ToolbarButton from 'components/Toolbar/Button';
import { useToolbarOptionsState } from 'context/toolbar-options-context';
import PropTypes from 'prop-types';
import useHexRGB from 'hooks/use-hex-rgb';

const getDrawCursor = (brushSize, brushColor, isHighlighter) => {
  brushSize = brushSize < 12 ? 8 : brushSize;

  const circle = `
		<svg
			height="${brushSize * 0.8}"
			fill="${brushColor}"
			viewBox="0 0 ${brushSize * 2} ${brushSize * 2}"
			width="${brushSize * 0.8}"
			xmlns="http://www.w3.org/2000/svg"
		>
    <circle
      cx="50%"
      cy="50%"
      r="${brushSize}" 
    />
		</svg>
	`;

  const rect = `
		<svg
			height="${brushSize}"
			fill="${brushColor}"
			viewBox="0 0 125 125"
			width="${brushSize}"
			xmlns="http://www.w3.org/2000/svg"
		>
    <rect x="20" y="20" width="100" height="100" rx="15" ry="15" />
		</svg>
	`;

  return `data:image/svg+xml;base64,${window.btoa(
    isHighlighter ? rect : circle
  )}`;
};

function createFreeDrawingCursor(brushWidth, brushColor, isHighlighter) {
  return `url(${getDrawCursor(brushWidth, brushColor, isHighlighter)}) ${
    brushWidth / 2
  } ${brushWidth / 2}, crosshair`;
}

function Draw({ isActive, isHighlighter }) {
  const { brushWidth, color } = useToolbarOptionsState();
  const { activeTool, fabricOverlay, viewer } = useFabricOverlayState();
  const dispatch = useFabricOverlayDispatch();
  const { hexToRGBA } = useHexRGB();

  const [myState, _setMyState] = React.useState({
    isActive,
  });
  const myStateRef = React.useRef(myState);
  const setMyState = data => {
    myStateRef.current = data;
    _setMyState(data);
  };

  React.useEffect(() => {
    setMyState({ isActive });
  }, [isActive]);

  React.useEffect(() => {
    if (!fabricOverlay) return;
    const canvas = fabricOverlay.fabricCanvas();

    function handleMouseDown() {
      if (!myStateRef.current.isActive) return;
      // Need this as double protection to make sure OSD isn't swallowing
      // Fabric's drawing mode for some reason
      viewer.setMouseNavEnabled(false);
      viewer.outerTracker.setTracking(false);
    }
    canvas.on('mouse:down', handleMouseDown);

    return () => {
      canvas.off('mouse:down', handleMouseDown);
    };
  }, [fabricOverlay]);

  React.useEffect(() => {
    if (!fabricOverlay) return;
    const canvas = fabricOverlay.fabricCanvas();

    if (isActive) {
      // Enable Fabric drawing; disable OSD mouseclicks
      viewer.setMouseNavEnabled(false);
      viewer.outerTracker.setTracking(false);
      canvas.isDrawingMode = true;
      canvas.freeDrawingBrush.color = isHighlighter
        ? hexToRGBA(color.hex, 0.5)
        : color.hex;
      canvas.freeDrawingBrush.width = brushWidth.pixelWidth;

      canvas.renderAll();

      // EXAMPLE: of using an image for cursor
      // https://i.stack.imgur.com/fp7eL.png
      //canvas.freeDrawingCursor = `url(${logo}) 0 50, auto`;

      canvas.freeDrawingCursor = createFreeDrawingCursor(
        brushWidth.pixelWidth,
        isHighlighter ? hexToRGBA(color.hex, 0.5) : color.hex,
        isHighlighter
      );
    } else {
      // Dont disable Fabric isDrawingMode if changing to another drawing tool
      if (['DRAW', 'HIGHLIGHTER'].indexOf(activeTool) > -1) return;

      // Disable Fabric drawing; enable OSD mouseclicks
      viewer.setMouseNavEnabled(true);
      viewer.outerTracker.setTracking(true);
      canvas.isDrawingMode = false;
      canvas.freeDrawingCursor = '';
    }
  }, [isActive]);

  React.useEffect(() => {
    // Update brush color and size with Fabric
    if (!fabricOverlay || !isActive) return;

    const canvas = fabricOverlay.fabricCanvas();

    canvas.freeDrawingBrush.color = isHighlighter
      ? hexToRGBA(color.hex, 0.5)
      : color.hex;
    canvas.freeDrawingBrush.width = brushWidth.pixelWidth;
    canvas.freeDrawingCursor = createFreeDrawingCursor(
      brushWidth.pixelWidth,
      isHighlighter ? hexToRGBA(color.hex, 0.5) : color.hex,
      isHighlighter
    );
  }, [color, brushWidth]);

  const handleToolbarClick = () => {
    dispatch({
      type: 'updateTool',
      tool: isHighlighter ? 'HIGHLIGHTER' : 'DRAW',
    });
  };

  return (
    <>
      <ToolbarButton
        onClick={handleToolbarClick}
        icon={isHighlighter ? <BiHighlight /> : <FaPaintBrush />}
        isActive={isActive}
        label={isHighlighter ? 'Highlighter' : 'Draw'}
      />
    </>
  );
}

Draw.propTypes = {
  isActive: PropTypes.bool,
  isHighlighter: PropTypes.bool,
};

export default Draw;
