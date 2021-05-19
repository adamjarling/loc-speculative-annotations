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
        <AlertDialogBody>Do you want to save first?</AlertDialogBody>

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

ChangeWorkWarning.propTypes = {
  isVisible: PropTypes.bool,
  handleCancel: PropTypes.func,
  handleSave: PropTypes.func,
};

export default ChangeWorkWarning;
