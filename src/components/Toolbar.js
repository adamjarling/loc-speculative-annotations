import React from 'react';
import PropTypes from 'prop-types';
import { FaEraser, FaPen } from 'react-icons/fa';
import { BiText } from 'react-icons/bi';
import {
  Box,
  Button,
  Container,
  Tooltip,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import StampDrawer from 'components/Stamp/Drawer';
import Draw from 'components/Draw/Draw';
import TypeText from 'components/TypeText/TypeText';
import { useFabricOverlayState } from 'context/fabric-overlay-context';

import 'styles/styles.css';

function Toolbar({
  handleClearCanvas,
  handleNewBoxClick,
  handleRedBoxClick,
  handleToolSelect,
}) {
  const { activeTool } = useFabricOverlayState();

  return (
    <Box>
      <Wrap spacing="2" as="nav">
        {/* <WrapItem>
          <Button
            onClick={() => handleToolSelect('pen')}
            className={activeTool === 'pen' ? 'activeButton' : ''}
          >
            <FaPen />
          </Button>
        </WrapItem>

        <WrapItem>
          <Button
            onClick={() => handleToolSelect('eraser')}
            className={activeTool === 'eraser' ? 'activeButton' : ''}
          >
            <FaEraser />
          </Button>
        </WrapItem>

        <WrapItem>
          <Button
            onClick={() => handleToolSelect('text')}
            className={activeTool === 'text' ? 'activeButton' : ''}
          >
            <BiText />
          </Button>
        </WrapItem> */}

        <WrapItem>
          <Draw isActive={activeTool === 'DRAW'} />
        </WrapItem>

        <WrapItem>
          <StampDrawer />
        </WrapItem>

        <WrapItem>
          <TypeText />
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
  handleNewBoxClick: PropTypes.func,
  handleRedBoxClick: PropTypes.func,
  handleToolSelect: PropTypes.func,
};

export default Toolbar;
