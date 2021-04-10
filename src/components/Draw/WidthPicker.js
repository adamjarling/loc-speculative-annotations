import React from 'react';
import PropTypes from 'prop-types';
import { VStack } from '@chakra-ui/react';
import ToolbarBorderBox from 'components/Toolbar/BorderBox';
import ToolbarBorderBoxInner from 'components/Toolbar/BorderBoxInner';
import { isMobile, isTablet } from 'react-device-detect';

export const widths = [
  {
    pixelWidth: isMobile && !isTablet ? 6 : 10,
    size: 'Sm',
  },
  {
    pixelWidth: isMobile && !isTablet ? 12 : 24,
    size: 'Md',
  },
  { pixelWidth: isMobile && !isTablet ? 24 : 48, size: 'Lg' },
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
