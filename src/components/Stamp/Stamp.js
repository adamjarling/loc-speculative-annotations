import React from 'react';
import PropTypes from 'prop-types';
import { FaStamp } from 'react-icons/fa';
import { fabric } from 'openseadragon-fabricjs-overlay';
import ToolbarButton from 'components/Toolbar/Button';
import ToolbarOptionsPanel from 'components/Toolbar/OptionsPanel';
import {
  useFabricOverlayDispatch,
  useFabricOverlayState,
} from 'context/fabric-overlay-context';
import StampPicker from 'components/Stamp/Picker';

function Stamp({ isActive }) {
  const { color, fabricOverlay, viewer } = useFabricOverlayState();
  const dispatch = useFabricOverlayDispatch();

  const [myState, _setMyState] = React.useState({
    activeStamp: null,
    isActive, // Is the Shape tool itself active
  });
  const myStateRef = React.useRef(myState);
  const setMyState = data => {
    myStateRef.current = data;
    _setMyState(data);
  };

  const handleToolbarButtonClick = () => {
    dispatch({ type: 'updateTool', tool: isActive ? '' : 'STAMP' });
  };

  const handleStampChange = stampObj => {
    console.log('color', color);
    fabric.loadSVGFromURL(stampObj.src, function (objects, options) {
      const obj = fabric.util
        .groupSVGElements(objects, options)
        .set({ left: 100, top: 100, fill: color.hex });
      fabricOverlay.fabricCanvas().add(obj).renderAll();
    });
  };

  return (
    <div>
      <ToolbarButton
        onClick={handleToolbarButtonClick}
        icon={<FaStamp />}
        isActive={isActive}
        label="Stamp"
        disabled={false}
      />
      {isActive && (
        <ToolbarOptionsPanel>
          <StampPicker
            activeStamp={myState.activeStamp}
            color={color}
            handleStampChange={handleStampChange}
          />
        </ToolbarOptionsPanel>
      )}
    </div>
  );
}

Stamp.propTypes = {
  activeTool: PropTypes.string,
};

export default Stamp;
