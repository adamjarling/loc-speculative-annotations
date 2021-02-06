import React from 'react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import brandPalette from 'styles/brandPalette';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import KonvaWrapper from 'components/Konva/KonvaWrapper';
import OsdFabricWrapper from 'components/OsdFabricWrapper';
import { Fonts } from 'components/TypeText/Fonts';
import LayoutApp from 'components/Layout/App/App';
import LayoutSite from 'components/Layout/Site/Site';

const theme = extendTheme({
  colors: {
    brand: brandPalette,
  },
  fonts: {
    courierPrime: 'Courier Prime',
    ocrAStd: 'ocr-a-std',
    openSans: 'Open Sans',
    reenieBeanie: 'Reenie Beanie',
  },
  styles: {
    global: {
      body: {
        fontFamily: 'ocr-a-std',
      },
    },
  },
});

function App() {
  return (
    <Router>
      <ChakraProvider theme={theme}>
        <OsdFabricWrapper>
          <Fonts />
          <Switch>
            <Route exact path="/about">
              <LayoutSite />
            </Route>
            <Route path="/:id?">
              <LayoutApp />
            </Route>
          </Switch>
        </OsdFabricWrapper>
      </ChakraProvider>
    </Router>
  );
}

export default App;
