import React from 'react';
import PropTypes from 'prop-types';
import { FaEraser, FaPen } from 'react-icons/fa';
import { BiText } from 'react-icons/bi';
import { Button, ButtonGroup, DarkMode } from '@chakra-ui/react';
import '../styles/styles.css';

function Toolbar({ handleToolSelect, activeTool }) {
  return (
    <ButtonGroup size="lg" spacing="6" mb={6}>
      <Button
        onClick={() => handleToolSelect('pen')}
        className={activeTool === 'pen' ? 'activeButton' : ''}
      >
        <FaPen />
      </Button>
      <Button
        onClick={() => handleToolSelect('eraser')}
        className={activeTool === 'eraser' ? 'activeButton' : ''}
      >
        <FaEraser />
      </Button>
      <Button
        onClick={() => handleToolSelect('text')}
        className={activeTool === 'text' ? 'activeButton' : ''}
      >
        <BiText />
      </Button>
    </ButtonGroup>
  );
}

Toolbar.propTypes = {};

export default Toolbar;
