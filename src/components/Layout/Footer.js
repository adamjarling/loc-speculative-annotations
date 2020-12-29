import React from 'react';
import { Box, Center, Link, Wrap, WrapItem } from '@chakra-ui/react';
import { Link as RRLink } from 'react-router-dom';

export default function LayoutFooter() {
  return (
    <Box mb={8} fontSize="sm">
      <Wrap spacing="10px" justify="center">
        <WrapItem>
          <Center>SA footer here</Center>
        </WrapItem>
        <WrapItem>
          <Center>
            <Link as={RRLink} to="/">
              Regular Version
            </Link>
          </Center>
        </WrapItem>
        <WrapItem>
          <Center>
            <Link as={RRLink} to="/konva">
              Konva version
            </Link>
          </Center>
        </WrapItem>
      </Wrap>
    </Box>
  );
}
