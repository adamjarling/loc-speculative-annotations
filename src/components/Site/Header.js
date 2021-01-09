import React from 'react';
import PropTypes from 'prop-types';
import { Box, Center, Flex, HStack, Link } from '@chakra-ui/react';
import { ColorModeSwitcher } from '../../ColorModeSwitcher';
import { Link as RRLink } from 'react-router-dom';

function NavItem({ label, url = '/' }) {
  return (
    <Box p={5} flex="1">
      <Center>
        <Link as={RRLink} to={url}>
          {label}
        </Link>
      </Center>
    </Box>
  );
}

function SiteHeader(props) {
  return (
    <Flex alignItems="center">
      <Box flex="1">
        <HStack as="nav">
          <NavItem label="About" />
          <NavItem label="Teach" />
          <NavItem label="Annotate" />
        </HStack>
      </Box>
      <Box pr={2}>
        <ColorModeSwitcher />
      </Box>
    </Flex>
  );
}

SiteHeader.propTypes = {};

export default SiteHeader;
