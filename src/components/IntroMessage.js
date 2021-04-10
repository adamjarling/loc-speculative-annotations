import React from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import Lorem from 'react-lorem-component';

export default function IntroMessage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isModalOpen, setIsModalOpen] = React.useState(true);

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isCentered
      >
        <ModalOverlay />
        <ModalContent data-testid="intro-message">
          <ModalHeader>Welcome to Speculative Annotation!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Lorem count={2} />
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={() => setIsModalOpen(false)}>
              Agree
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
