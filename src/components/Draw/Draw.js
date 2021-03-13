import React from 'react';
import { FaPaintBrush } from 'react-icons/fa';
import { Box, Divider } from '@chakra-ui/react';
import {
  useFabricOverlayDispatch,
  useFabricOverlayState,
} from 'context/fabric-overlay-context';
import DrawWidthPicker from 'components/Draw/WidthPicker';
import ToolbarButton from 'components/Toolbar/Button';
import ToolbarOptionsPanel from 'components/Toolbar/OptionsPanel';
import { widths } from 'components/Draw/WidthPicker';
import logo from 'images/logo.png';

const getDrawCursor = (brushSize, brushColor) => {
  brushSize = brushSize < 12 ? 8 : brushSize;
  const circle = `
		<svg
			height="${brushSize}"
			fill="${brushColor}"
			viewBox="0 0 ${brushSize * 2} ${brushSize * 2}"
			width="${brushSize}"
			xmlns="http://www.w3.org/2000/svg"
		>
			<circle
				cx="50%"
				cy="50%"
				r="${brushSize}" 
			/>
		</svg>
	`;

  return `data:image/svg+xml;base64,${window.btoa(circle)}`;
};

function createFreeDrawingCursor(brushWidth, brushColor) {
  return `url(${getDrawCursor(brushWidth, brushColor)}) ${brushWidth / 2} ${
    brushWidth / 2
  }, crosshair`;
}

function Draw({ isActive }) {
  const [width, setWidth] = React.useState(widths[0]);
  const { color, fabricOverlay, viewer } = useFabricOverlayState();
  const dispatch = useFabricOverlayDispatch();

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
      const brushWidth = width.pixelWidth;

      // Enable Fabric drawing; disable OSD mouseclicks
      viewer.setMouseNavEnabled(false);
      viewer.outerTracker.setTracking(false);
      canvas.isDrawingMode = true;
      canvas.freeDrawingBrush.color = color.hex;
      canvas.freeDrawingBrush.width = brushWidth;

      canvas.renderAll();

      // EXAMPLE: of using an image for cursor
      // https://i.stack.imgur.com/fp7eL.png
      //canvas.freeDrawingCursor = `url(${logo}) 0 50, auto`;

      canvas.freeDrawingCursor = createFreeDrawingCursor(brushWidth, color.hex);
    } else {
      // Disable Fabric drawing; enable OSD mouseclicks
      viewer.setMouseNavEnabled(true);
      viewer.outerTracker.setTracking(true);
      canvas.isDrawingMode = false;
    }
  }, [isActive]);

  React.useEffect(() => {
    // Update brush color and size with Fabric
    if (!fabricOverlay) return;

    const canvas = fabricOverlay.fabricCanvas();
    const brushWidth = width.pixelWidth;

    canvas.freeDrawingBrush.color = color.hex;
    canvas.freeDrawingBrush.width = brushWidth;
    canvas.freeDrawingCursor = createFreeDrawingCursor(brushWidth, color.hex);
  }, [color, width]);

  const handleToolbarClick = () => {
    dispatch({ type: 'updateTool', tool: isActive ? '' : 'DRAW' });
  };

  function handleWidthSelect(width) {
    setWidth({ ...width });
  }

  return (
    <>
      <ToolbarButton
        onClick={handleToolbarClick}
        icon={<FaPaintBrush />}
        isActive={isActive}
        label="Draw"
      />
      {isActive && (
        <ToolbarOptionsPanel>
          <DrawWidthPicker
            color={color}
            handleWidthSelect={handleWidthSelect}
            width={width}
          />
        </ToolbarOptionsPanel>
      )}
    </>
  );
}

export default Draw;
