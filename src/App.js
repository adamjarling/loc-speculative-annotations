import React from 'react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import OsdFabricWrapper from 'components/OsdFabricWrapper';
import { Fonts } from 'components/TypeText/Fonts';
import LayoutApp from 'components/Layout/App/App';
import LayoutSite from 'components/Layout/Site/Site';
import brandPalette from 'styles/brandPalette';

export const theme = extendTheme({
  colors: {
    brand: brandPalette,
  },
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  fonts: {
    heading: 'ocr-a-std',
    body: 'Open Sans',

    courierPrime: 'Courier Prime',
    ocrAStd: 'ocr-a-std',
    openSans: 'Open Sans',
    reenieBeanie: 'Reenie Beanie',
  },

  styles: {
    global: {
      button: {
        fontFamily: 'ocr-a-std',
      },
      header: {
        fontFamily: 'ocr-a-std',
      },
      nav: {
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
