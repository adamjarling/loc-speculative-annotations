import React from 'react';
import PropTypes from 'prop-types';
import { FaEraser, FaPen } from 'react-icons/fa';
import { BiText } from 'react-icons/bi';
import { Button, Container, Tooltip, Wrap, WrapItem } from '@chakra-ui/react';
import StampDrawer from 'components/Stamp/Drawer';

import 'styles/styles.css';

function Toolbar({
  activeTool,
  handleClearCanvas,
  handleNewBoxClick,
  handleRedBoxClick,
  handleToolSelect,
}) {
  return (
    <Container centerContent maxW="100%">
      <Wrap spacing="6" mb={6} as="nav">
        <WrapItem>
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
        </WrapItem>

        <WrapItem>
          <Button onClick={handleRedBoxClick}>Draw a red box</Button>
        </WrapItem>

        <WrapItem>
          <Button onClick={handleNewBoxClick}>Draw test box</Button>
        </WrapItem>

        <WrapItem>
          <StampDrawer />
        </WrapItem>

        <WrapItem>
          <Button onClick={handleClearCanvas} variant="outline">
            Clear canvas
          </Button>
        </WrapItem>
      </Wrap>
    </Container>
  );
}

Toolbar.propTypes = {
  activeTool: PropTypes.string,
  handleClearCanvas: PropTypes.func,
  handleNewBoxClick: PropTypes.func,
  handleRedBoxClick: PropTypes.func,
  handleToolSelect: PropTypes.func,
};

export default Toolbar;
