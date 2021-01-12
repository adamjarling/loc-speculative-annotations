import React from 'react';
import PropTypes from 'prop-types';
import { Box, Divider, Flex } from '@chakra-ui/react';
import Toolbar from 'components/Toolbar/Toolbar';
import Viewer from 'components/Viewer/Viewer';
import { useFabricOverlayState } from 'context/fabric-overlay-context';
import { fabric } from 'openseadragon-fabricjs-overlay';
import SaveCanvasList from 'components/Save/CanvasList';
import ViewerFooter from 'components/Layout/App/Footer';
import LayoutSidebar from 'components/Layout/App/Sidebar';
import LayoutSidebarNav from 'components/Layout/App/SidebarNav';
import LayoutAppHeader from 'components/Layout/App/Header';
import LayoutAppBody from 'components/Layout/App/Body';
import LayoutAppSidebar from './Sidebar';
import LayoutAppFooter from './Footer';

function LayoutApp(props) {
  return (
    <Flex h="100vh" direction="column">
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
