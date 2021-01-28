import React from 'react';
import PropTypes from 'prop-types';
import brandPalette from 'styles/brandPalette';
import { Box, VStack } from '@chakra-ui/react';

export const colors = [
  {
    label: 'green',
    hex: brandPalette.green['500'],
  },
  {
    label: 'pastelBlue',
    hex: brandPalette.pastelBlue['500'],
  },
  {
    label: 'pastelGreen',
    hex: brandPalette.pastelGreen['500'],
  },
  {
    label: 'pastelPurple',
    hex: brandPalette.pastelPurple['500'],
  },
  {
    label: 'pink',
    hex: brandPalette.pink['500'],
  },
  {
    label: 'teal',
    hex: brandPalette.teal['500'],
  },
  {
    label: 'yellow',
    hex: brandPalette.yellow['500'],
  },
];

const colorBoxSizes = ['30px', '36px'];

function DrawColorPicker({ handleColorSelect }) {
  return (
    <VStack>
      {colors.map(color => (
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
