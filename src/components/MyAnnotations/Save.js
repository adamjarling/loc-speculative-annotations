import React from 'react';
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  IconButton,
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
import { FaSave } from 'react-icons/fa';
import {
  useFabricOverlayDispatch,
  useFabricOverlayState,
} from 'context/fabric-overlay-context';
import { useParams } from 'react-router-dom';
import AltButton from 'components/AltButton';
import useIsColorPickerVisible from 'hooks/use-is-color-picker-visible';

export default function MyAnnotationsSave() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const params = useParams();
  const [title, setTitle] = React.useState('');
  const { activeUserCanvas, fabricOverlay, userCanvases } =
    useFabricOverlayState();
  const dispatch = useFabricOverlayDispatch();
  const isColorPickerVisible = useIsColorPickerVisible();
  const buttonProps = {
    'data-testid': 'save-link',
    id: 'save-my-annotations',
  };

  React.useEffect(() => {
    setTitle(activeUserCanvas);
  }, [activeUserCanvas]);

  const handleSaveCanvas = () => {
    let newCanvases = {
      ...userCanvases,
      [title]: {
        locWorkId: params.id,
        fabricCanvas: fabricOverlay._fabricCanvas.toObject(),
      },
    };

    dispatch({
      type: 'updateUserCanvases',
      userCanvases: newCanvases,
      activeUserCanvas: title,
    });
    onClose();
  };

  return (
    <>
      {!isColorPickerVisible && (
        <AltButton onClick={onOpen} leftIcon={<FaSave />} {...buttonProps}>
          Save
        </AltButton>
      )}
      {isColorPickerVisible && (
        <IconButton
          onClick={onOpen}
          icon={<FaSave />}
          variant="ghost"
          {...buttonProps}
        />
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent data-testid="save-annotation-modal">
          <ModalHeader>My Annotations</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl
              id="user-canvas-name"
              isRequired
              isInvalid={title === ''}
            >
              <FormLabel>Save as</FormLabel>
              <Input
                placeholder="Name your work"
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
              <FormErrorMessage>Value can't be empty</FormErrorMessage>
            </FormControl>

            <Flex w="100%" mt={4}>
              <Button variant="ghost" flexGrow="1" onClick={onClose}>
                Cancel
              </Button>
              <Button
                data-testid="save-button"
                onClick={handleSaveCanvas}
                flexGrow="1"
                variant="saPink"
                isDisabled={title === ''}
              >
                Save
              </Button>
            </Flex>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

MyAnnotationsSave.propTypes = {};
