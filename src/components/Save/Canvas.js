import React from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
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

export default function SaveCanvas({ handleSaveCanvas }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userCanvasName, setUserCanvasName] = React.useState('');

  const handleSave = () => {
    console.log('saves');
    handleSaveCanvas(userCanvasName);
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
              isInvalid={userCanvasName === ''}
            >
              <FormLabel>Save as</FormLabel>
            </FormControl>
            <Input
              placeholder="Name your work"
              value={userCanvasName}
              onChange={e => setUserCanvasName(e.target.value)}
            />
            <FormErrorMessage>Value can't be empty</FormErrorMessage>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="brand.neonGreen"
              mr={3}
              onClick={handleSave}
              isDisabled={userCanvasName === ''}
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
};
