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

export default function SaveCanvas({ handleSaveCanvas, selectedCanvas = '' }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = React.useState(selectedCanvas);

  const handleSave = () => {
    console.log('saves');
    handleSaveCanvas(title);
    onClose();
  };

  return (
    <>
      <Button onClick={onOpen}>Save your work</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Save your annotations</ModalHeader>
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
