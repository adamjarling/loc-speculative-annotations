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
import StampSheet1 from 'components/Stamp/Sheet1';

function Stamp({ isActive }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { fabricOverlay } = useFabricOverlayState();
  const dispatch = useFabricOverlayDispatch();

  const handleToolbarButtonClick = () => {
    dispatch({ type: 'updateTool', tool: isActive ? '' : 'STAMP' });
    onOpen();
  };

  const handleStampClick = stampObj => {
    fabric.Image.fromURL(stampObj.src, function (oImg) {
      const canvas = fabricOverlay.fabricCanvas();
      canvas.setActiveObject(oImg);
      canvas.add(oImg).renderAll();

      var tintFilter = new fabric.Image.filters.BlendColor({
        color: '#e5f6ff',
        mode: 'tint',
      });
      oImg.filters.push(tintFilter);
      oImg.applyFilters();
      canvas.renderAll();

      /**
       * Example of how to update an existing filter color
       * For when we implement the options panel where users
       * can update a selected object
       */
      // let activeObject = canvas.getActiveObject();
      // activeObject.filters[0]['color'] = '#e600dc';
      // activeObject.applyFilters();
      // canvas.renderAll();
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
        disabled={false}
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
