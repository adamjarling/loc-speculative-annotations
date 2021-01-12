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
import SALogo from 'components/SALogo';

function LayoutAppHeader(props) {
  const history = useHistory();

  const handleCloseClick = () => {
    history.push('/about');
  };

  return (
    <Flex
      as="header"
      h="8vh"
      justifyContent="space-between"
      alignItems="center"
      boxShadow="base"
      zIndex="1"
    >
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
