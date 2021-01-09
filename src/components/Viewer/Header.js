import React from 'react';
import {
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Tooltip,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from '../../ColorModeSwitcher';
import { CloseIcon } from '@chakra-ui/icons';
import { useHistory } from 'react-router-dom';
import {
  useFabricOverlayDispatch,
  useFabricOverlayState,
} from 'context/fabric-overlay-context';
import { SettingsIcon } from '@chakra-ui/icons';
import ToolbarButton from 'components/Toolbar/Button';

function ViewerHeader(props) {
  const history = useHistory();
  const { activeTool } = useFabricOverlayState();
  const dispatch = useFabricOverlayDispatch();

  const handleCloseClick = () => {
    history.push('/about');
  };

  const handleSettingsClick = () => {
    dispatch({ type: 'toggleToolSettingsVisible' });
  };

  return (
    <Flex
      as="header"
      h="6vh"
      justifyContent="space-between"
      alignItems="center"
    >
      <Box>
        <ToolbarButton
          icon={<SettingsIcon />}
          label="Tool settings"
          onClick={handleSettingsClick}
          variant="ghost"
        />
      </Box>
      <HStack spacing="10px">
        <ColorModeSwitcher />
        <Tooltip label="Close the app" aria-label="Close the app">
          <IconButton
            aria-label="Close"
            icon={<CloseIcon />}
            onClick={handleCloseClick}
            variant="ghost"
          />
        </Tooltip>
      </HStack>
    </Flex>
  );
}

ViewerHeader.propTypes = {};

export default ViewerHeader;
