import React from 'react';
import { FaPaintBrush } from 'react-icons/fa';
import { Box, Divider, useDisclosure } from '@chakra-ui/react';
import {
  useFabricOverlayDispatch,
  useFabricOverlayState,
} from 'context/fabric-overlay-context';
import DrawColorPicker from 'components/Draw/ColorPicker';
import DrawWidthPicker from 'components/Draw/WidthPicker';
import ToolbarButton from 'components/Toolbar/Button';
import ToolbarOptionsPanel from 'components/Toolbar/OptionsPanel';

function Draw({ isActive }) {
  const [color, setColor] = React.useState('#24e600');
  const [width, setWidth] = React.useState('sm');
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
      canvas.freeDrawingBrush.color = color;
      canvas.freeDrawingBrush.width = width;
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

    canvas.freeDrawingBrush.color = color;
    canvas.freeDrawingBrush.width = width;
  }, [color, width]);

  function handleColorSelect(color) {
    setColor(color);
  }

  const handleToolbarClick = () => {
    dispatch({ type: 'updateTool', tool: isActive ? '' : 'DRAW' });
  };

  function handleWidthSelect(width) {
    setWidth(width);
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
            prevPixelWidth={width}
          />
        </ToolbarOptionsPanel>
      )}
    </>
  );
}

Draw.propTypes = {};

export default Draw;
