import React from 'react';
import PropTypes from 'prop-types';
import { BiPointer } from 'react-icons/bi';
import ToolbarButton from 'components/Toolbar/Button';
import { useFabricOverlayDispatch } from 'context/fabric-overlay-context';
import useFabricHelpers from 'hooks/use-fabric-helpers';

function ToolbarPointerControl({ isActive }) {
  const dispatch = useFabricOverlayDispatch();
  const { updateCursor } = useFabricHelpers();

  const handleToolbarClick = () => {
    dispatch({ type: 'updateTool', tool: isActive ? '' : 'POINTER' });
    // This slight delay ensures the cursor is updated after any individual
    // Tool cursor cleanup updates happen.  Insurance wrapper.
    setTimeout(() => updateCursor(), 500);
  };

  return (
    <ToolbarButton
      onClick={handleToolbarClick}
      icon={<BiPointer />}
      isActive={isActive}
      label="Select"
    />
  );
}

ToolbarPointerControl.propTypes = {
  isActive: PropTypes.bool,
};

export default ToolbarPointerControl;
