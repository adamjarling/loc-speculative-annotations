import React from 'react';
import { Flex } from '@chakra-ui/react';
import Toolbar from 'components/Toolbar/Toolbar';
import Viewer from 'components/Viewer/Viewer';
import ViewerImageGrabber from 'components/Viewer/ImageGrabber';
import LayoutAppHeader from 'components/Layout/App/Header';
import LayoutAppBody from 'components/Layout/App/Body';
import LayoutAppSidebar from './Sidebar';
import LayoutAppFooter from './Footer';
import Div100vh from 'react-div-100vh';
import ShareQueryParamHandler from 'components/Share/QueryParamHandler';
function LayoutApp() {
  return (
    <Flex as={Div100vh} h="100vh" direction="column">
      <ShareQueryParamHandler />
      <LayoutAppHeader />
      <LayoutAppBody>
        <LayoutAppSidebar>
          <Toolbar />
        </LayoutAppSidebar>
        <ViewerImageGrabber />
      </LayoutAppBody>
      <LayoutAppFooter />
    </Flex>
  );
}

LayoutApp.propTypes = {};

export default LayoutApp;
