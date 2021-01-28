import React from 'react';
import PropTypes from 'prop-types';
import ToolbarButton from 'components/Toolbar/Button';
import ToolbarOptionsPanel from 'components/Toolbar/OptionsPanel';
import { FaShapes } from 'react-icons/fa';
import { useFabricOverlayDispatch } from 'context/fabric-overlay-context';
import ShapePicker from 'components/Shape/Picker';

function Shape({ isActive }) {
  const dispatch = useFabricOverlayDispatch();

  const handleToolbarClick = () => {
    dispatch({ type: 'updateTool', tool: isActive ? '' : 'SHAPE' });
  };

  return (
    <>
      <ToolbarButton
        onClick={handleToolbarClick}
        icon={<FaShapes />}
        isActive={isActive}
        label="Shape"
      />
      {isActive && (
        <ToolbarOptionsPanel>
          <ShapePicker />
        </ToolbarOptionsPanel>
      )}
    </>
  );
}

Shape.propTypes = { isActive: PropTypes.bool };

export default Shape;
