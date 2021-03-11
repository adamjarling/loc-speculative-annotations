import { useColorModeValue } from '@chakra-ui/react';

export default function useColorModeColors() {
  return {
    bg: useColorModeValue('gray.200', 'gray.700'),
  };
}
