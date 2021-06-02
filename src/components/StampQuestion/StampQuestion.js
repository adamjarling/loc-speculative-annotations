import React from 'react';
import { useFabricOverlayDispatch } from 'context/fabric-overlay-context';
import ToolbarButton from 'components/Toolbar/Button';
import { ReactComponent as StampQuestionIcon } from 'images/Question-Stamp-02.svg';
import {
  Button,
  Image,
  Link,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  SimpleGrid,
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
  const shapeSize = useBreakpointValue({
    base: 150,
    sm: 175,
    md: 400,
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
        data-testid="quick-question-button"
      />

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={{ base: 'xl', lg: 'full' }}
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody data-testid="quick-question-body">
            <SimpleGrid columns={{ base: 2, md: 3 }}>
              {speechBubbles.map(stampObj => (
                <Link
                  key={stampObj.id}
                  data-testid={stampObj.id}
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

          <ModalFooter data-testid="quick-question-footer">
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
