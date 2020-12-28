import React from 'react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import brandPalette from 'styles/brandPalette';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import KonvaWrapper from 'components/Konva/KonvaWrapper';
import OsdFabricWrapper from 'components/OsdFabricWrapper';

const theme = extendTheme({
  colors: {
    brand: brandPalette,
  },
});

function App() {
  return (
    <Router>
      <ChakraProvider theme={theme}>
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
