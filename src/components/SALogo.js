import React from 'react';
import PropTypes from 'prop-types';
import { Box, Image } from '@chakra-ui/react';
import saLogo from 'images/logo.png';

function SALogo(props) {
  return (
    <Box>
      <Image
        src={saLogo}
        alt="Speculative Annotations"
        w="auto"
        maxH="50px"
        mt="0"
        zIndex="1000"
      />
    </Box>
  );
}

SALogo.propTypes = {};

export default SALogo;
