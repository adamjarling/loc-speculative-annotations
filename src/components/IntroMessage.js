import React from 'react';
import {
  Button,
  ListItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  OrderedList,
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
          <ModalHeader>Welcome to Speculative Annotation</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              If you could speak to history, what would you say? What questions
              would you ask? What story would you tell?
            </Text>
            <Text>
              Students can use this tool to examine pieces of history, learn
              more about them, and interact with these items through annotation.
              They can write a question, highlight a sentence, react with
              stamps, or create a story.
            </Text>
            <Text>To get started:</Text>
            <OrderedList mb={3}>
              <ListItem>
                <strong>Select</strong> an item from the Library of Congress
                Speculative Annotation mini Collection.
              </ListItem>
              <ListItem>Annotate and learn!</ListItem>
              <ListItem>Save and Share your annotation.</ListItem>
            </OrderedList>
            <Text>
              Join this learning community and follow the conversation at
              #annotateLOC.
            </Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
