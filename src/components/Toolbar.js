import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Wrap, WrapItem } from '@chakra-ui/react';
import Stamp from 'components/Stamp/Stamp';
import Draw from 'components/Draw/Draw';
import TypeText from 'components/TypeText/TypeText';
import { useFabricOverlayState } from 'context/fabric-overlay-context';

import 'styles/styles.css';

function Toolbar({ handleClearCanvas, handleRedBoxClick }) {
  const { activeTool } = useFabricOverlayState();

  return (
    <Box>
      <Wrap spacing="2" as="nav">
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
          <Button onClick={handleRedBoxClick}>Red box</Button>
        </WrapItem>

        <WrapItem>
          <Button onClick={handleClearCanvas} variant="outline">
            Clear canvas
          </Button>
        </WrapItem>

        <WrapItem>
          <Button onClick={handleClearCanvas} variant="outline">
            Clear item
          </Button>
        </WrapItem>
      </Wrap>
    </Box>
  );
}

Toolbar.propTypes = {
  handleClearCanvas: PropTypes.func,
  handleRedBoxClick: PropTypes.func,
};

export default Toolbar;
