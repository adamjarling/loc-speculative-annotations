import React from 'react';
import PropTypes from 'prop-types';
import { Box, IconButton, VStack } from '@chakra-ui/react';
import { FiType } from 'react-icons/fi';

export const sizes = [
  {
    fontSize: '16px',
    label: 'extra small',
    fontSizePixels: 24,
    size: 'xs',
  },
  {
    fontSize: '32px',
    label: 'small',
    fontSizePixels: 48,
    size: 'sm',
  },
  { fontSize: '48px', label: 'medium', fontSizePixels: 72, size: 'md' },
];

const activeClasses = {
  border: '2px',
  borderColor: 'brand.neonGreen.500',
};

function TypeTextSizePicker({ handleSizeChange, activeSize }) {
  return (
    <VStack>
      {sizes.map(sizeObj => (
        <IconButton
          key={sizeObj.label}
          aria-label={sizeObj.label}
          icon={<FiType size={sizeObj.fontSize} />}
          size={sizeObj.size}
          onClick={() => handleSizeChange(sizeObj)}
          {...(activeSize.label === sizeObj.label && { ...activeClasses })}
        />
      ))}
    </VStack>
  );
}

TypeTextSizePicker.propTypes = {
  color: PropTypes.string,
  handleSizeChange: PropTypes.func,
};

export default TypeTextSizePicker;
