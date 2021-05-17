import React from 'react';
import PropTypes from 'prop-types';
import { Box, SimpleGrid } from '@chakra-ui/react';
import ToolbarBorderBox from 'components/Toolbar/BorderBox';
import ToolbarBorderBoxInner from 'components/Toolbar/BorderBoxInner';
import { borderBoxPixelSizes } from 'components/Toolbar/BorderBox';
import { isMobile } from 'react-device-detect';

import stamp1 from 'images/stamps/stamps-01.svg';
import stamp2 from 'images/stamps/stamps-02.svg';
import stamp3 from 'images/stamps/stamps-03.svg';
import stamp4 from 'images/stamps/stamps-04.svg';
import stamp5 from 'images/stamps/stamps-05.svg';
import stamp6 from 'images/stamps/stamps-06.svg';
import stamp7 from 'images/stamps/stamps-07.svg';
import stamp8 from 'images/stamps/stamps-08.svg';
import stamp9 from 'images/stamps/stamps-09.svg';
import stamp10 from 'images/stamps/stamps-10.svg';
import stamp11 from 'images/stamps/stamps-11.svg';
import stamp12 from 'images/stamps/stamps-12.svg';
import stamp13 from 'images/stamps/stamps-13.svg';
import stamp14 from 'images/stamps/stamps-14.svg';
import stamp15 from 'images/stamps/stamps-15.svg';
import stamp16 from 'images/stamps/stamps-16.svg';
import stamp17 from 'images/stamps/stamps-17.svg';
import stamp18 from 'images/stamps/stamps-18.svg';
import stamp19 from 'images/stamps/stamps-19.svg';
import stamp20 from 'images/stamps/stamps-20.svg';
import stamp21 from 'images/stamps/stamps-21.svg';
import stamp22 from 'images/stamps/stamps-22.svg';
import stamp23 from 'images/stamps/stamps-23.svg';
import stamp24 from 'images/stamps/stamps-24.svg';
import stamp25 from 'images/stamps/stamps-25.svg';
import stamp26 from 'images/stamps/stamps-26.svg';
import stamp27 from 'images/stamps/stamps-27.svg';
import stamp28 from 'images/stamps/stamps-28.svg';
import stamp29 from 'images/stamps/stamps-29.svg';
import stamp30 from 'images/stamps/stamps-30.svg';
import stamp31 from 'images/stamps/stamps-31.svg';
import stamp32 from 'images/stamps/stamps-32.svg';
import stamp33 from 'images/stamps/stamps-33.svg';
import stamp34 from 'images/stamps/stamps-34.svg';
import stamp35 from 'images/stamps/stamps-35.svg';
import stamp36 from 'images/stamps/stamps-36.svg';
import stamp37 from 'images/stamps/stamps-37.svg';
import stamp38 from 'images/stamps/stamps-38.svg';
import stamp39 from 'images/stamps/stamps-39.svg';
import stamp40 from 'images/stamps/stamps-40.svg';
import stamp41 from 'images/stamps/stamps-41.svg';
import stamp42 from 'images/stamps/stamps-42.svg';
import stamp43 from 'images/stamps/stamps-43.svg';
import stamp44 from 'images/stamps/stamps-44.svg';
import stamp45 from 'images/stamps/stamps-45.svg';
import stamp46 from 'images/stamps/stamps-46.svg';
import stamp47 from 'images/stamps/stamps-47.svg';
import stamp48 from 'images/stamps/stamps-48.svg';
import stamp49 from 'images/stamps/stamps-49.svg';
import stamp50 from 'images/stamps/stamps-50.svg';
import stamp51 from 'images/stamps/stamps-51.svg';
import stamp52 from 'images/stamps/stamps-52.svg';
import stamp53 from 'images/stamps/stamps-53.svg';
import stamp54 from 'images/stamps/stamps-54.svg';
import stamp55 from 'images/stamps/stamps-55.svg';
import { ReactComponent as Stamp1 } from 'images/stamps/stamps-01.svg';
import { ReactComponent as Stamp2 } from 'images/stamps/stamps-02.svg';
import { ReactComponent as Stamp3 } from 'images/stamps/stamps-03.svg';
import { ReactComponent as Stamp4 } from 'images/stamps/stamps-04.svg';
import { ReactComponent as Stamp5 } from 'images/stamps/stamps-05.svg';
import { ReactComponent as Stamp6 } from 'images/stamps/stamps-06.svg';
import { ReactComponent as Stamp7 } from 'images/stamps/stamps-07.svg';
import { ReactComponent as Stamp8 } from 'images/stamps/stamps-08.svg';
import { ReactComponent as Stamp9 } from 'images/stamps/stamps-09.svg';
import { ReactComponent as Stamp10 } from 'images/stamps/stamps-10.svg';
import { ReactComponent as Stamp11 } from 'images/stamps/stamps-11.svg';
import { ReactComponent as Stamp12 } from 'images/stamps/stamps-12.svg';
import { ReactComponent as Stamp13 } from 'images/stamps/stamps-13.svg';
import { ReactComponent as Stamp14 } from 'images/stamps/stamps-14.svg';
import { ReactComponent as Stamp15 } from 'images/stamps/stamps-15.svg';
import { ReactComponent as Stamp16 } from 'images/stamps/stamps-16.svg';
import { ReactComponent as Stamp17 } from 'images/stamps/stamps-17.svg';
import { ReactComponent as Stamp18 } from 'images/stamps/stamps-18.svg';
import { ReactComponent as Stamp19 } from 'images/stamps/stamps-19.svg';
import { ReactComponent as Stamp20 } from 'images/stamps/stamps-20.svg';
import { ReactComponent as Stamp21 } from 'images/stamps/stamps-21.svg';
import { ReactComponent as Stamp22 } from 'images/stamps/stamps-22.svg';
import { ReactComponent as Stamp23 } from 'images/stamps/stamps-23.svg';
import { ReactComponent as Stamp24 } from 'images/stamps/stamps-24.svg';
import { ReactComponent as Stamp25 } from 'images/stamps/stamps-25.svg';
import { ReactComponent as Stamp26 } from 'images/stamps/stamps-26.svg';
import { ReactComponent as Stamp27 } from 'images/stamps/stamps-27.svg';
import { ReactComponent as Stamp28 } from 'images/stamps/stamps-28.svg';
import { ReactComponent as Stamp29 } from 'images/stamps/stamps-29.svg';
import { ReactComponent as Stamp30 } from 'images/stamps/stamps-30.svg';
import { ReactComponent as Stamp31 } from 'images/stamps/stamps-31.svg';
import { ReactComponent as Stamp32 } from 'images/stamps/stamps-32.svg';
import { ReactComponent as Stamp33 } from 'images/stamps/stamps-33.svg';
import { ReactComponent as Stamp34 } from 'images/stamps/stamps-34.svg';
import { ReactComponent as Stamp35 } from 'images/stamps/stamps-35.svg';
import { ReactComponent as Stamp36 } from 'images/stamps/stamps-36.svg';
import { ReactComponent as Stamp37 } from 'images/stamps/stamps-37.svg';
import { ReactComponent as Stamp38 } from 'images/stamps/stamps-38.svg';
import { ReactComponent as Stamp39 } from 'images/stamps/stamps-39.svg';
import { ReactComponent as Stamp40 } from 'images/stamps/stamps-40.svg';
import { ReactComponent as Stamp41 } from 'images/stamps/stamps-41.svg';
import { ReactComponent as Stamp42 } from 'images/stamps/stamps-42.svg';
import { ReactComponent as Stamp43 } from 'images/stamps/stamps-43.svg';
import { ReactComponent as Stamp44 } from 'images/stamps/stamps-44.svg';
import { ReactComponent as Stamp45 } from 'images/stamps/stamps-45.svg';
import { ReactComponent as Stamp46 } from 'images/stamps/stamps-46.svg';
import { ReactComponent as Stamp47 } from 'images/stamps/stamps-47.svg';
import { ReactComponent as Stamp48 } from 'images/stamps/stamps-48.svg';
import { ReactComponent as Stamp49 } from 'images/stamps/stamps-49.svg';
import { ReactComponent as Stamp50 } from 'images/stamps/stamps-50.svg';
import { ReactComponent as Stamp51 } from 'images/stamps/stamps-51.svg';
import { ReactComponent as Stamp52 } from 'images/stamps/stamps-52.svg';
import { ReactComponent as Stamp53 } from 'images/stamps/stamps-53.svg';
import { ReactComponent as Stamp54 } from 'images/stamps/stamps-54.svg';
import { ReactComponent as Stamp55 } from 'images/stamps/stamps-55.svg';

export const stamps = [
  {
    id: 'stamp1',
    label: 'Speech bubble',
    src: stamp1,
    StampSVG: Stamp1,
  },
  {
    id: 'stamp2',
    label: 'Arrow',
    src: stamp2,
    StampSVG: Stamp2,
  },
  {
    id: 'stamp3',
    label: 'Star',
    src: stamp3,
    StampSVG: Stamp3,
  },
  {
    id: 'stamp4',
    label: 'Speech bubble',
    src: stamp4,
    StampSVG: Stamp4,
  },
  {
    id: 'stamp5',
    label: 'Speech bubble',
    src: stamp5,
    StampSVG: Stamp5,
  },
  {
    id: 'stamp6',
    label: 'Star',
    src: stamp6,
    StampSVG: Stamp6,
  },
  {
    id: 'stamp7',
    label: 'Sun',
    src: stamp7,
    StampSVG: Stamp7,
  },
  {
    id: 'stamp8',
    label: 'Cross',
    src: stamp8,
    StampSVG: Stamp8,
  },
  {
    id: 'stamp9',
    label: 'Check',
    src: stamp9,
    StampSVG: Stamp9,
  },
  {
    id: 'stamp10',
    label: 'Speech bubble',
    src: stamp10,
    StampSVG: Stamp10,
  },
  {
    id: 'stamp11',
    label: 'Star',
    src: stamp11,
    StampSVG: Stamp11,
  },
  {
    id: 'stamp12',
    label: 'Speech bubble outline',
    src: stamp12,
    StampSVG: Stamp12,
  },
  {
    id: 'stamp13',
    label: 'Speech bubble',
    src: stamp13,
    StampSVG: Stamp13,
  },
  {
    id: 'stamp14',
    label: 'Circle',
    src: stamp14,
    StampSVG: Stamp14,
  },
  {
    id: 'stamp15',
    label: 'Brackets',
    src: stamp15,
    StampSVG: Stamp15,
  },
  {
    id: 'stamp16',
    label: 'Rectangle',
    src: stamp16,
    StampSVG: Stamp16,
  },
  {
    id: 'stamp17',
    label: 'Hand point',
    src: stamp17,
    StampSVG: Stamp17,
  },
  {
    id: 'stamp18',
    label: 'Speech bubble',
    src: stamp18,
    StampSVG: Stamp18,
  },
  {
    id: 'stamp19',
    label: 'Speech bubble',
    src: stamp19,
    StampSVG: Stamp19,
  },
  {
    id: 'stamp20',
    label: 'Speech bubble',
    src: stamp20,
    StampSVG: Stamp20,
  },
  {
    id: 'stamp21',
    label: 'Speech bubble',
    src: stamp21,
    StampSVG: Stamp21,
  },
  {
    id: 'stamp22',
    label: 'Speech bubble',
    src: stamp22,
    StampSVG: Stamp22,
  },
  {
    id: 'stamp23',
    label: 'Speech bubble',
    src: stamp23,
    StampSVG: Stamp23,
  },
  {
    id: 'stamp24',
    label: 'Speech bubble',
    src: stamp24,
    StampSVG: Stamp24,
  },
  {
    id: 'stamp25',
    label: 'Dashed oval',
    src: stamp25,
    StampSVG: Stamp25,
  },
  {
    id: 'stamp26',
    label: 'Star',
    src: stamp26,
    StampSVG: Stamp26,
  },
  {
    id: 'stamp27',
    label: 'Sun',
    src: stamp27,
    StampSVG: Stamp27,
  },
  {
    id: 'stamp28',
    label: 'Angled brackets',
    src: stamp28,
    StampSVG: Stamp28,
  },
  {
    id: 'stamp29',
    label: 'Speech bubble',
    src: stamp29,
    StampSVG: Stamp29,
  },
  {
    id: 'stamp30',
    label: 'Speech bubble',
    src: stamp30,
    StampSVG: Stamp30,
  },
  {
    id: 'stamp31',
    label: 'Speech bubble',
    src: stamp31,
    StampSVG: Stamp31,
  },
  {
    id: 'stamp32',
    label: 'Speech bubble',
    src: stamp32,
    StampSVG: Stamp32,
  },
  {
    id: 'stamp33',
    label: 'Speech bubble',
    src: stamp33,
    StampSVG: Stamp33,
  },
  {
    id: 'stamp34',
    label: 'Speech bubble',
    src: stamp34,
    StampSVG: Stamp34,
  },
  {
    id: 'stamp35',
    label: 'Speech bubble',
    src: stamp35,
    StampSVG: Stamp35,
  },
  {
    id: 'stamp36',
    label: 'Speech bubble',
    src: stamp36,
    StampSVG: Stamp36,
  },
  {
    id: 'stamp37',
    label: 'Sharp speech bubble',
    src: stamp37,
    StampSVG: Stamp37,
  },
  {
    id: 'stamp38',
    label: 'Angled brackets',
    src: stamp38,
    StampSVG: Stamp38,
  },
  {
    id: 'stamp39',
    label: 'Speech bubble left',
    src: stamp39,
    StampSVG: Stamp39,
  },
  {
    id: 'stamp40',
    label: 'Star',
    src: stamp40,
    StampSVG: Stamp40,
  },
  {
    id: 'stamp41',
    label: 'Speech bubble outline',
    src: stamp41,
    StampSVG: Stamp41,
  },
  {
    id: 'stamp42',
    label: 'Speech bubble tall',
    src: stamp42,
    StampSVG: Stamp42,
  },
  {
    id: 'stamp43',
    label: 'Speech bubble long',
    src: stamp43,
    StampSVG: Stamp43,
  },
  {
    id: 'stamp44',
    label: 'Plus',
    src: stamp44,
    StampSVG: Stamp44,
  },
  {
    id: 'stamp45',
    label: 'Speech bubble sharp',
    src: stamp45,
    StampSVG: Stamp45,
  },
  {
    id: 'stamp46',
    label: 'Speech bubble outline',
    src: stamp46,
    StampSVG: Stamp46,
  },
  {
    id: 'stamp47',
    label: '',
    src: stamp47,
    StampSVG: Stamp47,
  },
  {
    id: 'stamp48',
    label: 'Arrow down',
    src: stamp48,
    StampSVG: Stamp48,
  },
  {
    id: 'stamp49',
    label: 'Arrow curved',
    src: stamp49,
    StampSVG: Stamp49,
  },
  {
    id: 'stamp50',
    label: 'Arrow up',
    src: stamp50,
    StampSVG: Stamp50,
  },
  {
    id: 'stamp51',
    label: 'Square outline',
    src: stamp51,
    StampSVG: Stamp51,
  },
  {
    id: 'stamp52',
    label: 'Parentheses',
    src: stamp52,
    StampSVG: Stamp52,
  },
  {
    id: 'stamp53',
    label: 'Arrow up curved',
    src: stamp53,
    StampSVG: Stamp53,
  },
  {
    id: 'stamp54',
    label: 'Arrow right',
    src: stamp54,
    StampSVG: Stamp54,
  },
  {
    id: 'stamp55',
    label: 'Circle',
    src: stamp55,
    StampSVG: Stamp55,
  },
];

function StampPicker({ activeStamp, color, handleStampChange }) {
  const gridSpacing = 16;
  const stampButtonSize = isMobile
    ? borderBoxPixelSizes[0] + gridSpacing
    : borderBoxPixelSizes[1] + gridSpacing;

  const optionsPanelHeight = stampButtonSize * 10;
  const optionsPanelWidth = stampButtonSize * 2;

  return (
    <Box overflowY="scroll" h={optionsPanelHeight} minW={optionsPanelWidth}>
      <SimpleGrid columns={2} spacing={`${gridSpacing}px`}>
        {stamps.map(stampObj => {
          return (
            <ToolbarBorderBox
              key={stampObj.id}
              isActive={activeStamp && stampObj.id === activeStamp.id}
              draggable="false"
              id={stampObj.id}
              title={stampObj.label}
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
