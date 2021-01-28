import React from 'react';
import PropTypes from 'prop-types';
import { useFabricOverlayState } from 'context/fabric-overlay-context';
import { Button, Input, Link, VStack, Wrap, WrapItem } from '@chakra-ui/react';
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
  borderColor: 'brand.green.500',
};

function TypeTextFontPicker({
  activeFont,
  handleFontChange,
  handlePreviewTextChange,
  previewText,
}) {
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
    <VStack spacing={3}>
      <Input placeholder="Type here" onChange={handlePreviewTextChange} />

      <Wrap direction="column" justify="flex-start">
        {fonts.map(font => (
          <WrapItem key={font.id}>
            <Link
              fontFamily={font.fontFamily}
              id={font.id}
              onClick={() => handleFontClick(font)}
              fontSize="24px"
              w="200px"
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
              borderWidth="1px"
              p={3}
              borderRadius={10}
              {...(activeFont.id === font.id && { ...activeClasses })}
            >
              {previewText}
            </Link>
          </WrapItem>
        ))}
      </Wrap>
    </VStack>
  );
}

TypeTextFontPicker.propTypes = {
  activeFont: PropTypes.object,
  handleFontChange: PropTypes.func,
  handlePreviewTextChange: PropTypes.func,
  previewText: PropTypes.string,
};

export default TypeTextFontPicker;
