import React from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  useBreakpointValue,
} from '@chakra-ui/react';
import AltButton from 'components/AltButton';
import useFabricHelpers from 'hooks/use-fabric-helpers';

function ClearCanvas() {
  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef();
  const { clearUserObjects } = useFabricHelpers();
  const buttonLabel = useBreakpointValue({ base: 'Clear', lg: 'Clear Canvas' });

  const handleClearCanvas = () => {
    clearUserObjects();
    onClose();
  };

  return (
    <>
      <AltButton onClick={() => setIsOpen(true)} data-testid="clear-all-link">
        {buttonLabel}
      </AltButton>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent data-testid="foo">
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
