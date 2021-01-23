import React from 'react';
import PropTypes from 'prop-types';
import { Box, Divider, Wrap, WrapItem } from '@chakra-ui/react';
import Stamp from 'components/Stamp/Stamp';
import Draw from 'components/Draw/Draw';
import { useFabricOverlayState } from 'context/fabric-overlay-context';
import TypeTextDrawer from 'components/TypeText/Drawer';
import TypeTextPointAndDrop from 'components/TypeText/PointAndDrop';
import { ImBubbles3 } from 'react-icons/im';
import { MdFormatQuote } from 'react-icons/md';
import { FaHandPointRight } from 'react-icons/fa';
import ToolbarButton from 'components/Toolbar/Button';
import ToolbarPointer from 'components/Toolbar/PointerControl';
import RemoveObject from 'components/RemoveObject';

import 'styles/styles.css';

function Toolbar() {
  const { activeTool } = useFabricOverlayState();

  return (
    <Box pt={3} position="relative">
      <Wrap spacing="2" as="nav" direction="column" align="center">
        <WrapItem>
          <ToolbarPointer isActive={activeTool === 'POINTER'} />
        </WrapItem>

        <WrapItem>
          <TypeTextPointAndDrop isActive={activeTool === 'TYPE'} />
        </WrapItem>

        <WrapItem>
          <Draw isActive={activeTool === 'DRAW'} />
        </WrapItem>

        <WrapItem>
          <Stamp isActive={activeTool === 'STAMP'} />
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
          <Divider />
        </WrapItem>

        <WrapItem>
          <RemoveObject />
          {/* <ClearCanvas /> */}
        </WrapItem>
      </Wrap>
    </Box>
  );
}

export default Toolbar;
