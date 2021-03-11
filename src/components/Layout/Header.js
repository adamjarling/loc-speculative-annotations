import React from 'react';
import { Box, Button, Flex, HStack, Link } from '@chakra-ui/react';
import SALogo from 'components/SALogo';
import { Link as RRLink, useHistory, useLocation } from 'react-router-dom';
import EyebrowNav from 'components/Layout/EyebrowNav';
import useButtonSize from 'hooks/use-button-size';
import MyAnnotations from 'components/MyAnnotations/MyAnnotations';
import { BiPencil } from 'react-icons/bi';

function LayoutHeader() {
  const location = useLocation();
  const history = useHistory();
  const fontSizes = ['xs', 'sm', 'md'];
  const buttonSize = useButtonSize();

  return (
    <Box as="header">
      <EyebrowNav />
      <Flex
        justifyContent="space-between"
        alignItems="center"
        boxShadow="md"
        zIndex="1"
        px={4}
        fontSize={fontSizes}
      >
        <SALogo />
        <HStack spacing={[4, 6, 10]}>
          <Link as={RRLink} to="/about">
            About
          </Link>
          <Link as={RRLink} to="/about#teach">
            Teach
          </Link>
          <Button leftIcon={<BiPencil />} onClick={() => history.push('/')}>
            Annotate
          </Button>
          {/* My Annotations - Saving and navigating to saved annotations functionality */}
          {/* {location.pathname === '/about' ? (
            <Button onClick={() => history.push('/')}>Annotate</Button>
          ) : (
            <MyAnnotations />
          )} */}
        </HStack>
      </Flex>
    </Box>
  );
}

export default LayoutHeader;
