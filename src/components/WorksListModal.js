import React from 'react';
import {
  Box,
  Button,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  SimpleGrid,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import faker from 'faker';
import ToolbarButton from 'components/Toolbar/Button';

const renderMockImages = () => {
  const items = [];
  for (let i = 0; i < 15; i++) {
    items.push({ id: faker.random.uuid() });
  }
  return items;
};

function WorksListModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [activeWork, setActiveWork] = React.useState();

  const handleImageClick = id => {
    setActiveWork(id);
  };

  return (
    <Box>
      <Tooltip
        label="Select another item"
        aria-label="Select another item"
        placement="right-end"
        openDelay={500}
      >
        <IconButton
          icon={<AddIcon />}
          size="lg"
          fontSize="3xl"
          variant="ghost"
        />
      </Tooltip>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="full"
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Select another item from the Library of Congress
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SimpleGrid minChildWidth="200px" spacing={10}>
              {renderMockImages().map(image => (
                <Box
                  key={image.id}
                  bg="brand.pink.500"
                  h="200px"
                  onClick={() => handleImageClick(image.id)}
                />
              ))}
            </SimpleGrid>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default WorksListModal;
