import React from 'react';
import PropTypes from 'prop-types';
import { Box, Divider, Flex } from '@chakra-ui/react';
import Toolbar from 'components/Toolbar';
import Viewer from 'components/Viewer/Viewer';
import { useFabricOverlayState } from 'context/fabric-overlay-context';
import { fabric } from 'openseadragon-fabricjs-overlay';
import SaveCanvasList from 'components/Save/CanvasList';
import ViewerHeader from 'components/Viewer/Header';
import ViewerFooter from 'components/Viewer/Footer';
import LayoutSidebar from 'components/Layout/Sidebar/Sidebar';
import LayoutSidebarNav from 'components/Layout/Sidebar/Nav';

function LayoutApp(props) {
  //const [activeTool, setActiveTool] = React.useState();
  const { activeTool, fabricOverlay, viewer } = useFabricOverlayState();

  const handleClearCanvas = () => {
    fabricOverlay.fabricCanvas().clear();
  };

  const handleNewBoxClick = () => {
    const fabCanvas = fabricOverlay.fabricCanvas();
    const rect = new fabric.Rect();
    rect.set({ width: 100, height: 100, fill: 'blue' });
    fabCanvas.add(rect);
    rect.set({ angle: 45 });
  };

  const handleRedBoxClick = () => {
    // Add fabric rectangle
    var rect = new fabric.Rect({
      left: 0,
      top: 0,
      fill: 'red',
      width: 200,
      height: 200,
    });
    fabricOverlay.fabricCanvas().add(rect);
  };

  const handleToolSelect = tool => {
    console.log('tool', tool);
    //setActiveTool(tool);
  };
  return (
    <Flex h="100vh">
      <LayoutSidebar>
        <Toolbar
          activeTool={activeTool}
          handleClearCanvas={handleClearCanvas}
          handleNewBoxClick={handleNewBoxClick}
          handleRedBoxClick={handleRedBoxClick}
          handleToolSelect={handleToolSelect}
        />
        <LayoutSidebarNav />
      </LayoutSidebar>

      <Box flex="1">
        <ViewerHeader />
        <Viewer />
        <ViewerFooter />
      </Box>
    </Flex>
  );
}

LayoutApp.propTypes = {};

export default LayoutApp;
