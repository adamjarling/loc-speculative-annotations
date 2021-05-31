import React from 'react';
import PropTypes from 'prop-types';
import {
  Link,
  Heading,
  VStack,
  Wrap,
  WrapItem,
  useColorModeValue,
} from '@chakra-ui/react';

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
  const activeClasses = {
    bg: useColorModeValue('gray.200', 'gray.300'),
    color: useColorModeValue('gray.900', 'gray.900'),
  };

  const handleFontClick = font => {
    handleFontChange(font);
  };

  return (
    <>
      <Heading as="h2" size="xs" mb={3}>
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
                fontSize={['18px']}
                w={['175px']}
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
                px={1}
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
