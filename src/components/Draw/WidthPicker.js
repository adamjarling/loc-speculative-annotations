import React from 'react';
import PropTypes from 'prop-types';
import { Box, IconButton, VStack } from '@chakra-ui/react';
import { FaRegDotCircle } from 'react-icons/fa';

const widths = [
  {
    fontSize: '1rem',
    label: 'extra small',
    size: 'xs',
  },
  {
    fontSize: '1.5rem',
    label: 'small',
    size: 'sm',
  },
  { fontSize: '2rem', label: 'medium', size: 'md' },
  { fontSize: '2.5rem', label: 'large', size: 'lg' },
];

function DrawWidthPicker({ color, handleWidthSelect, prevPixelWidth }) {
  const [selectedWidth, setSelectedWidth] = React.useState(() => {
    let defaultSize = 'sm';
    if (prevPixelWidth) {
      switch (prevPixelWidth) {
        case 2:
          defaultSize = 'xs';
          break;
        case 12:
          defaultSize = 'sm';
          break;
        case 24:
          defaultSize = 'md';
          break;
        case 48:
          defaultSize = 'lg';
          break;
        default:
          defaultSize = 'sm';
      }
    }
    return defaultSize;
  });

  const handleClick = size => {
    let pixelWidth = 0;
    switch (size) {
      case 'xs':
        pixelWidth = 2;
        break;
      case 'sm':
        pixelWidth = 12;
        break;
      case 'md':
        pixelWidth = 24;
        break;
      case 'lg':
        pixelWidth = 48;
        break;
      default:
        pixelWidth = 2;
    }
    setSelectedWidth(size);
    return handleWidthSelect(pixelWidth);
  };

  return (
    <VStack>
      {widths.map(widthObj => (
        <IconButton
          key={widthObj.label}
          aria-label={widthObj.label}
          icon={<FaRegDotCircle size={widthObj.fontSize} />}
          color={widthObj.size === selectedWidth ? color : ''}
          size={widthObj.size}
          onClick={() => handleClick(widthObj.size)}
        />
      ))}
    </VStack>
  );
}

DrawWidthPicker.propTypes = {
  color: PropTypes.string,
  handleWidthSelect: PropTypes.func,
};

export default DrawWidthPicker;
