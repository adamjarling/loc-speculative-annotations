import React from 'react';
import PropTypes from 'prop-types';
import { IconButton, Tooltip } from '@chakra-ui/react';

function ToolbarButton({ label = 'Toolbar button', isActive, ...restProps }) {
  return (
    <Tooltip
      label={label}
      aria-label={label}
      placement="right-end"
      openDelay={500}
    >
      <IconButton
        size="lg"
        fontSize="2xl"
        variant={isActive ? 'solid' : 'ghost'}
        {...restProps}
      />
    </Tooltip>
  );
}

ToolbarButton.propTypes = {
  label: PropTypes.string,
  isActive: PropTypes.bool,
};

export default ToolbarButton;
