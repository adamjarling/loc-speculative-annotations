import React from 'react';
import PropTypes from 'prop-types';
import blueStamp from 'images/stamps/LOC_Stamps_Scan_Blue-01.svg';
import greenStamp from 'images/stamps/LOC_Stamps_Scan_3_Green.svg';
import pinkStamp from 'images/stamps/LOC_Stamps_Scan_Pink-01.svg';
import purpleStamp from 'images/stamps/LOC_Stamps_Scan_Purple-01.svg';
import yellowStamp from 'images/stamps/LOC_Stamps_Scan_Yellow-01.svg';
import { Image, Link, SimpleGrid } from '@chakra-ui/react';

function StampSheet1({ handleStampClick }) {
  const stamps = [
    {
      id: 'blueStamp',
      alt: 'Blue Stamp 1',
      isActive: false,
      src: blueStamp,
    },
    {
      id: 'greenStamp',
      alt: 'Green Stamp 1',
      isActive: false,
      src: greenStamp,
    },
    {
      id: 'pinkStamp',
      alt: 'Pink Stamp 1',
      isActive: false,
      src: pinkStamp,
    },
    {
      id: 'purpleStamp',
      alt: 'Purple Stamp 1',
      isActive: false,
      src: purpleStamp,
    },
    {
      id: 'yellowStamp',
      alt: 'Yellow Stamp 1',
      isActive: false,
      src: yellowStamp,
    },
  ];

  return (
    <SimpleGrid columns={{ md: 2, lg: 2 }}>
      {stamps.map(stamp => (
        <Link onClick={() => handleStampClick(stamp)} key={stamp.id} p={2}>
          <Image src={stamp.src} alt={stamp.alt} />
        </Link>
      ))}
    </SimpleGrid>
  );
}

StampSheet1.propTypes = {
  handleStampClick: PropTypes.func,
};

export default StampSheet1;
