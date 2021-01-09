import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Center,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from '@chakra-ui/react';

function DrawWidthPicker({ color, handleWidthSelect, prevWidth }) {
  const [width, setWidth] = React.useState(prevWidth);

  function handleOnChange(val) {
    setWidth(val);
  }

  function handleOnChangeEnd(val) {
    handleWidthSelect(val);
  }

  return (
    <>
      <Slider
        aria-label="slider-brush-stroke-width"
        defaultValue={width}
        max={100}
        min={5}
        onChange={handleOnChange}
        onChangeEnd={handleOnChangeEnd}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>

      <Center mt="6">
        <Box
          borderRadius="50%"
          w={`${width}px`}
          h={`${width}px`}
          bg={color}
        ></Box>
      </Center>
    </>
  );
}

DrawWidthPicker.propTypes = {
  color: PropTypes.string,
  handleWidthSelect: PropTypes.func,
};

export default DrawWidthPicker;
