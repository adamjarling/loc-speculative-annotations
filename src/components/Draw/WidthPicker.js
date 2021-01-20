import React from 'react';
import PropTypes from 'prop-types';
import { Box, IconButton, VStack } from '@chakra-ui/react';
import { FaRegDotCircle } from 'react-icons/fa';

export const widths = [
  {
    fontSize: '1rem',
    label: 'extra small',
    pixelWidth: 2,
    size: 'xs',
  },
  {
    fontSize: '1.5rem',
    label: 'small',
    pixelWidth: 12,
    size: 'sm',
  },
  { fontSize: '2rem', label: 'medium', pixelWidth: 24, size: 'md' },
  { fontSize: '2.5rem', label: 'large', pixelWidth: 48, size: 'lg' },
];

function DrawWidthPicker({ color, handleWidthSelect, prevWidth }) {
  const [selectedWidth, setSelectedWidth] = React.useState(prevWidth);

  const handleClick = widthObj => {
    setSelectedWidth(widthObj);
    return handleWidthSelect(widthObj);
  };

  return (
    <VStack>
      {widths.map(widthObj => (
        <IconButton
          key={widthObj.label}
          aria-label={widthObj.label}
          icon={<FaRegDotCircle size={widthObj.fontSize} />}
          color={widthObj.size === selectedWidth.size ? color : ''}
          size={widthObj.size}
          onClick={() => handleClick(widthObj)}
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
