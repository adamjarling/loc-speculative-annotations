import React from 'react';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Select,
  Text,
} from '@chakra-ui/react';
import SaveCanvas from 'components/Save/Canvas';
import { useToast } from '@chakra-ui/react';
import { useFabricOverlayState } from 'context/fabric-overlay-context';
import useLocalStorageState from 'hooks/use-local-storage-state';

function SaveCanvasList() {
  const toast = useToast();
  const { fabricOverlay } = useFabricOverlayState();

  // LocalStorage updating
  const [userCanvases, setUserCanvases] = useLocalStorageState('userCanvases');

  // Track selected user canvases
  const [selectedCanvas, setSelectedCanvas] = React.useState();

  const handleSelectChange = e => {
    const val = e.target.value;
    setSelectedCanvas(val);
    if (e) {
      fabricOverlay._fabricCanvas.loadFromJSON(userCanvases[val]);
    }
  };

  const handleDeleteAll = () => {
    fabricOverlay._fabricCanvas.clear();
    setSelectedCanvas('');
    setUserCanvases('');
    toast({
      title: 'Success',
      description: 'All user canvases have been deleted.',
      status: 'success',
      duration: 9000,
      isClosable: true,
    });
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
    <Flex justifyContent="space-between" alignItems="flex-end">
      {userCanvases && (
        <FormControl id="saved-user-canvases">
          <FormLabel>Saved Canvases</FormLabel>
          <Select
            placeholder="Select one"
            onChange={handleSelectChange}
            value={selectedCanvas}
            w={300}
          >
            {Object.keys(userCanvases).map(name => (
              <option key={name}>{name}</option>
            ))}
          </Select>
        </FormControl>
      )}
      <Box mx="3">
        <SaveCanvas
          handleSaveCanvas={handleSaveCanvas}
          selectedCanvas={selectedCanvas}
        />
      </Box>
      {userCanvases && (
        <Box>
          <Button variant="ghost" onClick={handleDeleteAll}>
            Delete saved canvases
          </Button>
        </Box>
      )}
    </Flex>
  );
}

SaveCanvasList.propTypes = {};

export default SaveCanvasList;
