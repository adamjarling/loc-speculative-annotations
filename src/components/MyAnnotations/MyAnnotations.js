import React from 'react';
import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { FaPencilAlt } from 'react-icons/fa';
import {
  useFabricOverlayDispatch,
  useFabricOverlayState,
} from 'context/fabric-overlay-context';
import useButtonSize from 'hooks/use-button-size';
import MyAnnotationsList from 'components/MyAnnotations/List';
import MyAnnotationsDelete from 'components/MyAnnotations/Delete';
import { useHistory } from 'react-router-dom';

function MyAnnotations() {
  const history = useHistory();
  const {
    activeUserCanvas,
    fabricOverlay,
    userCanvases,
  } = useFabricOverlayState();
  const dispatch = useFabricOverlayDispatch();
  const [selectedCanvas, setSelectedCanvas] = React.useState();
  const [isListOpen, setIsListOpen] = React.useState();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);

  const buttonSize = useButtonSize();

  const handleChangeCanvas = canvasTitle => {
    setSelectedCanvas(canvasTitle);
    setIsListOpen(false);

    if (canvasTitle) {
      dispatch({
        type: 'updateActiveUserCanvas',
        activeUserCanvas: canvasTitle,
      });
      history.push(`/${userCanvases[canvasTitle]['locWorkId']}`, {
        canvasTitle,
      });
    }
  };

  const handleDelete = () => {
    console.log('handleDelete');
    setIsDeleteModalOpen(false);

    const newUserCanvases = { ...userCanvases };
    delete newUserCanvases[selectedCanvas];

    dispatch({
      type: 'updateUserCanvases',
      activeUserCanvas: '',
      userCanvases: newUserCanvases,
    });

    setIsDeleteModalOpen(false);
    setSelectedCanvas('');
  };

  const handleDeleteClick = canvasTitle => {
    setIsListOpen(false);
    setIsDeleteModalOpen(true);
    setSelectedCanvas(canvasTitle);
  };

  const handleNewAnnotation = () => {
    fabricOverlay._fabricCanvas.clear();
    setSelectedCanvas('');
  };

  const onDeleteModalClose = () => setIsDeleteModalOpen(false);

  return (
    <>
      <Menu>
        <MenuButton
          as={Button}
          leftIcon={<FaPencilAlt />}
          rightIcon={<ChevronDownIcon />}
          size={buttonSize}
        >
          My Annotations
        </MenuButton>
        <MenuList>
          <MenuItem onClick={handleNewAnnotation}>New Annotation</MenuItem>
          <MenuItem onClick={() => setIsListOpen(!isListOpen)}>
            Saved Annotations
          </MenuItem>
        </MenuList>
      </Menu>

      <MyAnnotationsList
        activeUserCanvas={activeUserCanvas}
        handleCloseClick={() => setIsListOpen(false)}
        handleDeleteClick={handleDeleteClick}
        handleChangeCanvas={handleChangeCanvas}
        isOpen={isListOpen}
        userCanvases={userCanvases}
      />

      <MyAnnotationsDelete
        handleDelete={handleDelete}
        isDeleteModalOpen={isDeleteModalOpen}
        onDeleteModalClose={onDeleteModalClose}
        selectedCanvas={selectedCanvas}
      />
    </>
  );
}

export default MyAnnotations;
