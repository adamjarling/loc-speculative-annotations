import React from 'react';
import PropTypes from 'prop-types';
import { Box, Container, Divider } from '@chakra-ui/react';
import SiteHeader from 'components/Site/Header';
import SiteAbout from 'components/Site/About';
import SiteTeach from 'components/Site/Teach';

function LayoutSite(props) {
  return (
    <Box>
      <SiteHeader />
      <Container>
        <SiteAbout />
        <Divider />
        <SiteTeach />
      </Container>
    </Box>
  );
}

LayoutSite.propTypes = {};

export default LayoutSite;
