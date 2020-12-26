import React from 'react';
import PropTypes from 'prop-types';
import svgStamp from 'images/social-media-logos-Labs.svg';
import pngStamp from 'images/loc-logo-horizantal.png';
import { Image, Link, Stack } from '@chakra-ui/react';

const activeProps = {
  border: '2px',
  borderColor: 'brand.neonGreen.500',
};

function StampMenu({ handleStampClick }) {
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
    <Stack direction="row">
      {stamps.map(stamp => (
        <Link
          onClick={() => handleClick(stamp)}
          key={stamp.id}
          p={2}
          {...(activeStamp &&
            stamp.id === activeStamp.id && { ...activeProps })}
        >
          <Image
            boxSize="150px"
            objectFit="contain"
            src={stamp.src}
            alt={stamp.alt}
            ref={stamp.ref}
          />
        </Link>
      ))}
    </Stack>
  );
}

StampMenu.propTypes = {
  handleStampClick: PropTypes.func,
};

export default StampMenu;
