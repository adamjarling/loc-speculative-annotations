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
} from '@chakra-ui/react';
import { FaSave } from 'react-icons/fa';
import {
  useFabricOverlayDispatch,
  useFabricOverlayState,
} from 'context/fabric-overlay-context';
import { useParams } from 'react-router-dom';
import AltButton from 'components/AltButton';
import MyAnnotationsList from 'components/MyAnnotations/List';
import { useHistory } from 'react-router-dom';

export default function MyAnnotationsSave() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const params = useParams();
  const [title, setTitle] = React.useState('');
  const { activeUserCanvas, fabricOverlay, userCanvases } =
    useFabricOverlayState();
  const dispatch = useFabricOverlayDispatch();
  const history = useHistory();

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

  const handleDeleteClick = canvasTitle => {
    const newUserCanvases = { ...userCanvases };
    delete newUserCanvases[canvasTitle];

    dispatch({
      type: 'updateUserCanvases',
      activeUserCanvas: '',
      userCanvases: newUserCanvases,
    });

    onClose();
  };

  const handleChangeCanvas = canvasTitle => {
    if (canvasTitle) {
      dispatch({
        type: 'updateActiveUserCanvas',
        activeUserCanvas: canvasTitle,
      });
      history.push(`/${userCanvases[canvasTitle]['locWorkId']}`, {
        canvasTitle,
      });
    }

    onClose();
  };

  return (
    <>
      <AltButton
        disabled={false}
        onClick={onOpen}
        leftIcon={<FaSave />}
        data-testid="save-link"
        id="save-my-annotations"
      >
        My
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
            </FormControl>
            <Input
              placeholder="Name your work"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
            <FormErrorMessage>Value can't be empty</FormErrorMessage>
            <Flex pt={3} pb={6} justifyContent="flex-end">
              <Button
                onClick={handleSaveCanvas}
                size="sm"
                isDisabled={title === ''}
              >
                Save
              </Button>
            </Flex>

            <MyAnnotationsList
              activeUserCanvas={activeUserCanvas}
              handleDeleteClick={handleDeleteClick}
              handleChangeCanvas={handleChangeCanvas}
              userCanvases={userCanvases}
            />
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

MyAnnotationsSave.propTypes = {};
