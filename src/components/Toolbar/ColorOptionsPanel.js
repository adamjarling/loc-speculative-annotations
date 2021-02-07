import React from 'react';
import PropTypes from 'prop-types';
import { Box, VStack, useColorModeValue } from '@chakra-ui/react';
import { brandColors } from 'styles/brandPalette';
import ToolbarBorderBox from 'components/Toolbar/BorderBox';
import ToolbarBorderBoxInner from 'components/Toolbar/BorderBoxInner';
function ToolbarColorOptionsPanel({ color, handleColorSelect }) {
  const bg = useColorModeValue('white', 'gray.700');

  return (
    <Box bg={bg} p={3} position="absolute" left="90px" top="20px" shadow="lg">
      <VStack>
        {brandColors.map(brandColor => (
          <ToolbarBorderBox
            key={brandColor.label}
            isActive={color.label === brandColor.label}
          >
            <ToolbarBorderBoxInner
              bg={brandColor.hex}
              onClick={() => handleColorSelect(brandColor)}
            ></ToolbarBorderBoxInner>
          </ToolbarBorderBox>
        ))}
      </VStack>
    </Box>
  );
}

ToolbarColorOptionsPanel.propTypes = {
  color: PropTypes.object,
  handleColorSelect: PropTypes.func,
};

export default ToolbarColorOptionsPanel;
