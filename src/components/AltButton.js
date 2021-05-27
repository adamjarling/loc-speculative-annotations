import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@chakra-ui/react';

function AltButton({ children, ...restProps }) {
  return (
    <Button
      size="sm"
      textTransform="uppercase"
      variant="ghost"
      fontSize={{ base: 'xs', md: 'sm' }}
      {...restProps}
    >
      {children}
    </Button>
  );
}

AltButton.propTypes = {
  children: PropTypes.node,
};

export default AltButton;
