import React from 'react';
import { useFabricOverlayDispatch } from 'context/fabric-overlay-context';
import ToolbarButton from 'components/Toolbar/Button';
import { ReactComponent as StampQuestionIcon } from 'images/Question-Stamp-02.svg';
import {
  Box,
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

export default function StampQuestion({ isActive }) {
  const dispatch = useFabricOverlayDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [activeQuestion, setActiveQuestion] = React.useState();

  const handleToolbarButtonClick = () => {
    dispatch({ type: 'updateTool', tool: isActive ? '' : 'STAMP_QUESTION' });
    onOpen();
  };

  return (
    <div>
      <ToolbarButton
        onClick={handleToolbarButtonClick}
        icon={<StampQuestionIcon height="2rem" width="2rem" />}
        isActive={isActive}
        label="Quick question stamp"
      />

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="full"
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select question</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Stamps go here</ModalBody>

          <ModalFooter>
            <Button onClick={onClose} variant="ghost" mr={3}>
              Cancel
            </Button>
            <Button>Select</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
