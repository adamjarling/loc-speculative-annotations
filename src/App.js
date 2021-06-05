import React from 'react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import OsdFabricWrapper from 'components/OsdFabricWrapper';
import { Fonts } from 'components/TypeText/Fonts';
import LayoutApp from 'components/Layout/App/App';
import LayoutSite from 'components/Layout/Site/Site';
import brandPalette from 'styles/brandPalette';
import SiteAbout from 'components/Site/About';
import SiteTeach from 'components/Site/Teach';
import IntroMessage from 'components/IntroMessage';

const Button = {
  variants: {
    saPink: {
      bg: 'brand.pink.500',
      color: 'white',
      _hover: {
        bg: 'brand.pink.400',
      },
    },
    saRust: {
      bg: 'brand.rust.400',
      color: 'white',
      _hover: {
        bg: 'brand.rust.300',
      },
    },
    saWhite: {
      bg: 'white',
      color: 'brand.pink.500',
      _hover: {
        bg: 'white.100',
      },
    },
  },
};

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
  components: {
    Button,
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
      p: {
        marginBottom: '1rem',
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
          <IntroMessage />
          <Switch>
            <Route exact path="/about">
              <LayoutSite>
                <SiteAbout />
              </LayoutSite>
            </Route>
            <Route exact path="/teach">
              <LayoutSite>
                <SiteTeach />
              </LayoutSite>
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
