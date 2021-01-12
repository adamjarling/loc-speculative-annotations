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
  useDisclosure,
} from '@chakra-ui/react';
import { GrUser } from 'react-icons/gr';
import SaveCanvasList from 'components/Save/CanvasList';

function SaveDrawer(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen} leftIcon={<GrUser />}>
        My Annotations
      </Button>
      <Drawer isOpen={isOpen} placement="bottom" onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>My Annotations</DrawerHeader>

            <DrawerBody>
              <SaveCanvasList />
            </DrawerBody>

            <DrawerFooter></DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
}

SaveDrawer.propTypes = {};

export default SaveDrawer;
