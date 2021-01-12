import React from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
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
import useLocalStorageState from 'hooks/use-local-storage-state';

export default function SaveCanvas({ handleSaveCanvas, selectedCanvas = '' }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = React.useState('');

  React.useEffect(() => {
    setTitle(selectedCanvas);
  }, [selectedCanvas]);

  const handleSave = () => {
    console.log('saves');
    handleSaveCanvas(title);
    onClose();
  };

  return (
    <>
      <Button onClick={onOpen} leftIcon={<FaSave />} variant="ghost">
        Save
      </Button>

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
            <input type="text" />
            <FormErrorMessage>Value can't be empty</FormErrorMessage>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="brand.neonGreen"
              mr={3}
              onClick={handleSave}
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

SaveCanvas.propTypes = {
  handleSaveCanvas: PropTypes.func,
  selectedCanvas: PropTypes.string,
};
