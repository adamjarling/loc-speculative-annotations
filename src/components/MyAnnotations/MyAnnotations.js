import React from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import MyAnnotationsList from 'components/MyAnnotations/List';
import {
  useFabricOverlayState,
  useFabricOverlayDispatch,
} from 'context/fabric-overlay-context';
import { useHistory } from 'react-router-dom';

function MyAnnotations() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { activeUserCanvas, userCanvases } = useFabricOverlayState();
  const dispatch = useFabricOverlayDispatch();
  const history = useHistory();
  const buttonColor = {
    bg: useColorModeValue('gray.500', 'white'),
    text: useColorModeValue('white', 'brand.pink.500'),
  };

  const handleDeleteClick = canvasTitle => {
    const newUserCanvases = { ...userCanvases };
    delete newUserCanvases[canvasTitle];

    dispatch({
      type: 'updateUserCanvases',
      activeUserCanvas: '',
      userCanvases: newUserCanvases,
    });

    onClose();
  };

  const handleChangeCanvas = canvasTitle => {
    if (canvasTitle) {
      dispatch({
        type: 'updateActiveUserCanvas',
        activeUserCanvas: canvasTitle,
      });
      history.push(`/${userCanvases[canvasTitle]['locWorkId']}`, {
        canvasTitle,
      });
    }

    onClose();
  };

  return (
    <>
      <Button
        onClick={onOpen}
        bg={buttonColor.bg}
        color={buttonColor.text}
        _hover={{
          bg: buttonColor.bg,
        }}
      >
        My Saved Annotations
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent data-testid="my-annotations">
          <ModalHeader>My Annotations</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <MyAnnotationsList
              activeUserCanvas={activeUserCanvas}
              handleDeleteClick={handleDeleteClick}
              handleChangeCanvas={handleChangeCanvas}
              userCanvases={userCanvases}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default MyAnnotations;
