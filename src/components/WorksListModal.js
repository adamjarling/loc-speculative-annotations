import React from 'react';
import {
  Box,
  Button,
  Image,
  Link,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Wrap,
  WrapItem,
  useDisclosure,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { locImages } from 'services/loc-images';
import { useHistory } from 'react-router-dom';
import AltButton from 'components/AltButton';

function WorksListModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [activeWork, setActiveWork] = React.useState();
  const history = useHistory();

  const handleImageClick = image => {
    setActiveWork(image);
  };

  const handleSelectItem = () => {
    onClose();
    history.push(`/${activeWork.id}`);
  };

  return (
    <Box>
      {/* <AltButton
        onClick={() => onOpen()}
        leftIcon={<AddIcon />}
        colorScheme="brand.pink"
      >
        New Annotation
      </AltButton> */}
      <Button
        onClick={() => onOpen()}
        leftIcon={<AddIcon />}
        colorScheme="brand.pink"
      >
        New Annotation
      </Button>

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
                <WrapItem key={image.id} w="200px" h="auto">
                  <Link
                    key={image.id}
                    href="#"
                    onClick={() => handleImageClick(image)}
                  >
                    <Image src={image.url} alt={image.alt} />
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
