import React from 'react';
import PropTypes from 'prop-types';
import { Button, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

function Share(props) {
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
        Share
      </MenuButton>
      <MenuList>
        <MenuItem>#LOCAnnotations</MenuItem>
        <MenuItem>Instagram</MenuItem>
        <MenuItem>Shareable link</MenuItem>
      </MenuList>
    </Menu>
  );
}

Share.propTypes = {};

export default Share;
