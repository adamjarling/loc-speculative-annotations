import React from 'react';
import { FaPaintBrush } from 'react-icons/fa';
import { Box, Divider } from '@chakra-ui/react';
import {
  useFabricOverlayDispatch,
  useFabricOverlayState,
} from 'context/fabric-overlay-context';
import DrawColorPicker from 'components/Draw/ColorPicker';
import DrawWidthPicker from 'components/Draw/WidthPicker';
import ToolbarButton from 'components/Toolbar/Button';
import ToolbarOptionsPanel from 'components/Toolbar/OptionsPanel';
import { widths } from 'components/Draw/WidthPicker';
import { brandColors } from 'styles/brandPalette';

function Draw({ isActive }) {
  const [color, setColor] = React.useState(brandColors[0]);
  const [width, setWidth] = React.useState(widths[0]);
  const { fabricOverlay, viewer } = useFabricOverlayState();
  const dispatch = useFabricOverlayDispatch();

  React.useEffect(() => {
    if (!fabricOverlay) return;
    const canvas = fabricOverlay.fabricCanvas();

    if (isActive) {
      // Enable Fabric drawing; disable OSD mouseclicks
      viewer.setMouseNavEnabled(false);
      viewer.outerTracker.setTracking(false);
      canvas.isDrawingMode = true;
      canvas.freeDrawingBrush.color = color.hex;
      canvas.freeDrawingBrush.width = width.pixelWidth;
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

    canvas.freeDrawingBrush.color = color.hex;
    canvas.freeDrawingBrush.width = width.pixelWidth;
  }, [color, width]);

  function handleColorSelect(color) {
    setColor(color);
  }

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
          <DrawColorPicker handleColorSelect={handleColorSelect} />
          <Divider my={3} />
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
