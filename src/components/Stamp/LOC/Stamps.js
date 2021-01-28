import React from 'react';
import PropTypes from 'prop-types';
import svgStamp from 'images/social-media-logos-Labs.svg';
import pngStamp from 'images/loc-logo-horizantal.png';
import fauxArt from 'images/faux-art.svg';
import { Box, Image, Link, SimpleGrid, Wrap, WrapItem } from '@chakra-ui/react';

const activeProps = {
  border: '2px',
  borderColor: 'brand.green.500',
};

function StampLOCStamps({ handleStampClick }) {
  const [activeStamp, setActiveStamp] = React.useState();
  const stamps = [
    {
      id: 'locPng',
      alt: 'Test stamp png',
      isActive: false,
      ref: React.useRef(),
      src: pngStamp,
    },
    {
      id: 'locSvg',
      alt: 'Test stamp2 png',
      isActive: false,
      ref: React.useRef(),
      src: svgStamp,
    },
    {
      id: 'fauxArt',
      alt: 'Test stamp3 png',
      isActive: false,
      ref: React.useRef(),
      src: fauxArt,
    },
  ];

  const handleClick = stamp => {
    if (activeStamp && stamp.id === activeStamp.id) {
      // Unactivate active stamp
      setActiveStamp(null);
      handleStampClick(null);
    } else {
      // Make new stamp active
      setActiveStamp(stamps.find(s => s.id === stamp.id));
      handleStampClick(stamp.ref);
    }
  };

  return (
    <SimpleGrid columns={{ md: 2, lg: 2 }}>
      {stamps.map(stamp => (
        <Link
          onClick={() => handleClick(stamp)}
          key={stamp.id}
          p={2}
          {...(activeStamp &&
            stamp.id === activeStamp.id && { ...activeProps })}
        >
          <Image src={stamp.src} alt={stamp.alt} ref={stamp.ref} />
        </Link>
      ))}
    </SimpleGrid>
  );
}

StampLOCStamps.propTypes = {
  handleStampClick: PropTypes.func,
};

export default StampLOCStamps;
