import React from 'react';
import {
  Box,
  Button,
  Flex,
  Image,
  Link,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Wrap,
  WrapItem,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { locImages } from 'services/loc-images';
import { useHistory, useParams } from 'react-router-dom';
import imgPlaceholder from 'images/img-placeholder.png';
import { ErrorBoundary } from 'react-error-boundary';

const activeStyle = {
  border: '2px solid',
  borderColor: 'brand.pink.500',
};

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
    </div>
  );
}

function WorksListModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const history = useHistory();
  const params = useParams();
  const [activeWork, setActiveWork] = React.useState(
    locImages.find(image => image.id === params.id)
  );
  const maxImageHeight = useBreakpointValue({
    base: '100px',
    md: '180px',
    lg: '240px',
  });
  const buttonLabel = useBreakpointValue({
    base: 'Select',
    md: 'Select from the Collection',
  });

  const handleImageClick = image => {
    setActiveWork(image);
  };

  const handleSelectItem = () => {
    onClose();
    history.push(`/${activeWork.id}`);
  };

  return (
    <Box>
      <Button
        onClick={() => onOpen()}
        leftIcon={<AddIcon />}
        colorScheme="brand.pink"
      >
        {buttonLabel}
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
            <Wrap spacing="30px" justify="center">
              {locImages.map((image, index) => (
                <WrapItem key={image.id}>
                  <ErrorBoundary FallbackComponent={ErrorFallback}>
                    <Flex alignItems="flex-end">
                      <Text
                        pr={2}
                        fontSize="2xl"
                        fontFamily="ocr-a-std"
                        color="brand.pink.300"
                      >
                        {index + 1}
                      </Text>
                      <Link
                        key={image.id}
                        href="#"
                        onClick={() => handleImageClick(image)}
                        {...(activeWork &&
                          activeWork.id === image.id && { ...activeStyle })}
                      >
                        <Image
                          src={image.thumbUrl || imgPlaceholder}
                          alt={image.alt}
                          maxH={maxImageHeight}
                        />
                      </Link>
                    </Flex>
                  </ErrorBoundary>
                </WrapItem>
              ))}
            </Wrap>
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={handleSelectItem}
              disabled={!activeWork}
              colorScheme="brand.pink"
            >
              Annotate
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default WorksListModal;
