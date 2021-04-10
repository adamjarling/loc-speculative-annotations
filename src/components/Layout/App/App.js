import React from 'react';
import { Flex } from '@chakra-ui/react';
import Toolbar from 'components/Toolbar/Toolbar';
import ViewerContainer from 'components/Viewer/Container';
import LayoutHeader from 'components/Layout/Header';
import LayoutAppBody from 'components/Layout/App/Body';
import LayoutAppSidebar from './Sidebar';
import LayoutAppFooter from './Footer';
import Div100vh from 'react-div-100vh';
import ShareQueryParamHandler from 'components/Share/QueryParamHandler';
import useKeyboardEvents from 'hooks/use-keyboard-events';
import { useFabricOverlayState } from 'context/fabric-overlay-context';
import AdjustmentBar from 'components/AdjustmentBar/AdjustmentBar';
import IntroMessage from 'components/IntroMessage';

function LayoutApp() {
  const { fabricOverlay, isToolbarVisible } = useFabricOverlayState();
  useKeyboardEvents();

  React.useEffect(() => {
    if (!fabricOverlay) return;
    fabricOverlay.fabricCanvas().hoverCursor = 'move';
  }, [fabricOverlay]);

  return (
    <Flex as={Div100vh} h="100vh" direction="column">
      <ShareQueryParamHandler />
      <IntroMessage />
      <LayoutHeader />
      <AdjustmentBar />
      <LayoutAppBody>
        <LayoutAppSidebar>
          {isToolbarVisible && (
            <>
              <Toolbar />
            </>
          )}
        </LayoutAppSidebar>
        <ViewerContainer />
      </LayoutAppBody>
      <LayoutAppFooter />
    </Flex>
  );
}

LayoutApp.propTypes = {};

export default LayoutApp;
