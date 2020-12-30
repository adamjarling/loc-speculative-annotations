import React from 'react';
import { FaPaintBrush } from 'react-icons/fa';
import { FiSettings } from 'react-icons/fi';
import {
  Button,
  ButtonGroup,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Heading,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react';
import { useFabricOverlayState } from 'context/fabric-overlay-context';
import DrawColorPicker from 'components/Draw/ColorPicker';
import DrawWidthPicker from 'components/Draw/WidthPicker';

function Draw(props) {
  const [isDrawing, setIsDrawing] = React.useState();
  const [color, setColor] = React.useState('#24e600');
  const [width, setWidth] = React.useState(20);
  const { fabricOverlay, viewer } = useFabricOverlayState();
  const { isOpen, onOpen, onClose } = useDisclosure();

  React.useEffect(() => {
    if (!fabricOverlay) return;
    const canvas = fabricOverlay.fabricCanvas();

    if (isDrawing) {
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
  }, [isDrawing]);

  function handleColorSelect(color) {
    setColor(color);
  }

  function handleWidthSelect(width) {
    setWidth(width);
  }

  return (
    <>
      {!isDrawing && (
        <ButtonGroup isAttached>
          <Button
            onClick={() => setIsDrawing(true)}
            leftIcon={<FaPaintBrush />}
          >
            Draw
          </Button>
          <IconButton
            aria-label="Add to friends"
            icon={<FiSettings />}
            onClick={onOpen}
          />
        </ButtonGroup>
      )}
      {isDrawing && (
        <Button
          onClick={() => setIsDrawing(false)}
          leftIcon={<FaPaintBrush />}
          variant="outline"
        >
          Stop Drawing
        </Button>
      )}
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
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
