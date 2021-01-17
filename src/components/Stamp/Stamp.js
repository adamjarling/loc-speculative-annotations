import React from 'react';
import PropTypes from 'prop-types';
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react';
import { FaStamp } from 'react-icons/fa';
import { fabric } from 'openseadragon-fabricjs-overlay';
import ToolbarButton from 'components/Toolbar/Button';
import {
  useFabricOverlayDispatch,
  useFabricOverlayState,
} from 'context/fabric-overlay-context';
import useRandomNumber from 'hooks/use-random-number';
import StampSheet1 from 'components/Stamp/Sheet1';

function Stamp({ isActive }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { fabricOverlay } = useFabricOverlayState();
  const dispatch = useFabricOverlayDispatch();
  const { getRandomNumber } = useRandomNumber();

  const handleToolbarButtonClick = () => {
    dispatch({ type: 'updateTool', tool: isActive ? '' : 'STAMP' });
    onOpen();
  };

  const handleStampClick = stampObj => {
    fabric.loadSVGFromURL(stampObj.src, function (objects, options) {
      const obj = fabric.util
        .groupSVGElements(objects, options)
        .set({ left: getRandomNumber(50, 500), top: getRandomNumber(50, 500) });
      fabricOverlay.fabricCanvas().add(obj).renderAll();
    });

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
              <StampSheet1 handleStampClick={handleStampClick} />
            </DrawerBody>
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
