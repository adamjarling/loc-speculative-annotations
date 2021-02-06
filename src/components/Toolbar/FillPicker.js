import React from 'react';
import PropTypes from 'prop-types';
import { IconButton, Text, VStack } from '@chakra-ui/react';
import { BsDropletFill, BsDroplet } from 'react-icons/bs';

function ToolbarFillPicker({ color, handleFillSelect, isFill }) {
  return (
    <>
      <Text fontSize="xs" textAlign="center" mb={1}>
        Fill
      </Text>
      <VStack color={color.hex}>
        <IconButton
          icon={<BsDropletFill />}
          aria-label="Fill"
          variant={isFill ? 'solid' : 'ghost'}
          onClick={() => handleFillSelect(true)}
        />
        <IconButton
          icon={<BsDroplet />}
          aria-label="Outline"
          variant={isFill ? 'ghost' : 'solid'}
          onClick={() => handleFillSelect(false)}
        />
      </VStack>
    </>
  );
}

ToolbarFillPicker.propTypes = {
  color: PropTypes.object,
  handleFillSelect: PropTypes.func,
  isFill: PropTypes.bool,
};

export default ToolbarFillPicker;
