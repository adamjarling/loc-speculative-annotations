import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuIcon,
  MenuCommand,
  MenuDivider,
  Select,
} from '@chakra-ui/react';
import { ChevronDownIcon, DeleteIcon } from '@chakra-ui/icons';
import { FaSave } from 'react-icons/fa';
import useLocalStorageState from 'hooks/use-local-storage-state';
import {
  useFabricOverlayDispatch,
  useFabricOverlayState,
} from 'context/fabric-overlay-context';
import SaveCanvas from 'components/Save/Canvas';
import SaveDeleteAll from 'components/Save/DeleteAll';

function MyAnnotations(props) {
  const { activeAnnotation, fabricOverlay } = useFabricOverlayState();

  // LocalStorage updating
  const [userCanvases, setUserCanvases] = useLocalStorageState('userCanvases');

  // Track selected user canvases
  const [selectedCanvas, setSelectedCanvas] = React.useState();

  const handleMenuChange = value => {
    setSelectedCanvas(value);
    if (value) {
      fabricOverlay._fabricCanvas.loadFromJSON(userCanvases[value]);
    }
  };

  const handleDeleteAll = () => {
    fabricOverlay._fabricCanvas.clear();
    setSelectedCanvas('');
    setUserCanvases('');
    // toast({
    //   title: 'Success',
    //   description: 'All user canvases have been deleted.',
    //   status: 'success',
    //   duration: 9000,
    //   isClosable: true,
    // });
  };

  const handleSaveCanvas = userCanvasName => {
    let newCanvases = {
      ...userCanvases,
      [userCanvasName]: fabricOverlay._fabricCanvas.toObject(),
    };
    setUserCanvases(newCanvases);
    setSelectedCanvas(userCanvasName);
  };

  return (
    <>
      <SaveCanvas
        handleSaveCanvas={handleSaveCanvas}
        selectedCanvas={selectedCanvas}
      />
      <SaveDeleteAll handleDeleteAll={handleDeleteAll} />
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          My Annotations
        </MenuButton>
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
      </Menu>
    </>
  );
}

MyAnnotations.propTypes = {};

export default MyAnnotations;
