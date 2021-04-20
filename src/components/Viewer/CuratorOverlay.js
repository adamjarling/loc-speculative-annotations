import React from 'react';
import PropTypes from 'prop-types';
import tape from 'images/tape.png';
import { Box, Image } from '@chakra-ui/react';

function ViewerCuratorOverlay(props) {
  return (
    <>
      <Box
        position="absolute"
        left="20%"
        top="-20px"
        transform="rotate(-2deg)"
        zIndex={2}
      >
        <Image src={tape} alt="tape" w="130px" />
      </Box>
      <Box
        position="absolute"
        right="20%"
        top="-20px"
        transform="rotate(2deg)"
        zIndex={2}
      >
        <Image src={tape} alt="tape" w="130px" />
      </Box>
    </>
  );
}

ViewerCuratorOverlay.propTypes = {};

export default ViewerCuratorOverlay;
