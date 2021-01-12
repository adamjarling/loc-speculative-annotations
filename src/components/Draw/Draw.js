import React from 'react';
import { FaPaintBrush } from 'react-icons/fa';
import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Heading,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react';
import {
  useFabricOverlayDispatch,
  useFabricOverlayState,
} from 'context/fabric-overlay-context';
import DrawColorPicker from 'components/Draw/ColorPicker';
import DrawWidthPicker from 'components/Draw/WidthPicker';
import ToolbarButton from 'components/Toolbar/Button';

function Draw({ isActive }) {
  const [isDrawing, setIsDrawing] = React.useState();
  const [color, setColor] = React.useState('#24e600');
  const [width, setWidth] = React.useState(20);
  const {
    fabricOverlay,
    isToolSettingsVisible,
    viewer,
  } = useFabricOverlayState();
  const dispatch = useFabricOverlayDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();

  React.useEffect(() => {
    if (!fabricOverlay) return;
    const canvas = fabricOverlay.fabricCanvas();

    // Handle Fabric drawing mode
    if (isActive) {
      viewer.setMouseNavEnabled(false);
      viewer.outerTracker.setTracking(false);
      canvas.isDrawingMode = true;
      canvas.freeDrawingBrush.color = color;
      canvas.freeDrawingBrush.width = width;
    } else {
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

  function handleClose() {
    dispatch({ type: 'toggleToolSettingsVisible' });
    onClose();
  }

  function handleColorSelect(color) {
    setColor(color);
  }

  const handleToolbarClick = () => {
    if (isActive) {
      // User wants to make inactive
      onClose();
    } else {
      // User wants to make active
      onOpen();
    }
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
      <Drawer placement="right" onClose={handleClose} isOpen={isOpen}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerBody>
              <Heading size="md" mb="4">
                Color
              </Heading>
              <DrawColorPicker handleColorSelect={handleColorSelect} />
              <Heading size="md" mt="10" mb="4">
                Size
              </Heading>
              <DrawWidthPicker
                color={color}
                handleWidthSelect={handleWidthSelect}
                prevWidth={width}
              />
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
}

Draw.propTypes = {};

export default Draw;
