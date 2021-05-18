import React from 'react';
import PropTypes from 'prop-types';
import { useFabricOverlayState } from 'context/fabric-overlay-context';
import {
  Link,
  Heading,
  VStack,
  Wrap,
  WrapItem,
  useColorModeValue,
} from '@chakra-ui/react';
import FontFaceObserver from 'fontfaceobserver';

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

function TypeTextFontPicker({ activeFont, handleFontChange }) {
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
    <>
      <Heading as="h2" size="sm" mb={3}>
        Text
      </Heading>
      <VStack spacing={3}>
        <Wrap direction="column" justify="flex-start">
          {fonts.map(font => (
            <WrapItem key={font.id}>
              <Link
                fontFamily={font.fontFamily}
                id={font.id}
                onClick={() => handleFontClick(font)}
                fontSize={['18px', '24px']}
                w={['175px', '250px']}
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
                borderWidth="1px"
                p={[1, 2, 3]}
                borderRadius={8}
                {...(activeFont &&
                  activeFont.id === font.id && { ...activeClasses })}
              >
                {font.fontFamily}
              </Link>
            </WrapItem>
          ))}
        </Wrap>
      </VStack>
    </>
  );
}

TypeTextFontPicker.propTypes = {
  activeFont: PropTypes.object,
  handleFontChange: PropTypes.func,
  handlePreviewTextChange: PropTypes.func,
};

export default TypeTextFontPicker;
