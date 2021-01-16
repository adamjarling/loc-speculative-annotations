import React from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  MenuItemOption,
  MenuOptionGroup,
} from '@chakra-ui/react';
import { ChevronDownIcon, DeleteIcon } from '@chakra-ui/icons';
import {
  useFabricOverlayDispatch,
  useFabricOverlayState,
} from 'context/fabric-overlay-context';

function MyAnnotations() {
  const { fabricOverlay, userCanvases } = useFabricOverlayState();
  const dispatch = useFabricOverlayDispatch();
  const [selectedCanvas, setSelectedCanvas] = React.useState();
  const hasSavedCanvases = Object.keys(userCanvases).length > 0;

  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const onDeleteModalClose = () => setIsDeleteModalOpen(false);
  const cancelRef = React.useRef();

  const handleMenuChange = value => {
    setSelectedCanvas(value);
    if (value) {
      fabricOverlay._fabricCanvas.loadFromJSON(userCanvases[value]);
    }
    dispatch({ type: 'updateActiveUserCanvas', activeUserCanvas: value });
  };

  const handleDeleteAll = () => {
    fabricOverlay._fabricCanvas.clear();
    setSelectedCanvas('');
    dispatch({
      type: 'updateUserCanvases',
      activeUserCanvas: '',
      userCanvases: {},
    });
    setIsDeleteModalOpen(false);
  };

  if (!hasSavedCanvases) {
    return null;
  }

  return (
    <>
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          My Annotations
        </MenuButton>
        {Object.keys(userCanvases).length > 0 && (
          <MenuList>
            <MenuOptionGroup
              value={selectedCanvas}
              type="radio"
              onChange={handleMenuChange}
              title="Saved annotations"
            >
              {Object.keys(userCanvases).map(key => (
                <MenuItemOption key={key} value={key}>
                  {key}
                </MenuItemOption>
              ))}
            </MenuOptionGroup>
            <MenuDivider />
            <MenuItem onClick={() => setIsDeleteModalOpen(true)}>
              <DeleteIcon mr="2" /> <span>Delete all</span>
              {/* <SaveDeleteAll handleDeleteAll={handleDeleteAll} /> */}
            </MenuItem>
          </MenuList>
        )}
      </Menu>

      <AlertDialog
        isOpen={isDeleteModalOpen}
        leastDestructiveRef={cancelRef}
        onClose={onDeleteModalClose}
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
              <Button ref={cancelRef} onClick={onDeleteModalClose}>
                Cancel
              </Button>
              <Button colorScheme="brand.pink" onClick={handleDeleteAll} ml={3}>
                Delete All
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

export default MyAnnotations;
