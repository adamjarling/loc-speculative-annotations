import React from 'react';
import {
  Box,
  Button,
  IconButton,
  Image,
  Link,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  SimpleGrid,
  Tooltip,
  Wrap,
  WrapItem,
  useDisclosure,
  useBreakpointValue,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { locImages } from 'services/loc-images';
import { useHistory } from 'react-router-dom';

const activeStyles = {
  border: '4px',
  borderColor: 'brand.green.500',
};

function WorksListModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [activeWork, setActiveWork] = React.useState();
  const history = useHistory();
  const iconButtonSize = useBreakpointValue({ base: 'md', md: 'lg' });

  const handleImageClick = image => {
    setActiveWork(image);
  };

  const handleSelectItem = () => {
    onClose();
    history.push(`/${activeWork.id}`);
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
          onClick={() => onOpen()}
          size={iconButtonSize}
          fontSize={['2xl', '3xl']}
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
            <Wrap spacing="20px">
              {locImages.map(image => (
                <WrapItem key="image.id" w="200px" h="auto">
                  <Link
                    key={image.id}
                    href="#"
                    onClick={() => handleImageClick(image)}
                  >
                    <Image
                      src={image.url}
                      alt={image.alt}
                      {...(activeWork &&
                        activeWork.id === image.id && { ...activeStyles })}
                    />
                  </Link>
                </WrapItem>
              ))}
            </Wrap>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={handleSelectItem} disabled={!activeWork}>
              Select Item
            </Button>
            <Button onClick={onClose} variant="ghost">
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default WorksListModal;
