import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Divider,
  Text,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { brandColors } from 'styles/brandPalette';

const colorBoxSizes = ['30px', '36px'];

function ToolbarColorOptionsPanel({ handleColorSelect }) {
  const bg = useColorModeValue('white', 'gray.700');

  return (
    <Box bg={bg} p={3} position="absolute" left="90px" top="20px" shadow="lg">
      <VStack>
        {brandColors.map(color => (
          <Box
            key={color.label}
            as="button"
            bg={color.hex}
            w={colorBoxSizes}
            h={colorBoxSizes}
            onClick={() => handleColorSelect(color)}
          ></Box>
        ))}
      </VStack>
    </Box>
  );
}

ToolbarColorOptionsPanel.propTypes = {
  handleColorSelect: PropTypes.func,
};

export default ToolbarColorOptionsPanel;
