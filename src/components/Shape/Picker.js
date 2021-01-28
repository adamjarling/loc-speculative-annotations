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

const colorBoxSizes = ['30px', '36px'];

const shapes = [
  { name: 'line', icon: <FaSlash /> },
  { name: 'arrow', icon: <BsArrowUpRight /> },
  { name: 'square', icon: <BsSquare /> },
  { name: 'circle', icon: <BsCircle /> },
  { name: 'triangle', icon: <BsTriangle /> },
  { name: 'star', icon: <BsStar /> },
];

function ShapePicker(props) {
  return (
    <VStack>
      {shapes.map(shape => (
        <IconButton icon={shape.icon} />
      ))}
    </VStack>
  );
}

ShapePicker.propTypes = {};

export default ShapePicker;
