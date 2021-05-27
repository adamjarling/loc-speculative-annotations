import React from 'react';
import {
  Box,
  Button,
  Flex,
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
import useFabricHelpers from 'hooks/use-fabric-helpers';
import {
  useFabricOverlayState,
  useFabricOverlayDispatch,
} from 'context/fabric-overlay-context';
import ChangeWorkWarning from 'components/ChangeWorkWarning';
import useButtonSize from 'hooks/use-button-size';

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
  const { getUserObjects } = useFabricHelpers();
  const { activeUserCanvas, userCanvases } = useFabricOverlayState();
  const [isChangeWorkWarningVisible, setIsChangeWorkWarningVisible] =
    React.useState();
  const dispatch = useFabricOverlayDispatch();
  const buttonSize = useButtonSize();

  const maxImageHeight = useBreakpointValue({
    base: '100px',
    md: '180px',
    lg: '240px',
  });
  const buttonLabel = useBreakpointValue({
    base: '',
    md: 'Select from the Collection',
  });
  const isMobile = useBreakpointValue({ base: true, sm: false });

  const handleImageClick = image => {
    setActiveWork(image);
  };

  const handleChangeWorkWarningCancel = () => {
    setIsChangeWorkWarningVisible(false);
    onOpen();
  };

  const handleChangeWorkWarningSave = () => {
    setIsChangeWorkWarningVisible(false);
    document.getElementById('save-my-annotations').click();
  };

  const handleOpenModal = () => {
    const objects = getUserObjects();

    // User is on an un-saved user canvas with no annotations
    if (objects.length > 0 && !activeUserCanvas) {
      setIsChangeWorkWarningVisible(true);
      return;
    }
    // User is on a saved user canvas, with additional annotations
    if (
      activeUserCanvas &&
      userCanvases[activeUserCanvas].fabricCanvas.objects.length !==
        objects.length
    ) {
      setIsChangeWorkWarningVisible(true);
      return;
    }
    onOpen();
  };

  const handleSelectItem = () => {
    onClose();
    dispatch({
      type: 'updateActiveUserCanvas',
      activeUserCanvas: '',
    });
    history.push(`/${activeWork.id}`);
  };

  return (
    <Box>
      <ChangeWorkWarning
        isVisible={isChangeWorkWarningVisible}
        handleCancel={handleChangeWorkWarningCancel}
        handleSave={handleChangeWorkWarningSave}
      />

      <IconButton
        display={{ base: 'flex', md: 'none' }}
        icon={<AddIcon />}
        onClick={handleOpenModal}
        bg="brand.pink.500"
        color="white"
        mr={2}
      />
      <Button
        display={{ base: 'none', md: 'inline-block' }}
        onClick={handleOpenModal}
        leftIcon={<AddIcon />}
        variant="saPink"
        size={buttonSize}
      >
        {buttonLabel}
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={{ base: 'xl', lg: 'full' }}
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
