import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Tooltip } from '@chakra-ui/react';
import {
  useFabricOverlayDispatch,
  useFabricOverlayState,
} from 'context/fabric-overlay-context';
import ToolbarColorOptionsPanel from 'components/Toolbar/ColorOptionsPanel';

const colorBoxSizes = ['30px', '36px'];

function ToolbarColor({ isActive }) {
  const dispatch = useFabricOverlayDispatch();
  const { color } = useFabricOverlayState();

  const handleToolbarClick = () => {
    dispatch({ type: 'updateTool', tool: isActive ? '' : 'COLOR' });
  };

  const handleColorSelect = color => {
    dispatch({ type: 'updateColor', color });
  };

  return (
    <>
      <Tooltip label="Change color" aria-label="Change color" placement="right">
        <Box
          key={color.label}
          as="button"
          bg={color.hex}
          w={colorBoxSizes}
          h={colorBoxSizes}
          onClick={handleToolbarClick}
          borderRadius={3}
        ></Box>
      </Tooltip>

      {isActive && (
        <ToolbarColorOptionsPanel
          color={color}
          handleColorSelect={handleColorSelect}
        />
      )}
    </>
  );
}

ToolbarColor.propTypes = {
  isActive: PropTypes.bool,
};

export default ToolbarColor;
