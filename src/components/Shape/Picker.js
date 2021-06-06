import React from 'react';
import PropTypes from 'prop-types';
import { IconButton, Text, VStack } from '@chakra-ui/react';
import { BsCircle, BsSquare } from 'react-icons/bs';
import { useWindowHeight } from '@react-hook/window-size';
import { isMobile, isTablet } from 'react-device-detect';

export const shapes = [
  { name: 'square', icon: <BsSquare /> },
  { name: 'circle', icon: <BsCircle /> },
];

function ShapePicker({ activeShape, color, handleShapeSelect }) {
  const windowHeight = useWindowHeight();
  let btnSize = 'lg';

  if (windowHeight <= 645) {
    btnSize = 'md';
  }
  if (isMobile && !isTablet) {
    btnSize = 'md';
  }

  return (
    <>
      <Text fontSize="xs" textAlign="center" my={1}>
        Shape
      </Text>
      <VStack color={color.hex} data-testid="shape-options-wrapper">
        {shapes.map(shape => (
          <IconButton
            key={shape.name}
            data-testid={`shape-option-${shape.name}`}
            icon={shape.icon}
            onClick={() => handleShapeSelect(shape)}
            size={btnSize}
            variant={
              activeShape && activeShape.name === shape.name ? 'solid' : 'ghost'
            }
          />
        ))}
      </VStack>
    </>
  );
}

ShapePicker.propTypes = {
  activeShape: PropTypes.object,
  color: PropTypes.object,
  handleFillSelect: PropTypes.func,
  handleShapeSelect: PropTypes.func,
  isFill: PropTypes.bool,
};

export default ShapePicker;
