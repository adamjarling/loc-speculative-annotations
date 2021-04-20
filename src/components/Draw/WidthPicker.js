import React from 'react';
import PropTypes from 'prop-types';
import { VStack } from '@chakra-ui/react';
import ToolbarBorderBox from 'components/Toolbar/BorderBox';
import ToolbarBorderBoxInner from 'components/Toolbar/BorderBoxInner';
import { isMobile, isTablet } from 'react-device-detect';
import { ReactComponent as PenSm } from 'images/pen-weight-icons/SmallStroke.svg';
import { ReactComponent as PenMd } from 'images/pen-weight-icons/MediumStroke.svg';
import { ReactComponent as PenLg } from 'images/pen-weight-icons/ThickStroke.svg';

export const widths = [
  {
    pixelWidth: isMobile && !isTablet ? 6 : 10,
    size: 'Sm',
    IconSVG: PenSm,
  },
  {
    pixelWidth: isMobile && !isTablet ? 12 : 18,
    size: 'Md',
    IconSVG: PenMd,
  },
  { pixelWidth: isMobile && !isTablet ? 24 : 40, size: 'Lg', IconSVG: PenLg },
];

function DrawWidthPicker({ color, handleWidthSelect, width }) {
  console.log(`color`, color);
  return (
    <VStack spacing={3} px={1}>
      {widths.map(widthObj => {
        //let imgSrc = require(`images/pen-weight-icons/${color.label}${widthObj.size}.png`);
        return (
          <ToolbarBorderBox
            key={widthObj.size}
            isActive={width && widthObj.size === width.size}
          >
            <ToolbarBorderBoxInner onClick={() => handleWidthSelect(widthObj)}>
              <widthObj.IconSVG fill={color.hex} height="100%" width="100%" />
            </ToolbarBorderBoxInner>
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
