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
import { isMobile } from 'react-device-detect';
import ToolbarButton from 'components/Toolbar/Button';
import {
  useFabricOverlayDispatch,
  useFabricOverlayState,
} from 'context/fabric-overlay-context';
import useRandomNumber from 'hooks/use-random-number';

function Stamp({ isActive }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [activeStampRef, setActiveStampRef] = React.useState();
  const { fabricOverlay } = useFabricOverlayState();
  const dispatch = useFabricOverlayDispatch();
  const { getRandomNumber } = useRandomNumber();

  const handleToolbarButtonClick = () => {
    dispatch({ type: 'updateTool', tool: isActive ? '' : 'STAMP' });
    onOpen();
  };

  const handleStampClick = ref => {
    setActiveStampRef(ref);
  };

  const addStampToCanvas = () => {
    const imgInstance = new fabric.Image(activeStampRef.current, {
      left: getRandomNumber(50, 800),
      top: getRandomNumber(50, 800),
    });
    fabricOverlay.fabricCanvas().add(imgInstance);
    onClose();
  };

  return (
    <>
      <ToolbarButton
        onClick={handleToolbarButtonClick}
        icon={<FaStamp />}
        isActive={isActive}
        label="Stamp"
      />
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Select your stamp</DrawerHeader>

            <DrawerBody>
              <StampLOCStamps handleStampClick={handleStampClick} />
            </DrawerBody>

            {/* https://github.com/chakra-ui/chakra-ui/issues/2468 */}
            <DrawerFooter mb={isMobile ? 20 : 0}>
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

Stamp.propTypes = {
  activeTool: PropTypes.string,
};

export default Stamp;
