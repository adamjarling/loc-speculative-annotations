import React from 'react';
import { Box, Container, Divider } from '@chakra-ui/react';
import LayoutHeader from 'components/Layout/Header';
import SiteAbout from 'components/Site/About';
import SiteTeach from 'components/Site/Teach';
import { useLocation } from 'react-router-dom';

function LayoutSite() {
  const teachRef = React.useRef(null);
  const location = useLocation();

  React.useEffect(() => {
    if (location.hash === '#teach') {
      teachRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location.hash]);

  return (
    <Box>
      <LayoutHeader />
      <Container>
        <SiteAbout />
        <Divider />
        <div ref={teachRef}>
          <SiteTeach />
        </div>
      </Container>
    </Box>
  );
}

export default LayoutSite;
