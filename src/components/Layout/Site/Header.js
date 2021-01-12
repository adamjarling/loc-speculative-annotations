import React from 'react';
import PropTypes from 'prop-types';
import { Box, Center, Flex, HStack, Link } from '@chakra-ui/react';
import { ColorModeSwitcher } from '../../../ColorModeSwitcher';
import { Link as RRLink } from 'react-router-dom';
import SALogo from 'components/SALogo';

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
    <Flex alignItems="center" justifyContent="space-between" h="8vh">
      <SALogo />
      <Box flex="1">
        <HStack as="nav">
          <NavItem label="About" url="#" />
          <NavItem label="Teach" url="#" />
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
