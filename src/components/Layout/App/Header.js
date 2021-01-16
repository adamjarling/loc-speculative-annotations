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
import { FaSave } from 'react-icons/fa';
import { ColorModeSwitcher } from '../../../ColorModeSwitcher';
import { ImUndo } from 'react-icons/im';
import { useHistory } from 'react-router-dom';
import SALogo from 'components/SALogo';
import Share from 'components/Share/Share';
import { Link as RRLink } from 'react-router-dom';
import SaveCanvas from 'components/Save/Canvas';

function LayoutAppHeader(props) {
  const history = useHistory();

  return (
    <Flex
      as="header"
      h="8vh"
      justifyContent="space-between"
      alignItems="center"
      boxShadow="base"
      zIndex="1"
      px={4}
    >
      <SALogo />
      <Link as={RRLink} to="/about">
        About
      </Link>
      <Link as={RRLink} to="/about">
        Teach
      </Link>
      <Link>Annotate</Link>

      <HStack spacing="10px">
        <Share />
        <SaveCanvas />
        <Tooltip label="Undo" aria-label="Undo">
          <IconButton icon={<ImUndo />} aria-label="Undo" disabled />
        </Tooltip>
        <ColorModeSwitcher />
      </HStack>
    </Flex>
  );
}

LayoutAppHeader.propTypes = {};

export default LayoutAppHeader;
