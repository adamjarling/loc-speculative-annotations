import React from 'react';
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useBreakpointValue,
} from '@chakra-ui/react';
import { FaSave } from 'react-icons/fa';
import {
  useFabricOverlayDispatch,
  useFabricOverlayState,
} from 'context/fabric-overlay-context';
import { useParams } from 'react-router-dom';
import AltButton from 'components/AltButton';

export default function MyAnnotationsSave() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const params = useParams();
  const [title, setTitle] = React.useState('');
  const { activeUserCanvas, fabricOverlay, userCanvases } =
    useFabricOverlayState();
  const dispatch = useFabricOverlayDispatch();
  const showButtonText = useBreakpointValue({ base: false, xl: true });

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
      <AltButton
        onClick={onOpen}
        leftIcon={<FaSave />}
        data-testid="save-link"
        id="save-my-annotations"
      >
        Save
      </AltButton>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
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
