import React from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';
import AltButton from 'components/AltButton';
import useFabricHelpers from 'hooks/use-fabric-helpers';

function ClearCanvas() {
  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef();
  const { clearUserObjects } = useFabricHelpers();

  const handleClearCanvas = () => {
    clearUserObjects();
    onClose();
  };

  return (
    <>
      <AltButton onClick={() => setIsOpen(true)}>Clear all</AltButton>

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
