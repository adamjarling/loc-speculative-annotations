import React from 'react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import brandPalette from 'styles/brandPalette';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import KonvaWrapper from 'components/Konva/KonvaWrapper';
import OsdFabricWrapper from 'components/OsdFabricWrapper';
import { Fonts } from 'components/TypeText/Fonts';

const theme = extendTheme({
  colors: {
    brand: brandPalette,
  },
  fonts: {
    staatliches: 'Staatliches',
    xanhMono: 'Xanh Mono',
    yellowtail: 'Yellowtail',
  },
});

function App() {
  return (
    <Router>
      <ChakraProvider theme={theme}>
        <Fonts />
        <Switch>
          <Route path="/konva">
            <KonvaWrapper />
          </Route>
          <Route path="/">
            <OsdFabricWrapper />
          </Route>
        </Switch>
      </ChakraProvider>
    </Router>
  );
}

export default App;
