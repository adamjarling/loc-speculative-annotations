import React from 'react';
import { Box, Divider, Wrap, WrapItem } from '@chakra-ui/react';
import Stamp from 'components/Stamp/Stamp';
import Draw from 'components/Draw/Draw';
import Shape from 'components/Shape/Shape';
import { useFabricOverlayState } from 'context/fabric-overlay-context';
import TypeText from 'components/TypeText/TypeText';
import ToolbarPointer from 'components/Toolbar/PointerControl';
import RemoveObject from 'components/RemoveObject';
import StampQuestion from 'components/StampQuestion/StampQuestion';
import useFabricHelpers from 'hooks/use-fabric-helpers';

import 'styles/styles.css';

function ToolBarDivider() {
  return (
    <WrapItem w="100%">
      <Divider />
    </WrapItem>
  );
}

function Toolbar() {
  const { activeTool } = useFabricOverlayState();
  const { deselectAll } = useFabricHelpers();

  /**
   * Deselect all Fabric objects when a new tool is selected
   */
  React.useEffect(() => {
    deselectAll();
  }, [activeTool]);

  return (
    <Box pt={3} position="relative">
      <Wrap spacing="2" as="nav" direction="column" align="center">
        <WrapItem>
          <StampQuestion isActive={activeTool === 'STAMP_QUESTION'} />
        </WrapItem>

        <ToolBarDivider />

        <WrapItem>
          <ToolbarPointer isActive={activeTool === 'POINTER'} />
        </WrapItem>

        <WrapItem>
          <TypeText isActive={activeTool === 'TYPE'} />
        </WrapItem>

        <WrapItem>
          <Draw isActive={activeTool === 'DRAW'} />
        </WrapItem>

        <WrapItem>
          <Draw isActive={activeTool === 'HIGHLIGHTER'} isHighlighter />
        </WrapItem>

        <WrapItem>
          <Shape isActive={activeTool === 'SHAPE'} />
        </WrapItem>

        <WrapItem>
          <Stamp isActive={activeTool === 'STAMP'} />
        </WrapItem>

        <ToolBarDivider />

        <WrapItem>
          <RemoveObject />
        </WrapItem>

        <WrapItem>
          <Divider />
        </WrapItem>
      </Wrap>
    </Box>
  );
}

export default Toolbar;
