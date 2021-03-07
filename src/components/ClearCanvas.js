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
import { useFabricOverlayState } from 'context/fabric-overlay-context';
import useButtonSize from 'hooks/use-button-size';

function ClearCanvas(props) {
  const { fabricOverlay } = useFabricOverlayState();
  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef();
  const buttonSize = useButtonSize();

  const handleClearCanvas = () => {
    fabricOverlay.fabricCanvas().clear();
    onClose();
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)} size={buttonSize}>
        Clear all
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Clear Canvas
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? This will remove all current annotations from the
              canvas.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose} variant="ghost">
                Cancel
              </Button>
              <Button onClick={handleClearCanvas} ml={3}>
                Clear
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

ClearCanvas.propTypes = {};

export default ClearCanvas;
