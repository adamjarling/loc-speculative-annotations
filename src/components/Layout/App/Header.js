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
} from '@chakra-ui/react';
import { FaPencilAlt } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import SALogo from 'components/SALogo';
import { Link as RRLink } from 'react-router-dom';
import EyebrowNav from 'components/Layout/EyebrowNav';

function LayoutAppHeader(props) {
  const history = useHistory();

  return (
    <Box as="header">
      <EyebrowNav />
      <Flex
        justifyContent="space-between"
        alignItems="center"
        boxShadow="md"
        zIndex="1"
        px={4}
      >
        <SALogo />
        <HStack spacing="40px">
          <Link as={RRLink} to="/about">
            About
          </Link>
          <Link as={RRLink} to="/about">
            Teach
          </Link>
          <Button leftIcon={<FaPencilAlt />}>Annotate</Button>
        </HStack>

        {/* <HStack spacing="10px">
          <Share />
          <SaveCanvas />
          <Tooltip label="Undo" aria-label="Undo">
            <IconButton icon={<ImUndo />} aria-label="Undo" disabled />
          </Tooltip>
          <ColorModeSwitcher />
        </HStack> */}
      </Flex>
    </Box>
  );
}

LayoutAppHeader.propTypes = {};

export default LayoutAppHeader;
