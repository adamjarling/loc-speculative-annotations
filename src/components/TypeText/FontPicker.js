import React from 'react';
import PropTypes from 'prop-types';
import { useFabricOverlayState } from 'context/fabric-overlay-context';
import {
  Button,
  Input,
  Link,
  VStack,
  Wrap,
  WrapItem,
  useColorModeValue,
} from '@chakra-ui/react';
import FontFaceObserver from 'fontfaceobserver';
import { previewDefaultText } from 'components/TypeText/TypeText';

export const fonts = [
  {
    id: 'reenieBeanie',
    fontFamily: 'Reenie Beanie',
  },
  {
    id: 'courierPrime',
    fontFamily: 'Courier Prime',
  },
  {
    id: 'openSans',
    fontFamily: 'Open Sans',
  },
];

function TypeTextFontPicker({
  activeFont,
  handleFontChange,
  handlePreviewTextChange,
  previewText,
}) {
  const { fabricOverlay } = useFabricOverlayState();

  const activeClasses = {
    borderColor: useColorModeValue('gray.300', 'white'),
    borderWidth: '2px',
  };

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
      <Input
        placeholder={previewDefaultText}
        onChange={handlePreviewTextChange}
        value={previewText}
        fontSize="sm"
        fontFamily="Open Sans"
      />

      <Wrap direction="column" justify="flex-start">
        {fonts.map(font => (
          <WrapItem key={font.id}>
            <Link
              fontFamily={font.fontFamily}
              id={font.id}
              onClick={() => handleFontClick(font)}
              fontSize="24px"
              w="250px"
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
              borderWidth="1px"
              p={3}
              borderRadius={8}
              {...(activeFont &&
                activeFont.id === font.id && { ...activeClasses })}
            >
              {previewText || font.fontFamily}
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
