import React from 'react';
import PropTypes from 'prop-types';
import { VStack } from '@chakra-ui/react';
import ToolbarBorderBox from 'components/Toolbar/BorderBox';
import ToolbarBorderBoxInner from 'components/Toolbar/BorderBoxInner';
import stamp1 from 'images/stamps/stamp1.svg';
import stamp2 from 'images/stamps/stamp2.svg';
import stamp5 from 'images/stamps/stamp5.svg';
import stamp6 from 'images/stamps/stamp6_1.svg';
import { ReactComponent as Stamp1 } from 'images/stamps/stamp1.svg';
import { ReactComponent as Stamp2 } from 'images/stamps/stamp2.svg';
import { ReactComponent as Stamp5 } from 'images/stamps/stamp5.svg';
import { ReactComponent as Stamp6 } from 'images/stamps/stamp6_1.svg';

export const stamps = [
  {
    id: 'stamp1',
    src: stamp1,
    StampSVG: Stamp1,
  },
  {
    id: 'stamp2',
    src: stamp2,
    StampSVG: Stamp2,
  },
  {
    id: 'stamp5',
    src: stamp5,
    StampSVG: Stamp5,
  },
  {
    id: 'stamp6',
    src: stamp6,
    StampSVG: Stamp6,
  },
];

function StampPicker({ activeStamp, color, handleStampChange }) {
  return (
    <VStack>
      {stamps.map(stampObj => {
        return (
          <ToolbarBorderBox
            key={stampObj.id}
            isActive={activeStamp && stampObj.id === activeStamp.id}
          >
            <ToolbarBorderBoxInner onClick={() => handleStampChange(stampObj)}>
              <stampObj.StampSVG fill={color.hex} />
            </ToolbarBorderBoxInner>
          </ToolbarBorderBox>
        );
      })}
    </VStack>
  );
}

StampPicker.propTypes = {
  activeStamp: PropTypes.object,
  color: PropTypes.object,
  handleStampChange: PropTypes.func,
};

export default StampPicker;
