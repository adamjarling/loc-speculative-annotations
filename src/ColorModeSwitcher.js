import React from 'react';
import { useColorMode, useColorModeValue, IconButton } from '@chakra-ui/react';
import { FaMoon } from 'react-icons/fa';
import { ImSun } from 'react-icons/im';
import useFabricHelpers from 'hooks/use-fabric-helpers';

export const ColorModeSwitcher = props => {
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue('dark', 'light');
  const SwitchIcon = useColorModeValue(FaMoon, ImSun);
  const { updateControlStyle } = useFabricHelpers();

  const handleChangeColor = () => {
    toggleColorMode();
    updateControlStyle(text);
  };

  return (
    <IconButton
      size={['sm']}
      fontSize={['md', 'lg']}
      aria-label={`Switch to ${text} mode`}
      variant="ghost"
      color="current"
      onClick={handleChangeColor}
      icon={<SwitchIcon />}
      {...props}
    />
  );
};
