import React from 'react';
import PropTypes from 'prop-types';
import { Box, Divider, Wrap, WrapItem } from '@chakra-ui/react';
import Stamp from 'components/Stamp/Stamp';
import Draw from 'components/Draw/Draw';
import TypeText from 'components/TypeText/TypeText';
import { useFabricOverlayState } from 'context/fabric-overlay-context';
import ClearCanvas from 'components/ClearCanvas';

import 'styles/styles.css';

function Toolbar(props) {
  const { activeTool } = useFabricOverlayState();

  return (
    <Box mt="6vh">
      <Wrap spacing="2" as="nav" direction="column" align="center">
        <WrapItem>
          <Draw isActive={activeTool === 'DRAW'} />
        </WrapItem>

        <WrapItem>
          <Stamp isActive={activeTool === 'STAMP'} />
        </WrapItem>

        <WrapItem>
          <TypeText isActive={activeTool === 'TYPE'} />
        </WrapItem>

        <WrapItem>
          <Divider />
        </WrapItem>

        <WrapItem>
          <ClearCanvas />
        </WrapItem>
      </Wrap>
    </Box>
  );
}

Toolbar.propTypes = {};

export default Toolbar;
