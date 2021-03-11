import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@chakra-ui/react';

function AltButton({ children, ...restProps }) {
  return (
    <Button size="sm" textTransform="uppercase" variant="ghost" {...restProps}>
      {children}
    </Button>
  );
}

AltButton.propTypes = {
  children: PropTypes.node,
};

export default AltButton;
