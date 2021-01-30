import React from 'react';
import PropTypes from 'prop-types';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';

function MyAnnotationsDelete({
  handleDelete,
  isDeleteModalOpen,
  onDeleteModalClose,
  selectedCanvas,
}) {
  const cancelRef = React.useRef();

  return (
    <AlertDialog
      isOpen={isDeleteModalOpen}
      leastDestructiveRef={cancelRef}
      onClose={onDeleteModalClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? This will delete your saved{' '}
            <strong>{selectedCanvas}</strong> annotation.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onDeleteModalClose}>
              Cancel
            </Button>
            <Button colorScheme="brand.pink" onClick={handleDelete} ml={3}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}

MyAnnotationsDelete.propTypes = {
  handleDelete: PropTypes.func,
  isDeleteModalOpen: PropTypes.bool,
  onDeleteModalClose: PropTypes.func,
  selectedCanvas: PropTypes.string,
};

export default MyAnnotationsDelete;
