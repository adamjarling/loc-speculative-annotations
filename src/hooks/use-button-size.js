import { useBreakpointValue } from '@chakra-ui/react';

export default function useButtonSize() {
  const buttonSize = useBreakpointValue({ base: 'xs', sm: 'sm', md: 'md' });
  return buttonSize;
}
