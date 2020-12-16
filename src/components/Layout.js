import React from 'react';
import { Box, VStack, Grid } from '@chakra-ui/react';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import logo from '../images/logo.png';

export default function Layout({ children }) {
  return (
    <Box>
      <Grid>
        <ColorModeSwitcher justifySelf="flex-end" />
        <VStack spacing={8}>
          <React.Fragment>
            <img src={logo} alt="logo" style={{ width: '300px' }} />
            {children}
          </React.Fragment>
        </VStack>
      </Grid>
    </Box>
  );
}
