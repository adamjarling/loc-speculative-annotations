import React from 'react';
import PropTypes from 'prop-types';
import { Box, IconButton, VStack } from '@chakra-ui/react';
import {
  BsArrowUpRight,
  BsCircle,
  BsSquare,
  BsStar,
  BsTriangle,
} from 'react-icons/bs';
import { FaSlash } from 'react-icons/fa';

const activeStyles = {
  border: '2px solid',
};

export const shapes = [
  { name: 'line', icon: <FaSlash /> },
  { name: 'arrow', icon: <BsArrowUpRight /> },
  { name: 'square', icon: <BsSquare /> },
  { name: 'circle', icon: <BsCircle /> },
  { name: 'triangle', icon: <BsTriangle /> },
  { name: 'star', icon: <BsStar /> },
];

function ShapePicker({ activeShape, handleShapeSelect }) {
  return (
    <VStack>
      {shapes.map(shape => (
        <IconButton
          key={shape.name}
          icon={shape.icon}
          onClick={() => handleShapeSelect(shape)}
          {...(activeShape &&
            activeShape.name === shape.name && { ...activeStyles })}
        />
      ))}
    </VStack>
  );
}

ShapePicker.propTypes = {
  activeShape: PropTypes.object,
  handleShapeSelect: PropTypes.func,
};

export default ShapePicker;
