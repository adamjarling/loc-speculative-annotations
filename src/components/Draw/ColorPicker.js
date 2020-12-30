import React from 'react';
import PropTypes from 'prop-types';
import brandPalette from 'styles/brandPalette';
import { Box, SimpleGrid } from '@chakra-ui/react';

const colors = Object.keys(brandPalette).map(key => {
  return {
    id: key,
    color: brandPalette[key]['500'],
  };
});

function DrawColorPicker({ handleColorSelect }) {
  return (
    <SimpleGrid columns={3} spacing={2}>
      {colors.map(color => (
        <Box
          key={color.id}
          as="button"
          bg={color.color}
          w="100%"
          h="80px"
          onClick={() => handleColorSelect(color.color)}
        ></Box>
      ))}
    </SimpleGrid>
  );
}

DrawColorPicker.propTypes = {
  handleColorSelect: PropTypes.func,
};

export default DrawColorPicker;
