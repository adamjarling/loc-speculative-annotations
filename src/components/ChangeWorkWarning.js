import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react';

function ChangeWorkWarning({ isVisible, handleCancel, handleSave }) {
  return (
    <AlertDialog isOpen={isVisible} onClose={handleCancel}>
      <AlertDialogOverlay />
      <AlertDialogContent>
        <AlertDialogHeader>Save Work</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>
          By selecting a new image to annotate you will lose the annotations you
          previously made. Would you like to save your annotations before
          selecting a new image?
        </AlertDialogBody>

        <AlertDialogFooter>
          <Button mr={3} onClick={handleCancel}>
            Don't Save
          </Button>
          <Button colorScheme="brand.pink" onClick={handleSave}>
            Save
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

ChangeWorkWarning.propTypes = {};

export default ChangeWorkWarning;
