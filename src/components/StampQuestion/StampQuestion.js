import React from 'react';
import { useFabricOverlayDispatch } from 'context/fabric-overlay-context';
import ToolbarButton from 'components/Toolbar/Button';
import { ReactComponent as StampQuestionIcon } from 'images/Question-Stamp-02.svg';
import {
  Box,
  Button,
  Link,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  SimpleGrid,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { stamps } from 'components/Stamp/Picker';
import { fabric } from 'openseadragon-fabricjs-overlay';
import { useFabricOverlayState } from 'context/fabric-overlay-context';

const activeStyle = {
  border: '2px solid',
  borderColor: 'brand.pink.500',
};

export default function StampQuestion({ isActive }) {
  const dispatch = useFabricOverlayDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [activeBubble, setActiveBubble] = React.useState();
  const { fabricOverlay } = useFabricOverlayState();

  const handleBubbleClick = obj => {
    setActiveBubble(obj);
  };

  const handleSelectItem = () => {
    onClose();

    // Put the stamp on the Canvas
    fabric.loadSVGFromURL(activeBubble.src, function (objects, options) {
      let shape = fabric.util.groupSVGElements(objects, options);

      if (shape.type === 'group') {
        // The SVG file has multiple objects
        shape.addWithUpdate();
      }

      shape.set({
        top: 90,
        left: 90,
        originX: 'center',
        originY: 'center',
        perPixelTargetFind: true,
      });
      fabricOverlay
        .fabricCanvas()
        .add(shape)
        .centerObject(shape)
        .setActiveObject(shape)
        .renderAll();
    });
  };

  const handleToolbarButtonClick = () => {
    dispatch({ type: 'updateTool', tool: isActive ? '' : 'STAMP_QUESTION' });
    onOpen();
  };

  return (
    <div>
      <ToolbarButton
        onClick={handleToolbarButtonClick}
        icon={<StampQuestionIcon height="2rem" width="2rem" />}
        isActive={isActive}
        label="Quick question stamp"
      />

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="full"
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select question</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SimpleGrid columns={3}>
              {stamps.slice(0, 6).map(stampObj => (
                <Link
                  key={stampObj.id}
                  p={6}
                  tabIndex="0"
                  onClick={() => handleBubbleClick(stampObj)}
                  {...(activeBubble &&
                    activeBubble.id === stampObj.id && { ...activeStyle })}
                >
                  <stampObj.StampSVG height="90%" width="90%" />
                </Link>
              ))}
            </SimpleGrid>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} variant="ghost" mr={3}>
              Cancel
            </Button>
            <Button onClick={handleSelectItem}>Select</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
