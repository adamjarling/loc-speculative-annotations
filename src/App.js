import React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import Layout from './components/Layout';
import KonvaTest from './components/KonvaTest';
import OpenSeadragonViewer from './components/OpenSeadragonViewer';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        {/* <IIIFImage /> */}
        <hr />
        <OpenSeadragonViewer />
      </Layout>
    </ChakraProvider>
  );
}

export default App;
