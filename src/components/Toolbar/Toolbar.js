import React from 'react';
import PropTypes from 'prop-types';
import { Box, Divider, Wrap, WrapItem } from '@chakra-ui/react';
import Stamp from 'components/Stamp/Stamp';
import Draw from 'components/Draw/Draw';
import { useFabricOverlayState } from 'context/fabric-overlay-context';
import ClearCanvas from 'components/ClearCanvas';
import TypeTextDrawer from 'components/TypeText/Drawer';
import { ImBubbles3 } from 'react-icons/im';
import { MdFormatQuote } from 'react-icons/md';
import { FaHandPointRight } from 'react-icons/fa';
import ToolbarButton from 'components/Toolbar/Button';

import 'styles/styles.css';

function Toolbar() {
  const { activeTool } = useFabricOverlayState();

  return (
    <Box>
      <Wrap spacing="2" as="nav" direction="column" align="center">
        <WrapItem>
          <Draw isActive={activeTool === 'DRAW'} />
        </WrapItem>

        <WrapItem>
          <Stamp isActive={activeTool === 'STAMP'} />
        </WrapItem>

        <WrapItem>
          <TypeTextDrawer isActive={activeTool === 'TYPE'} />
        </WrapItem>

        <WrapItem>
          <Divider />
        </WrapItem>

        <WrapItem>
          <ToolbarButton icon={<ImBubbles3 />} label="Speech bubble" disabled />
        </WrapItem>

        <WrapItem>
          <ToolbarButton
            icon={<MdFormatQuote />}
            label="Punctuation"
            disabled
          />
        </WrapItem>

        <WrapItem>
          <ToolbarButton
            icon={<FaHandPointRight />}
            label="Hand point"
            disabled
          />
        </WrapItem>

        <WrapItem>
          <ClearCanvas />
        </WrapItem>
      </Wrap>
    </Box>
  );
}

export default Toolbar;
