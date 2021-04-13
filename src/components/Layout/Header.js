import React from 'react';
import { Box, Button, Flex, HStack, Link } from '@chakra-ui/react';
import SALogo from 'components/SALogo';
import { Link as RRLink, useHistory } from 'react-router-dom';
import EyebrowNav from 'components/Layout/EyebrowNav';
import { BiPencil } from 'react-icons/bi';
import { useLocation, useParams } from 'react-router-dom';
import useButtonSize from 'hooks/use-button-size';

function LayoutHeader() {
  const history = useHistory();
  const fontSizes = ['xs', 'sm', 'md'];
  const params = useParams();
  const buttonSize = useButtonSize();
  const location = useLocation();

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
      <Flex
        justifyContent="space-between"
        alignItems="center"
        zIndex="1"
        px={4}
        py={1}
        fontSize={fontSizes}
      >
        <HStack spacing={[4, 6, 10]}>
          <SALogo />
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
      </Flex>
    </Box>
  );
}

export default LayoutHeader;
