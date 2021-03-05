import React from 'react';
import PropTypes from 'prop-types';
import { VStack } from '@chakra-ui/react';
import ToolbarBorderBox from 'components/Toolbar/BorderBox';
import ToolbarBorderBoxInner from 'components/Toolbar/BorderBoxInner';

export const widths = [
  {
    pixelWidth: 2,
    size: 'Sm',
  },
  {
    pixelWidth: 12,
    size: 'Md',
  },
  { pixelWidth: 24, size: 'Lg' },
];

function DrawWidthPicker({ color, handleWidthSelect, width }) {
  return (
    <VStack spacing={3} px={1}>
      {widths.map(widthObj => {
        let imgSrc = require(`images/pen-weight-icons/${color.label}${widthObj.size}.png`);
        return (
          <ToolbarBorderBox
            key={widthObj.size}
            isActive={width && widthObj.size === width.size}
          >
            <ToolbarBorderBoxInner
              bgImage={`url(${imgSrc.default})`}
              bgSize="cover"
              display="block"
              onClick={() => handleWidthSelect(widthObj)}
            />
          </ToolbarBorderBox>
        );
      })}
    </VStack>
  );
}

DrawWidthPicker.propTypes = {
  color: PropTypes.object,
  handleWidthSelect: PropTypes.func,
};

export default DrawWidthPicker;
