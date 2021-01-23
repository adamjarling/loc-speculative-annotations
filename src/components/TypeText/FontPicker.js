import React from 'react';
import PropTypes from 'prop-types';
import { useFabricOverlayState } from 'context/fabric-overlay-context';
import { Link, Wrap, WrapItem } from '@chakra-ui/react';
import faker from 'faker';
import FontFaceObserver from 'fontfaceobserver';

export const fonts = [
  {
    id: 'staatliches',
    fontFamily: 'Staatliches',
    sampleText: faker.lorem.words(),
  },
  { id: 'xanhMono', fontFamily: 'Xanh Mono', sampleText: faker.lorem.words() },
  {
    id: 'yellowtail',
    fontFamily: 'Yellowtail',
    sampleText: faker.lorem.words(),
  },
];

const activeClasses = {
  border: '2px',
  borderColor: 'brand.neonGreen.500',
  padding: '1px 4px',
};

function TypeTextFontPicker({ activeFont, handleFontChange }) {
  const { fabricOverlay } = useFabricOverlayState();

  const handleFontClick = font => {
    handleFontChange(font);
  };

  const loadAndUse = font => {
    const canvas = fabricOverlay.fabricCanvas();
    const activeObject = canvas.getActiveObject();

    if (!activeObject) {
      return;
    }

    var myfont = new FontFaceObserver(font);
    myfont
      .load()
      .then(function () {
        // when font is loaded, use it.
        canvas.getActiveObject().set('fontFamily', font);
        canvas.requestRenderAll();
      })
      .catch(function (e) {
        console.error(e);
      });
  };

  return (
    <Wrap>
      {fonts.map(font => (
        <WrapItem key={font.id}>
          <Link
            fontFamily={font.fontFamily}
            id={font.id}
            onClick={() => handleFontClick(font)}
            {...(activeFont.id === font.id && { ...activeClasses })}
          >
            {font.sampleText}
          </Link>
        </WrapItem>
      ))}
    </Wrap>
  );
}

TypeTextFontPicker.propTypes = {
  handleFontChange: PropTypes.func,
};

export default TypeTextFontPicker;
