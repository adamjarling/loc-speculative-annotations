import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItemOption,
  MenuOptionGroup,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  useFabricOverlayDispatch,
  useFabricOverlayState,
} from 'context/fabric-overlay-context';
import SaveDeleteAll from 'components/Save/DeleteAll';

function MyAnnotations(props) {
  const { fabricOverlay, userCanvases } = useFabricOverlayState();
  const dispatch = useFabricOverlayDispatch();
  const [selectedCanvas, setSelectedCanvas] = React.useState();
  const hasSavedCanvases = Object.keys(userCanvases).length > 0;

  const handleMenuChange = value => {
    setSelectedCanvas(value);
    if (value) {
      fabricOverlay._fabricCanvas.loadFromJSON(userCanvases[value]);
    }
    dispatch({ type: 'updateActiveUserCanvas', activeUserCanvas: value });
  };

  const handleDeleteAll = () => {
    fabricOverlay._fabricCanvas.clear();
    setSelectedCanvas('');
    dispatch({
      type: 'updateUserCanvases',
      activeUserCanvas: '',
      userCanvases: {},
    });
  };

  if (!hasSavedCanvases) {
    return null;
  }

  return (
    <>
      <SaveDeleteAll handleDeleteAll={handleDeleteAll} />
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          My Annotations
        </MenuButton>
        {Object.keys(userCanvases).length > 0 && (
          <MenuList>
            <MenuOptionGroup
              value={selectedCanvas}
              type="radio"
              onChange={handleMenuChange}
              title="Saved annotations"
            >
              {Object.keys(userCanvases).map(key => (
                <MenuItemOption key={key} value={key}>
                  {key}
                </MenuItemOption>
              ))}
            </MenuOptionGroup>
          </MenuList>
        )}
      </Menu>
    </>
  );
}

MyAnnotations.propTypes = {};

export default MyAnnotations;
