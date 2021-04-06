import React from 'react';
import { Box, Button, Flex, HStack, Link } from '@chakra-ui/react';
import SALogo from 'components/SALogo';
import { Link as RRLink, useHistory } from 'react-router-dom';
import EyebrowNav from 'components/Layout/EyebrowNav';
import { BiPencil } from 'react-icons/bi';
import { useLocation, useParams } from 'react-router-dom';

function LayoutHeader() {
  const history = useHistory();
  const fontSizes = ['xs', 'sm', 'md'];
  const params = useParams();
  console.log(`params`, params);

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
        <SALogo />
        <HStack spacing={[4, 6, 10]}>
          <Link as={RRLink} to="/about">
            About
          </Link>
          <Link as={RRLink} to="/about#teach">
            Teach
          </Link>
          <Button
            leftIcon={<BiPencil />}
            onClick={() => history.push('/')}
            disabled={params.id}
          >
            Annotate
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
}

export default LayoutHeader;
