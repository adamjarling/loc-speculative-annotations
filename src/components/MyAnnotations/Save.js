import React from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  IconButton,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { FaSave } from 'react-icons/fa';
import {
  useFabricOverlayDispatch,
  useFabricOverlayState,
} from 'context/fabric-overlay-context';
import useButtonSize from 'hooks/use-button-size';

export default function MyAnnotationsSave() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = React.useState('');
  const {
    activeUserCanvas,
    fabricOverlay,
    userCanvases,
  } = useFabricOverlayState();
  const dispatch = useFabricOverlayDispatch();
  const buttonSize = useButtonSize();

  React.useEffect(() => {
    setTitle(activeUserCanvas);
  }, [activeUserCanvas]);

  const handleSaveCanvas = () => {
    let newCanvases = {
      ...userCanvases,
      [title]: fabricOverlay._fabricCanvas.toObject(),
    };

    dispatch({
      type: 'updateUserCanvases',
      userCanvases: newCanvases,
      activeUserCanvas: title,
    });
    onClose();
  };

  return (
    <>
      <IconButton
        onClick={onOpen}
        icon={<FaSave />}
        aria-label="Save"
        size={buttonSize}
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Save annotation</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl
              id="user-canvas-name"
              isRequired
              isInvalid={title === ''}
            >
              <FormLabel>Save as</FormLabel>
            </FormControl>
            <Input
              placeholder="Name your work"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
            <FormErrorMessage>Value can't be empty</FormErrorMessage>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="brand.green"
              mr={3}
              onClick={handleSaveCanvas}
              isDisabled={title === ''}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

MyAnnotationsSave.propTypes = {};
