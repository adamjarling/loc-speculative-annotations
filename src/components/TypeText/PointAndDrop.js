import React from 'react';
import PropTypes from 'prop-types';
import ToolbarButton from 'components/Toolbar/Button';
import { FiType } from 'react-icons/fi';
import { fabric } from 'openseadragon-fabricjs-overlay';
import {
  useFabricOverlayDispatch,
  useFabricOverlayState,
} from 'context/fabric-overlay-context';
import TypeTextFontPicker from 'components/TypeText/FontPicker';
import ToolbarOptionsPanel from 'components/Toolbar/OptionsPanel';
import { Divider } from '@chakra-ui/react';
import { fonts } from 'components/TypeText/FontPicker';
import { sizes } from 'components/TypeText/SizePicker';
import TypeTextSizePicker from 'components/TypeText/SizePicker';

function TypeTextPointAndDrop({ isActive }) {
  const dispatch = useFabricOverlayDispatch();
  const { fabricOverlay, viewer } = useFabricOverlayState();

  // Solution to retain state value in event handler callbacks
  // https://medium.com/geographit/accessing-react-state-in-event-listeners-with-usestate-and-useref-hooks-8cceee73c559
  const [myState, _setMyState] = React.useState({
    activeFont: fonts[0],
    activeSize: sizes[1],
    isActive,
  });
  const myStateRef = React.useRef(myState);
  const setMyState = data => {
    myStateRef.current = data;
    _setMyState(data);
  };

  React.useEffect(() => {
    if (!fabricOverlay) return;
    const canvas = fabricOverlay.fabricCanvas();

    function handleMouseDown(options) {
      if (options.target || !myStateRef.current.isActive) {
        return;
      }

      // Create new Textbox instance and add it to canvas
      const textbox = new fabric.Textbox('Type something here', {
        left: options.absolutePointer.x,
        top: options.absolutePointer.y,
        //width: 400,
        //backgroundColor: 'white',
        editingBorderColor: 'green',
        fontFamily: myStateRef.current.activeFont.fontFamily,
        fontSize: myStateRef.current.activeSize.fontSizePixels,
      });
      fabricOverlay.fabricCanvas().add(textbox);

      // Make pointer the active tool
      dispatch({ type: 'updateTool', tool: 'POINTER' });
    }

    // Add click handler
    canvas.on('mouse:down', handleMouseDown);

    // Remove handler
    return function clearFabricMouseDownHandler() {
      canvas.off('mouse:down', handleMouseDown);
    };
  }, [fabricOverlay]);

  React.useEffect(() => {
    if (!fabricOverlay) return;

    // Update state here so the event listener callbacks can access accurate values
    setMyState({ ...myState, isActive });

    if (isActive) {
      // Disable OSD mouseclicks
      viewer.setMouseNavEnabled(false);
      viewer.outerTracker.setTracking(false);
    } else {
      // Enable OSD mouseclicks
      viewer.setMouseNavEnabled(true);
      viewer.outerTracker.setTracking(true);
    }
  }, [isActive]);

  const handleFontChange = font => {
    setMyState({ ...myState, activeFont: font });
  };

  const handleSizeChange = size => {
    setMyState({ ...myState, activeSize: size });
  };

  const handleToolbarButtonClick = e => {
    dispatch({ type: 'updateTool', tool: isActive ? '' : 'TYPE' });
  };

  return (
    <div>
      <ToolbarButton
        onClick={handleToolbarButtonClick}
        icon={<FiType />}
        isActive={isActive}
        label="Type Text"
      />
      {isActive && (
        <ToolbarOptionsPanel>
          <TypeTextFontPicker
            handleFontChange={handleFontChange}
            activeFont={myState.activeFont}
          />
          <Divider my={3} />
          <TypeTextSizePicker
            activeSize={myState.activeSize}
            handleSizeChange={handleSizeChange}
          />
        </ToolbarOptionsPanel>
      )}
    </div>
  );
}

TypeTextPointAndDrop.propTypes = {
  isActive: PropTypes.bool,
};

export default TypeTextPointAndDrop;
