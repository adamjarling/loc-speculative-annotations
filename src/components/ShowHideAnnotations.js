import React from 'react';
import { Box, Checkbox, Flex, Icon, Stack, Text } from '@chakra-ui/react';
import { BiOutline } from 'react-icons/bi';

const fontSize = 'sm';

export default function ShowHideAnnotations() {
  return (
    <Stack spacing={5} direction="row" ml={6} align="center">
      <Flex alignItems="center">
        <BiOutline />
        <Text ml={2} fontFamily="ocrAStd">
          Change Display:{' '}
        </Text>
      </Flex>

      <Checkbox defaultIsChecked disabled={true} onChange={() => false}>
        <Text fontSize={fontSize}>Your Annotations</Text>
      </Checkbox>
      <Checkbox disabled={true}>
        <Text fontSize={fontSize}>Curators Annotations</Text>
      </Checkbox>
    </Stack>
  );
}
