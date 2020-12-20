import React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import Layout from './components/Layout';
import { ViewerProvider } from 'use-open-seadragon';
import WorkSpace from './components/WorkSpace';
import { FabricOverlayProvider } from './context/fabric-overlay-context';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <ViewerProvider>
        <FabricOverlayProvider>
          <Layout>
            <WorkSpace />
          </Layout>
        </FabricOverlayProvider>
      </ViewerProvider>
    </ChakraProvider>
  );
}

export default App;
