import React from 'react';
import { useColorMode, useColorModeValue, IconButton } from '@chakra-ui/react';
import { FaMoon, FaSun } from 'react-icons/fa';
import useFabricHelpers from 'hooks/use-fabric-helpers';

export const ColorModeSwitcher = props => {
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue('dark', 'light');
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);
  const { updateControlStyle } = useFabricHelpers();

  const handleChangeColor = () => {
    toggleColorMode();
    updateControlStyle(text);
  };

  return (
    <IconButton
      size="md"
      fontSize="lg"
      aria-label={`Switch to ${text} mode`}
      variant="ghost"
      color="current"
      marginLeft="2"
      onClick={handleChangeColor}
      icon={<SwitchIcon />}
      {...props}
    />
  );
};
