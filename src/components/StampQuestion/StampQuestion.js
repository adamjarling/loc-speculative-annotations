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
  useDisclosure,
} from '@chakra-ui/react';
import { fabric } from 'openseadragon-fabricjs-overlay';
import { useFabricOverlayState } from 'context/fabric-overlay-context';
import useButtonSize from 'hooks/use-button-size';

import bubble1 from 'images/speech-bubble/stamp-10.svg';
import bubble2 from 'images/speech-bubble/stamp-18.svg';
import bubble3 from 'images/speech-bubble/stamp-35.svg';
import bubble4 from 'images/speech-bubble/stamp-38.svg';
import bubble5 from 'images/speech-bubble/stamp-53.svg';
import { ReactComponent as Bubble1 } from 'images/speech-bubble/stamp-10.svg';
import { ReactComponent as Bubble2 } from 'images/speech-bubble/stamp-18.svg';
import { ReactComponent as Bubble3 } from 'images/speech-bubble/stamp-35.svg';
import { ReactComponent as Bubble4 } from 'images/speech-bubble/stamp-38.svg';
import { ReactComponent as Bubble5 } from 'images/speech-bubble/stamp-53.svg';
import png1 from 'images/speech-bubble/stamps-02.png';

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
  {
    id: 'bubble3',
    label: 'Speech bubble',
    src: bubble3,
    StampSVG: Bubble3,
  },
  {
    id: 'bubble4',
    label: 'Speech bubble',
    src: bubble4,
    StampSVG: Bubble4,
  },
  {
    id: 'bubble5',
    label: 'Speech bubble',
    src: bubble5,
    StampSVG: Bubble5,
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
    // fabric.loadSVGFromURL(activeBubble.src, function (objects, options) {
    //   let shape = fabric.util.groupSVGElements(objects, options);

    //   if (shape.type === 'group') {
    //     // The SVG file has multiple objects
    //     shape.addWithUpdate();
    //   }

    //   shape.set({
    //     top: 90,
    //     left: 90,
    //     originX: 'center',
    //     originY: 'center',
    //     perPixelTargetFind: true,
    //   });
    //   fabricOverlay
    //     .fabricCanvas()
    //     .add(shape)
    //     .centerObject(shape)
    //     .setActiveObject(shape)
    //     .renderAll();
    // });

    fabric.Image.fromURL(png1, function (myImg) {
      let shape = myImg.set({
        top: 90,
        left: 90,
        // width: 200,
        // height: 200,
        // originX: 'center',
        // originY: 'center',
        perPixelTargetFind: true,
      });

      fabricOverlay
        .fabricCanvas()
        .add(shape)
        //.centerObject(shape)
        //.setActiveObject(shape)
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
              {/* {speechBubbles.map(stampObj => (
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
              ))} */}
              <Link p={6} tabIndex="0" onClick={() => handleBubbleClick()}>
                <Image src={png1} />
              </Link>
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
