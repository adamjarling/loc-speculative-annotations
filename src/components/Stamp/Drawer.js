import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react';
import { FaStamp } from 'react-icons/fa';
import StampLOCStamps from 'components/Stamp/LOC/Stamps';
import { fabric } from 'openseadragon-fabricjs-overlay';
import { useFabricOverlayState } from 'context/fabric-overlay-context';

function StampDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const { fabricOverlay } = useFabricOverlayState();
  const [activeStampRef, setActiveStampRef] = React.useState();

  const handleStampClick = ref => {
    setActiveStampRef(ref);
  };

  const addStampToCanvas = () => {
    const imgInstance = new fabric.Image(activeStampRef.current, {
      left: 100,
      top: 100,
    });
    fabricOverlay.fabricCanvas().add(imgInstance);
    onClose();
  };

  return (
    <>
      <Tooltip
        label="Add a stamp to the canvas"
        openDelay={500}
        aria-label="Stamp tooltip"
      >
        <Button ref={btnRef} leftIcon={<FaStamp />} onClick={onOpen}>
          Stamp
        </Button>
      </Tooltip>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Select your stamp</DrawerHeader>

            <DrawerBody>
              <StampLOCStamps handleStampClick={handleStampClick} />
            </DrawerBody>

            <DrawerFooter>
              <Button variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={addStampToCanvas} disabled={!activeStampRef}>
                Add Stamp
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
}

StampDrawer.propTypes = {
  activeTool: PropTypes.string,
};

export default StampDrawer;
