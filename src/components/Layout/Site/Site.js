import React from 'react';
import { Box, Container, Flex, useColorModeValue } from '@chakra-ui/react';
import LayoutHeader from 'components/Layout/Header';
import PropTypes from 'prop-types';
import Div100vh from 'react-div-100vh';

function LayoutSite({ children }) {
  const bgColor = useColorModeValue('white', 'gray.700');

  return (
    <Flex as={Div100vh} h="100vh" direction="column">
      <LayoutHeader />
      <Box bgColor={bgColor} as="main" flexGrow={1} pt={6}>
        <Container maxW="container.lg">{children}</Container>
      </Box>
    </Flex>
  );
}

LayoutSite.propTypes = {
  childrend: PropTypes.node,
};

export default LayoutSite;
