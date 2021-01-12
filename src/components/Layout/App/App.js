import React from 'react';
import { Flex } from '@chakra-ui/react';
import Toolbar from 'components/Toolbar/Toolbar';
import Viewer from 'components/Viewer/Viewer';
import LayoutSidebarNav from 'components/Layout/App/SidebarNav';
import LayoutAppHeader from 'components/Layout/App/Header';
import LayoutAppBody from 'components/Layout/App/Body';
import LayoutAppSidebar from './Sidebar';
import LayoutAppFooter from './Footer';
import Div100vh from 'react-div-100vh';

function LayoutApp(props) {
  return (
    <Flex as={Div100vh} h="100vh" direction="column">
      <LayoutAppHeader />
      <LayoutAppBody>
        <LayoutAppSidebar>
          <Toolbar />
          <LayoutSidebarNav />
        </LayoutAppSidebar>
        <Viewer />
      </LayoutAppBody>
      <LayoutAppFooter />
    </Flex>
  );
}

LayoutApp.propTypes = {};

export default LayoutApp;
