import React from 'react';
import { Button, Flex, HStack, IconButton } from '@chakra-ui/react';
import { ColorModeSwitcher } from '../../ColorModeSwitcher';
import { CloseIcon } from '@chakra-ui/icons';
import { useHistory } from 'react-router-dom';

function ViewerHeader(props) {
  const history = useHistory();

  const handleCloseClick = () => {
    history.push('/about');
  };

  return (
    <Flex as="header" h="6vh" justifyContent="flex-end">
      <HStack spacing="10px">
        <ColorModeSwitcher />
        <IconButton
          aria-label="Close"
          icon={<CloseIcon />}
          onClick={handleCloseClick}
        />
      </HStack>
    </Flex>
  );
}

ViewerHeader.propTypes = {};

export default ViewerHeader;
