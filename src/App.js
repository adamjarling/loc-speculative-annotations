import React from 'react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import Layout from './components/Layout';
import { ViewerProvider } from 'use-open-seadragon';
import WorkSpace from './components/WorkSpace';
import { FabricOverlayProvider } from './context/fabric-overlay-context';
import brandPalette from 'styles/brandPalette';

const theme = extendTheme({
  colors: {
    brand: brandPalette,
  },
});

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
