import React from 'react';
import PropTypes from 'prop-types';
import { HStack, useBreakpointValue } from '@chakra-ui/react';
import { brandColors } from 'styles/brandPalette';
import ToolbarBorderBox from 'components/Toolbar/BorderBox';
import ToolbarBorderBoxInner from 'components/Toolbar/BorderBoxInner';

function ColorOptionsPanel({ buttonSize, color, handleColorSelect }) {
  const stackSpacing = useBreakpointValue({ sm: '5px', md: '10px' });

  return (
    <HStack spacing={stackSpacing}>
      {brandColors.map(brandColor => (
        <ToolbarBorderBox
          key={brandColor.label}
          w={buttonSize?.width}
          h={buttonSize?.height}
          isActive={color.label === brandColor.label}
          data-testid={brandColor.label}
        >
          <ToolbarBorderBoxInner
            bg={brandColor.hex}
            onClick={() => handleColorSelect(brandColor)}
          />
        </ToolbarBorderBox>
      ))}
    </HStack>
  );
}

ColorOptionsPanel.propTypes = {
  buttonSize: PropTypes.object,
  color: PropTypes.object,
  handleColorSelect: PropTypes.func,
};

export default ColorOptionsPanel;
