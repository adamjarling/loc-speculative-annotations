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

export const shapes = [
  { name: 'line', icon: <FaSlash /> },
  { name: 'arrow', icon: <BsArrowUpRight /> },
  { name: 'square', icon: <BsSquare /> },
  { name: 'circle', icon: <BsCircle /> },
  { name: 'triangle', icon: <BsTriangle /> },
  { name: 'star', icon: <BsStar /> },
];

function ShapePicker({ handleShapeSelect }) {
  return (
    <VStack>
      {shapes.map(shape => (
        <IconButton
          key={shape.name}
          icon={shape.icon}
          onClick={() => handleShapeSelect(shape)}
        />
      ))}
    </VStack>
  );
}

ShapePicker.propTypes = { handleShapeSelect: PropTypes.func };

export default ShapePicker;
