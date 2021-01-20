import React from 'react';
import PropTypes from 'prop-types';
import brandPalette from 'styles/brandPalette';
import { Box, SimpleGrid, VStack } from '@chakra-ui/react';

const colors = Object.keys(brandPalette).map(key => {
  return {
    id: key,
    color: brandPalette[key]['500'],
  };
});

const colorBoxSizes = ['30px', '36px'];

function DrawColorPicker({ handleColorSelect }) {
  return (
    <VStack>
      {colors.map(color => (
        <Box
          key={color.id}
          as="button"
          bg={color.color}
          w={colorBoxSizes}
          h={colorBoxSizes}
          onClick={() => handleColorSelect(color.color)}
        ></Box>
      ))}
    </VStack>
  );
}

DrawColorPicker.propTypes = {
  handleColorSelect: PropTypes.func,
};

export default DrawColorPicker;
