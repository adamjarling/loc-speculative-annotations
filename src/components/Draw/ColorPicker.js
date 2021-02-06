import React from 'react';
import PropTypes from 'prop-types';
import { Box, VStack } from '@chakra-ui/react';
import { brandColors } from 'styles/brandPalette';

const colorBoxSizes = ['30px', '36px'];
function DrawColorPicker({ handleColorSelect }) {
  return (
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
  );
}

DrawColorPicker.propTypes = {
  handleColorSelect: PropTypes.func,
};

export default DrawColorPicker;
