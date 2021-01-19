import React from 'react';
import {
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Image,
  Link,
  Tooltip,
  useBreakpointValue,
} from '@chakra-ui/react';
import { FaPencilAlt } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import SALogo from 'components/SALogo';
import { Link as RRLink } from 'react-router-dom';
import EyebrowNav from 'components/Layout/EyebrowNav';

function LayoutAppHeader(props) {
  const history = useHistory();
  const fontSizes = ['xs', 'sm', 'md'];
  const buttonSize = useBreakpointValue({ base: 'xs', sm: 'sm', md: 'md' });

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
          <Link as={RRLink} to="/about">
            Teach
          </Link>
          <Button leftIcon={<FaPencilAlt />} size={buttonSize}>
            Annotate
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
}

LayoutAppHeader.propTypes = {};

export default LayoutAppHeader;
