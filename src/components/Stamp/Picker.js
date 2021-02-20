import React from 'react';
import PropTypes from 'prop-types';
import { Box, SimpleGrid, VStack } from '@chakra-ui/react';
import ToolbarBorderBox from 'components/Toolbar/BorderBox';
import ToolbarBorderBoxInner from 'components/Toolbar/BorderBoxInner';
import stamp1 from 'images/stamps/stamp1.svg';
import stamp2 from 'images/stamps/stamp2.svg';
import stamp3 from 'images/stamps/stamp3.svg';
import stamp4 from 'images/stamps/stamp4.svg';
import stamp5 from 'images/stamps/stamp5.svg';
import stamp6 from 'images/stamps/stamp6_1.svg';
import stamp7 from 'images/stamps/stamp7.svg';
import stamp8 from 'images/stamps/stamp8.svg';
import stamp9 from 'images/stamps/stamp9.svg';
import stamp10 from 'images/stamps/stamp10.svg';
import stamp11 from 'images/stamps/stamp11.svg';
import stamp12 from 'images/stamps/stamp12.svg';
import stamp13 from 'images/stamps/stamp13.svg';
import stamp13_5 from 'images/stamps/stamp13_5.svg';
import stamp14 from 'images/stamps/stamp14.svg';
import stamp15 from 'images/stamps/stamp15.svg';
import stamp16 from 'images/stamps/stamp16.svg';
import stamp16_5 from 'images/stamps/stamp16_5.svg';
import stamp17 from 'images/stamps/stamp17.svg';
import stamp18 from 'images/stamps/stamp18.svg';
import stamp19 from 'images/stamps/stamp19.svg';
import stamp20 from 'images/stamps/stamp20.svg';
import stamp21 from 'images/stamps/stamp21.svg';
import stamp22 from 'images/stamps/stamp22.svg';
import stamp22_5 from 'images/stamps/stamp22_5.svg';
import stamp23 from 'images/stamps/stamp23.svg';
import stamp24 from 'images/stamps/stamp24.svg';
import stamp25 from 'images/stamps/stamp25.svg';
import { ReactComponent as Stamp1 } from 'images/stamps/stamp1.svg';
import { ReactComponent as Stamp2 } from 'images/stamps/stamp2.svg';
import { ReactComponent as Stamp3 } from 'images/stamps/stamp3.svg';
import { ReactComponent as Stamp4 } from 'images/stamps/stamp4.svg';
import { ReactComponent as Stamp5 } from 'images/stamps/stamp5.svg';
import { ReactComponent as Stamp6 } from 'images/stamps/stamp6_1.svg';
import { ReactComponent as Stamp7 } from 'images/stamps/stamp7.svg';
import { ReactComponent as Stamp8 } from 'images/stamps/stamp8.svg';
import { ReactComponent as Stamp9 } from 'images/stamps/stamp9.svg';
import { ReactComponent as Stamp10 } from 'images/stamps/stamp10.svg';
import { ReactComponent as Stamp11 } from 'images/stamps/stamp11.svg';
import { ReactComponent as Stamp12 } from 'images/stamps/stamp12.svg';
import { ReactComponent as Stamp13 } from 'images/stamps/stamp13.svg';
import { ReactComponent as Stamp13_5 } from 'images/stamps/stamp13_5.svg';
import { ReactComponent as Stamp14 } from 'images/stamps/stamp14.svg';
import { ReactComponent as Stamp15 } from 'images/stamps/stamp15.svg';
import { ReactComponent as Stamp16 } from 'images/stamps/stamp16.svg';
import { ReactComponent as Stamp16_5 } from 'images/stamps/stamp16_5.svg';
import { ReactComponent as Stamp17 } from 'images/stamps/stamp17.svg';
import { ReactComponent as Stamp18 } from 'images/stamps/stamp18.svg';
import { ReactComponent as Stamp19 } from 'images/stamps/stamp19.svg';
import { ReactComponent as Stamp20 } from 'images/stamps/stamp20.svg';
import { ReactComponent as Stamp21 } from 'images/stamps/stamp21.svg';
import { ReactComponent as Stamp22 } from 'images/stamps/stamp22.svg';
import { ReactComponent as Stamp22_5 } from 'images/stamps/stamp22_5.svg';
import { ReactComponent as Stamp23 } from 'images/stamps/stamp23.svg';
import { ReactComponent as Stamp24 } from 'images/stamps/stamp24.svg';
import { ReactComponent as Stamp25 } from 'images/stamps/stamp25.svg';

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
    id: 'stamp3',
    src: stamp3,
    StampSVG: Stamp3,
  },
  {
    id: 'stamp4',
    src: stamp4,
    StampSVG: Stamp4,
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
  {
    id: 'stamp7',
    src: stamp7,
    StampSVG: Stamp7,
  },
  {
    id: 'stamp8',
    src: stamp8,
    StampSVG: Stamp8,
  },
  {
    id: 'stamp9',
    src: stamp9,
    StampSVG: Stamp9,
  },
  {
    id: 'stamp10',
    src: stamp10,
    StampSVG: Stamp10,
  },
  {
    id: 'stamp11',
    src: stamp11,
    StampSVG: Stamp11,
  },
  {
    id: 'stamp12',
    src: stamp12,
    StampSVG: Stamp12,
  },
  {
    id: 'stamp13',
    src: stamp13,
    StampSVG: Stamp13,
  },
  {
    id: 'stamp13_5',
    src: stamp13_5,
    StampSVG: Stamp13_5,
  },
  {
    id: 'stamp14',
    src: stamp14,
    StampSVG: Stamp14,
  },
  {
    id: 'stamp15',
    src: stamp15,
    StampSVG: Stamp15,
  },
  {
    id: 'stamp16',
    src: stamp16,
    StampSVG: Stamp16,
  },
  {
    id: 'stamp16_5',
    src: stamp16_5,
    StampSVG: Stamp16_5,
  },
  {
    id: 'stamp17',
    src: stamp17,
    StampSVG: Stamp17,
  },
  {
    id: 'stamp18',
    src: stamp18,
    StampSVG: Stamp18,
  },
  {
    id: 'stamp19',
    src: stamp19,
    StampSVG: Stamp19,
  },
  {
    id: 'stamp20',
    src: stamp20,
    StampSVG: Stamp20,
  },
  {
    id: 'stamp21',
    src: stamp21,
    StampSVG: Stamp21,
  },
  {
    id: 'stamp22',
    src: stamp22,
    StampSVG: Stamp22,
  },
  {
    id: 'stamp22_5',
    src: stamp22_5,
    StampSVG: Stamp22_5,
  },
  {
    id: 'stamp23',
    src: stamp23,
    StampSVG: Stamp23,
  },
  {
    id: 'stamp24',
    src: stamp24,
    StampSVG: Stamp24,
  },
  {
    id: 'stamp25',
    src: stamp25,
    StampSVG: Stamp25,
  },
];

function StampPicker({ activeStamp, color, handleStampChange }) {
  return (
    <Box overflowY="scroll">
      <SimpleGrid columns={2} spacing={4}>
        {stamps.map(stampObj => {
          return (
            <ToolbarBorderBox
              key={stampObj.id}
              isActive={activeStamp && stampObj.id === activeStamp.id}
            >
              <ToolbarBorderBoxInner
                onClick={() => handleStampChange(stampObj)}
              >
                <stampObj.StampSVG
                  fill={color.hex}
                  height="100%"
                  width="100%"
                />
              </ToolbarBorderBoxInner>
            </ToolbarBorderBox>
          );
        })}
      </SimpleGrid>
    </Box>
  );
}

StampPicker.propTypes = {
  activeStamp: PropTypes.object,
  color: PropTypes.object,
  handleStampChange: PropTypes.func,
};

export default StampPicker;
