import React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import Layout from './components/Layout';
import IIIFImage from './components/IIIFImage';
import KonvaTest from './components/KonvaTest';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        {/* <IIIFImage /> */}
        <hr />
        <KonvaTest />
      </Layout>
    </ChakraProvider>
  );
}

export default App;
