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
import FontFaceObserver from 'fontfaceobserver';

function TypeTextPointAndDrop({ isActive }) {
  const dispatch = useFabricOverlayDispatch();
  const { fabricOverlay, viewer } = useFabricOverlayState();

  // Solution to retain state value in event handler callbacks
  // https://medium.com/geographit/accessing-react-state-in-event-listeners-with-usestate-and-useref-hooks-8cceee73c559
  const [myState, _setMyState] = React.useState({
    activeFont: fonts[0],
    activeSize: sizes[1],
    isActive,
    isSelected: false,
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
        editingBorderColor: '#18b300',
        fontFamily: myStateRef.current.activeFont.fontFamily,
        fontSize: myStateRef.current.activeSize.fontSizePixels,
      });
      fabricOverlay.fabricCanvas().add(textbox);

      // De-activate Text tool after adding text to the canvas
      dispatch({ type: 'updateTool', tool: 'POINTER' });
    }

    function handleSelectionCleared(options) {
      console.log('options', options);
      if (!myStateRef.current.isSelected) return;

      setMyState({ ...myState, isSelected: false });
    }

    function handleSelectionCreated(options) {
      console.log('options', options);
      if (options.target.get('type') !== 'textbox') return;

      setMyState({ ...myState, isSelected: true });
    }

    // Add click handlers
    canvas.on('mouse:down', handleMouseDown);
    canvas.on('selection:created', handleSelectionCreated);
    canvas.on('selection:cleared', handleSelectionCleared);

    // Remove handler
    return function clearFabricEventHandlers() {
      canvas.off('mouse:down', handleMouseDown);
      canvas.off('selection:created', handleSelectionCreated);
      canvas.off('selection:cleared', handleSelectionCleared);
    };
  }, [fabricOverlay]);

  /**
   * Handle Type tool being selected in main Toolbar
   */
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

  /**
   * Update a selected textbox
   */
  React.useEffect(() => {
    console.log('useEffect()', myState);
    if (!myState.isSelected || !fabricOverlay) return;
    const canvas = fabricOverlay.fabricCanvas();

    canvas.getActiveObject().setOptions({
      fontSize: myState.activeSize.fontSizePixels,
    });
    canvas.requestRenderAll();
  }, [myState.activeFont, myState.activeSize]);

  const handleFontChange = font => {
    setMyState({ ...myState, activeFont: font });
    loadAndUse(font.fontFamily);
  };

  const handleSizeChange = size => {
    setMyState({ ...myState, activeSize: size });
  };

  const handleToolbarButtonClick = e => {
    dispatch({ type: 'updateTool', tool: isActive ? '' : 'TYPE' });
  };

  const loadAndUse = font => {
    const canvas = fabricOverlay.fabricCanvas();
    const activeObject = canvas.getActiveObject();

    if (!activeObject) {
      return;
    }

    var myfont = new FontFaceObserver(font);
    myfont
      .load()
      .then(function () {
        // when font is loaded, use it.
        canvas.getActiveObject().set('fontFamily', font);
        canvas.requestRenderAll();
      })
      .catch(function (e) {
        console.error(e);
      });
  };

  return (
    <div>
      <ToolbarButton
        onClick={handleToolbarButtonClick}
        icon={<FiType />}
        isActive={isActive}
        label="Type Text"
      />
      {(isActive || myState.isSelected) && (
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
