import React from 'react';
import { useFabricOverlayDispatch } from 'context/fabric-overlay-context';
import ToolbarButton from 'components/Toolbar/Button';
import { ReactComponent as StampQuestionIcon } from 'images/Question-Stamp-02.svg';
import {
  Box,
  Button,
  Image,
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
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react';
import { fabric } from 'openseadragon-fabricjs-overlay';
import { useFabricOverlayState } from 'context/fabric-overlay-context';

import stamp10 from 'images/speech-bubble/stamp-10.png';
import stamp18 from 'images/speech-bubble/stamp-18.png';
import stamp35 from 'images/speech-bubble/stamp-35.png';
import stamp38 from 'images/speech-bubble/stamp-38.png';
import stamp53 from 'images/speech-bubble/stamp-53.png';

export const speechBubbles = [
  {
    id: 'stamp10',
    label: 'Speech bubble',
    src: stamp10,
  },
  {
    id: 'stamp18',
    label: 'Speech bubble',
    src: stamp18,
  },
  {
    id: 'stamp38',
    label: 'Speech bubble',
    src: stamp38,
  },
  {
    id: 'stamp35',
    label: 'Speech bubble',
    src: stamp35,
  },
  {
    id: 'stamp53',
    label: 'Speech bubble',
    src: stamp53,
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
  const numColumns = useBreakpointValue({ base: 1, sm: 2, md: 3 });
  const shapeSize = useBreakpointValue({
    base: 150,
    sm: 175,
    md: 200,
    lg: 300,
  });

  const handleBubbleClick = obj => {
    setActiveBubble(obj);
  };

  const handleSelectItem = () => {
    onClose();

    // Put the stamp on the Canvas
    fabric.Image.fromURL(activeBubble.src, function (myImg) {
      let shape = myImg.set({
        top: 90,
        left: 90,
      });
      shape.scaleToHeight(shapeSize);
      shape.scaleToWidth(shapeSize);

      fabricOverlay.fabricCanvas().add(shape).renderAll();
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
          <ModalCloseButton />
          <ModalBody>
            <SimpleGrid columns={numColumns}>
              {speechBubbles.map(stampObj => (
                <Link
                  key={stampObj.id}
                  p={6}
                  tabIndex="0"
                  onClick={() => handleBubbleClick(stampObj)}
                  {...(activeBubble &&
                    activeBubble.id === stampObj.id && { ...activeStyle })}
                >
                  <Image src={stampObj.src} />
                </Link>
              ))}
            </SimpleGrid>
          </ModalBody>

          <ModalFooter mb="60px">
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
