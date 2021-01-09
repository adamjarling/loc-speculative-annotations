import React from 'react';
import PropTypes from 'prop-types';
import { IconButton, Tooltip } from '@chakra-ui/react';

function ToolbarButton({ label = 'Toolbar button', ...restProps }) {
  return (
    <Tooltip label={label} aria-label={label}>
      <IconButton size="lg" fontSize="2xl" {...restProps} />
    </Tooltip>
  );
}

ToolbarButton.propTypes = {};

export default ToolbarButton;
