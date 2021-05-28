import React from 'react';
import PropTypes from 'prop-types';
import { Box, SimpleGrid } from '@chakra-ui/react';
import ToolbarBorderBox from 'components/Toolbar/BorderBox';
import ToolbarBorderBoxInner from 'components/Toolbar/BorderBoxInner';
import { borderBoxPixelSizes } from 'components/Toolbar/BorderBox';
import { isMobile } from 'react-device-detect';

import stamp9 from 'images/stamps/stamps-09.svg';
import stamp11 from 'images/stamps/stamps-11.svg';
import stamp17 from 'images/stamps/stamps-17.svg';
import stamp21 from 'images/stamps/stamps-21.svg';
import stamp22 from 'images/stamps/stamps-22.svg';
import stamp25 from 'images/stamps/stamps-25.svg';
import stamp33 from 'images/stamps/stamps-33.svg';
import stamp38 from 'images/stamps/stamps-38.svg';
import stamp40 from 'images/stamps/stamps-40.svg';
import stamp41 from 'images/stamps/stamps-41.svg';
import stamp44 from 'images/stamps/stamps-44.svg';
import stamp46 from 'images/stamps/stamps-46.svg';
import stamp48 from 'images/stamps/stamps-48.svg';
import stamp49 from 'images/stamps/stamps-49.svg';
import stamp52 from 'images/stamps/stamps-52.svg';
import ampersand from 'images/stamps/Ampersand.svg';
import arrow1 from 'images/stamps/Arrow1.svg';
import asterisk from 'images/stamps/Asterisk.svg';
import caret from 'images/stamps/Caret.svg';
import comma from 'images/stamps/Comma.svg';
import dotdotdot from 'images/stamps/Dotdotdot.svg';
import endquote from 'images/stamps/Endquote.svg';
import equal from 'images/stamps/Equal.svg';
import explanationPoint from 'images/stamps/Explanation-point.svg';
import eyeball from 'images/stamps/Eyeball.svg';
import hashtag from 'images/stamps/stamp15.svg';
import questionMark from 'images/stamps/Question-mark.svg';
import solidBoxOpenBubble from 'images/stamps/Solid-box-open-bubble.svg';
import startQuote from 'images/stamps/Start-quote.svg';
import volumeSymbol from 'images/stamps/Volume-symbol.svg';

import { ReactComponent as Stamp9 } from 'images/stamps/stamps-09.svg';
import { ReactComponent as Stamp11 } from 'images/stamps/stamps-11.svg';
import { ReactComponent as Stamp17 } from 'images/stamps/stamps-17.svg';
import { ReactComponent as Stamp21 } from 'images/stamps/stamps-21.svg';
import { ReactComponent as Stamp22 } from 'images/stamps/stamps-22.svg';
import { ReactComponent as Stamp25 } from 'images/stamps/stamps-25.svg';
import { ReactComponent as Stamp33 } from 'images/stamps/stamps-33.svg';
import { ReactComponent as Stamp38 } from 'images/stamps/stamps-38.svg';
import { ReactComponent as Stamp40 } from 'images/stamps/stamps-40.svg';
import { ReactComponent as Stamp41 } from 'images/stamps/stamps-41.svg';
import { ReactComponent as Stamp44 } from 'images/stamps/stamps-44.svg';
import { ReactComponent as Stamp46 } from 'images/stamps/stamps-46.svg';
import { ReactComponent as Stamp48 } from 'images/stamps/stamps-48.svg';
import { ReactComponent as Stamp49 } from 'images/stamps/stamps-49.svg';
import { ReactComponent as Stamp52 } from 'images/stamps/stamps-52.svg';
import { ReactComponent as Ampersand } from 'images/stamps/Ampersand.svg';
import { ReactComponent as Arrow1 } from 'images/stamps/Arrow1.svg';
import { ReactComponent as Asterisk } from 'images/stamps/Asterisk.svg';
import { ReactComponent as Caret } from 'images/stamps/Caret.svg';
import { ReactComponent as Comma } from 'images/stamps/Comma.svg';
import { ReactComponent as Dotdotdot } from 'images/stamps/Dotdotdot.svg';
import { ReactComponent as Endquote } from 'images/stamps/Endquote.svg';
import { ReactComponent as Equal } from 'images/stamps/Equal.svg';
import { ReactComponent as ExplanationPoint } from 'images/stamps/Explanation-point.svg';
import { ReactComponent as Eyeball } from 'images/stamps/Eyeball.svg';
import { ReactComponent as Hashtag } from 'images/stamps/stamp15.svg';
import { ReactComponent as QuestionMark } from 'images/stamps/Question-mark.svg';
import { ReactComponent as SolidBoxOpenBubble } from 'images/stamps/Solid-box-open-bubble.svg';
import { ReactComponent as StartQuote } from 'images/stamps/Start-quote.svg';
import { ReactComponent as VolumeSymbol } from 'images/stamps/Volume-symbol.svg';

export const stamps = [
  {
    id: 'stamp9',
    label: 'Check',
    src: stamp9,
    StampSVG: Stamp9,
  },
  {
    id: 'stamp11',
    label: 'Star',
    src: stamp11,
    StampSVG: Stamp11,
  },
  {
    id: 'stamp17',
    label: 'Hand point',
    src: stamp17,
    StampSVG: Stamp17,
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
    id: 'stamp25',
    label: 'Dashed oval',
    src: stamp25,
    StampSVG: Stamp25,
  },
  {
    id: 'stamp33',
    label: 'Speech bubble',
    src: stamp33,
    StampSVG: Stamp33,
  },
  {
    id: 'stamp38',
    label: 'Angled brackets',
    src: stamp38,
    StampSVG: Stamp38,
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
    id: 'stamp44',
    label: 'Plus',
    src: stamp44,
    StampSVG: Stamp44,
  },
  {
    id: 'stamp46',
    label: 'Speech bubble outline',
    src: stamp46,
    StampSVG: Stamp46,
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
    id: 'stamp52',
    label: 'Parentheses',
    src: stamp52,
    StampSVG: Stamp52,
  },
  {
    id: 'ampersand',
    label: 'Ampersand',
    src: ampersand,
    StampSVG: Ampersand,
  },
  {
    id: 'arrow1',
    label: 'Arrow1',
    src: arrow1,
    StampSVG: Arrow1,
  },
  {
    id: 'asterisk',
    label: 'Asterisk',
    src: asterisk,
    StampSVG: Asterisk,
  },
  {
    id: 'caret',
    label: 'Caret',
    src: caret,
    StampSVG: Caret,
  },
  {
    id: 'comma',
    label: 'Comma',
    src: comma,
    StampSVG: Comma,
  },
  {
    id: 'dotdotdot',
    label: 'Dotdotdot',
    src: dotdotdot,
    StampSVG: Dotdotdot,
  },
  {
    id: 'endquote',
    label: 'Endquote',
    src: endquote,
    StampSVG: Endquote,
  },
  {
    id: 'equal',
    label: 'Equal',
    src: equal,
    StampSVG: Equal,
  },
  {
    id: 'explanationPoint',
    label: 'ExplanationPoint',
    src: explanationPoint,
    StampSVG: ExplanationPoint,
  },
  {
    id: 'eyeball',
    label: 'Eyeball',
    src: eyeball,
    StampSVG: Eyeball,
  },
  {
    id: 'hashtag',
    label: 'Hashtag',
    src: hashtag,
    StampSVG: Hashtag,
  },
  {
    id: 'questionMark',
    label: 'QuestionMark',
    src: questionMark,
    StampSVG: QuestionMark,
  },
  {
    id: 'solidBoxOpenBubble',
    label: 'SolidBoxOpenBubble',
    src: solidBoxOpenBubble,
    StampSVG: SolidBoxOpenBubble,
  },
  {
    id: 'startQuote',
    label: 'StartQuote',
    src: startQuote,
    StampSVG: StartQuote,
  },
  {
    id: 'volumeSymbol',
    label: 'VolumeSymbol',
    src: volumeSymbol,
    StampSVG: VolumeSymbol,
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
