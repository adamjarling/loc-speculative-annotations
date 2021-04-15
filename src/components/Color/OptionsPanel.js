import React from 'react';
import PropTypes from 'prop-types';
import { HStack, useBreakpointValue } from '@chakra-ui/react';
import { brandColors } from 'styles/brandPalette';
import ToolbarBorderBox from 'components/Toolbar/BorderBox';
import ToolbarBorderBoxInner from 'components/Toolbar/BorderBoxInner';
import { Fade } from '@chakra-ui/react';

function ColorOptionsPanel({ color, handleColorSelect, isVisible }) {
  // if (!isVisible) return null;
  const buttonSize = useBreakpointValue({
    base: { height: '24px', width: '24px' },
    lg: { height: '30px', width: '30px' },
  });
  console.log(`buttonSize`, buttonSize);

  return (
    <Fade in={isVisible}>
      <HStack spacing={3}>
        {brandColors.map(brandColor => (
          <ToolbarBorderBox
            key={brandColor.label}
            w={buttonSize?.width}
            h={buttonSize?.height}
            isActive={color.label === brandColor.label}
          >
            <ToolbarBorderBoxInner
              bg={brandColor.hex}
              onClick={() => handleColorSelect(brandColor)}
            ></ToolbarBorderBoxInner>
          </ToolbarBorderBox>
        ))}
      </HStack>
    </Fade>
  );
}

ColorOptionsPanel.propTypes = {
  color: PropTypes.object,
  handleColorSelect: PropTypes.func,
  isVisible: PropTypes.bool,
};

export default ColorOptionsPanel;
