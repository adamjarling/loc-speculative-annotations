import React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import Layout from './components/Layout';
import OpenSeadragonViewer from './components/OpenSeadragonViewer';
import { ViewerProvider } from 'use-open-seadragon';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <ViewerProvider>
        <Layout>
          {/* <IIIFImage /> */}
          <hr />
          <OpenSeadragonViewer />
        </Layout>
      </ViewerProvider>
    </ChakraProvider>
  );
}

export default App;
