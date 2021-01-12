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
import { ChevronDownIcon, DeleteIcon } from '@chakra-ui/icons';

function SaveDeleteAll({ handleDeleteAll }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef();

  const handleConfirmClick = () => {
    setIsOpen(false);
    handleDeleteAll();
  };

  return (
    <>
      <Button
        leftIcon={<DeleteIcon />}
        variant="ghost"
        onClick={() => setIsOpen(true)}
      >
        Delete all
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete all
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? This will delete all your saved annotations.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="brand.pink"
                onClick={handleConfirmClick}
                ml={3}
              >
                Delete All
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

SaveDeleteAll.propTypes = {};

export default SaveDeleteAll;
