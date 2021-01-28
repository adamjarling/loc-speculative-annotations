import React from 'react';
import PropTypes from 'prop-types';
import { Box, VStack } from '@chakra-ui/react';
import brandPalette from 'styles/brandPalette';

export const widths = [
  {
    pixelWidth: 2,
    size: 'Sm',
  },
  {
    pixelWidth: 12,
    size: 'Md',
  },
  { pixelWidth: 24, size: 'Lg' },
];

const activeStyles = {
  border: '1px',
  borderColor: brandPalette.green['500'],
};

// Responsive size of control
const widthBoxSize = ['30px', '36px'];

function DrawWidthPicker({ color, handleWidthSelect, width }) {
  return (
    <VStack>
      {widths.map(widthObj => {
        let imgSrc = require(`images/pen-weight-icons/${color.label}${widthObj.size}.png`);
        return (
          <Box
            key={widthObj.size}
            as="button"
            bgImage={`url(${imgSrc.default})`}
            bgSize="cover"
            w={widthBoxSize}
            h={widthBoxSize}
            display="block"
            onClick={() => handleWidthSelect(widthObj)}
            {...(widthObj.size === width.size && { ...activeStyles })}
          />
        );
      })}
    </VStack>
  );
}

DrawWidthPicker.propTypes = {
  color: PropTypes.object,
  handleWidthSelect: PropTypes.func,
};

export default DrawWidthPicker;
