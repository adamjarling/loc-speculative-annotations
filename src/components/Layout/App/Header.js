import React from 'react';
import {
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Image,
  Tooltip,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from '../../../ColorModeSwitcher';
import { CloseIcon } from '@chakra-ui/icons';
import { useHistory } from 'react-router-dom';
import {
  useFabricOverlayDispatch,
  useFabricOverlayState,
} from 'context/fabric-overlay-context';
import { SettingsIcon } from '@chakra-ui/icons';
import SALogo from 'components/SALogo';

function LayoutAppHeader(props) {
  const history = useHistory();
  const { activeTool } = useFabricOverlayState();
  const dispatch = useFabricOverlayDispatch();

  const handleCloseClick = () => {
    history.push('/about');
  };

  const handleSettingsClick = () => {
    dispatch({ type: 'toggleToolSettingsVisible' });
  };

  const shouldDisplaySettings = () => {
    const toolsWithSettings = ['DRAW'];
    return activeTool && toolsWithSettings.indexOf(activeTool) > -1;
  };

  return (
    <Flex
      as="header"
      h="8vh"
      justifyContent="space-between"
      alignItems="center"
    >
      <Box>
        {shouldDisplaySettings() ? (
          <Button leftIcon={<SettingsIcon />} onClick={handleSettingsClick}>
            Settings
          </Button>
        ) : (
          <Box w="100px" h="20" />
        )}
      </Box>

      <SALogo />

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

LayoutAppHeader.propTypes = {};

export default LayoutAppHeader;
