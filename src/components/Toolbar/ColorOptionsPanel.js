import React from 'react';
import PropTypes from 'prop-types';
import { Box, VStack, useColorModeValue } from '@chakra-ui/react';
import { brandColors } from 'styles/brandPalette';

const colorBoxSizes = ['30px', '36px'];
const borderRadius = 3;

function ToolbarColorOptionsPanel({ color, handleColorSelect }) {
  const bg = useColorModeValue('white', 'gray.700');

  const activeStyles = {
    borderWidth: '1px',
    padding: '3px',
    borderColor: useColorModeValue('gray.300', 'white'),
  };

  return (
    <Box bg={bg} p={3} position="absolute" left="90px" top="20px" shadow="lg">
      <VStack>
        {brandColors.map(brandColor => (
          <Box
            w={colorBoxSizes}
            h={colorBoxSizes}
            borderRadius={borderRadius}
            {...(color.label === brandColor.label && { ...activeStyles })}
          >
            <Box
              key={brandColor.label}
              as="button"
              w="100%"
              height="100%"
              bg={brandColor.hex}
              onClick={() => handleColorSelect(brandColor)}
              borderRadius={borderRadius}
            ></Box>
          </Box>
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
