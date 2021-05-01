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
import { fabric } from 'openseadragon-fabricjs-overlay';
import { useFabricOverlayState } from 'context/fabric-overlay-context';
import useButtonSize from 'hooks/use-button-size';

import bubble1 from 'images/speech-bubble/New-trial-stamp1-embedded.svg';
import bubble2 from 'images/speech-bubble/New-trial-stamp2-embedded.svg';
import { ReactComponent as Bubble1 } from 'images/speech-bubble/New-trial-stamp1-embedded.svg';
import { ReactComponent as Bubble2 } from 'images/speech-bubble/New-trial-stamp2-embedded.svg';

export const speechBubbles = [
  {
    id: 'bubble1',
    label: 'Speech bubble',
    src: bubble1,
    StampSVG: Bubble1,
  },
  {
    id: 'bubble2',
    label: 'Speech bubble',
    src: bubble2,
    StampSVG: Bubble2,
  },
];

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
        icon={<StampQuestionIcon height={`30px`} width={`30px`} />}
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
              {speechBubbles.slice(0, 6).map(stampObj => (
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
