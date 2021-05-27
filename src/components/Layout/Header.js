import React from 'react';
import {
  Box,
  Button,
  Flex,
  HStack,
  Link,
  useBreakpointValue,
} from '@chakra-ui/react';
import { Link as RRLink, useHistory } from 'react-router-dom';
import EyebrowNav from 'components/Layout/EyebrowNav';
import { BiPencil } from 'react-icons/bi';
import { useLocation, useParams } from 'react-router-dom';
import useButtonSize from 'hooks/use-button-size';
import { ColorModeSwitcher } from 'ColorModeSwitcher';
import MyAnnotations from 'components/MyAnnotations/MyAnnotations';
import Navbar from 'components/Layout/Site/Navbar';

function LayoutHeader() {
  const history = useHistory();
  const fontSizes = ['xs', 'sm', 'md'];
  const params = useParams();
  const buttonSize = useButtonSize();
  const location = useLocation();
  const isMobile = useBreakpointValue({ base: true, sm: false });

  const activeStyles = {
    borderBottom: '2px solid',
    borderColor: 'brand.pink.500',
    fontWeight: 'bold',
  };

  function isApp() {
    return ['/about', '/teach'].indexOf(location.pathname) === -1;
  }

  function isCurrentLink(route) {
    return route === location.pathname;
  }

  return (
    <Box as="header">
      <EyebrowNav />
      {/* <Flex
        justifyContent="space-between"
        alignItems="center"
        zIndex="1"
        px={4}
        py={3}
        fontSize={fontSizes}
      >
        <HStack spacing={[4, 6, 10]}>
          <Link
            as={RRLink}
            to="/about"
            {...(isCurrentLink('/about') && { ...activeStyles })}
          >
            About
          </Link>
          <Link
            as={RRLink}
            to="/teach"
            {...(isCurrentLink('/teach') && { ...activeStyles })}
          >
            Teach
          </Link>
        </HStack>

        {isApp() && !isMobile && <MyAnnotations />}

        {!isApp() && (
          <Button
            colorScheme="brand.pink"
            leftIcon={<BiPencil />}
            onClick={() => history.push('/')}
            disabled={params.id}
            size={buttonSize}
            data-testid="app-link"
          >
            Annotate
          </Button>
        )}
      </Flex> */}
      <Navbar />
    </Box>
  );
}

export default LayoutHeader;
