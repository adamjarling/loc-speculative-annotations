import React from 'react';
import PropTypes from 'prop-types';
import { Box, Divider, IconButton, Text, VStack } from '@chakra-ui/react';
import {
  BsArrowUpRight,
  BsCircle,
  BsSquare,
  BsStar,
  BsTriangle,
} from 'react-icons/bs';
import { FaSlash } from 'react-icons/fa';
import ToolbarFillPicker from 'components/Toolbar/FillPicker';

export const shapes = [
  { name: 'line', icon: <FaSlash /> },
  { name: 'arrow', icon: <BsArrowUpRight /> },
  { name: 'square', icon: <BsSquare /> },
  { name: 'circle', icon: <BsCircle /> },
  { name: 'triangle', icon: <BsTriangle /> },
  { name: 'star', icon: <BsStar /> },
];

function ShapePicker({
  activeShape,
  color,
  handleFillSelect,
  handleShapeSelect,
  isFill,
}) {
  return (
    <>
      <Text fontSize="xs" textAlign="center" mb={1}>
        Shape
      </Text>
      <VStack color={color.hex}>
        {shapes.map(shape => (
          <IconButton
            key={shape.name}
            icon={shape.icon}
            onClick={() => handleShapeSelect(shape)}
            variant={
              activeShape && activeShape.name === shape.name ? 'solid' : 'ghost'
            }
          />
        ))}
      </VStack>
      <Divider py={2} mb={2} />
      <ToolbarFillPicker
        color={color}
        handleFillSelect={handleFillSelect}
        isFill={isFill}
      />
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
