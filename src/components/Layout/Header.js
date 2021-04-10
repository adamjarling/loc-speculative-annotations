import React from 'react';
import { Box, Button, Flex, HStack, Link } from '@chakra-ui/react';
import SALogo from 'components/SALogo';
import { Link as RRLink, useHistory } from 'react-router-dom';
import EyebrowNav from 'components/Layout/EyebrowNav';
import { BiPencil } from 'react-icons/bi';
import { useParams } from 'react-router-dom';
import useButtonSize from 'hooks/use-button-size';

function LayoutHeader() {
  const history = useHistory();
  const fontSizes = ['xs', 'sm', 'md'];
  const params = useParams();
  const buttonSize = useButtonSize();

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
            size={buttonSize}
            data-testid="app-link"
          >
            Annotate
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
}

export default LayoutHeader;
