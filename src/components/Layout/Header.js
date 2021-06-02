import React from 'react';
import { Box } from '@chakra-ui/react';
import EyebrowNav from 'components/Layout/EyebrowNav';
import Navbar from 'components/Layout/Site/Navbar';

function LayoutHeader() {
  return (
    <Box as="header" data-testid="layout-header">
      <EyebrowNav />
      <Navbar />
    </Box>
  );
}

export default LayoutHeader;
