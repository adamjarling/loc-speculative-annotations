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
import { fonts } from 'components/TypeText/FontPicker';
import FontFaceObserver from 'fontfaceobserver';
import OptionsBar from 'components/OptionsBar/OptionsBar';

function TypeText({ isActive }) {
  const dispatch = useFabricOverlayDispatch();
  const { fabricOverlay, viewer } = useFabricOverlayState();

  const [myState, _setMyState] = React.useState({
    activeFont: fonts[0],
    isActive,
    isSelected: false,
    previewText: 'Type something',
    selectedCoords: { top: 0, left: 0 },
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
      const textbox = new fabric.Textbox(myStateRef.current.previewText, {
        left: options.absolutePointer.x,
        top: options.absolutePointer.y,
        editingBorderColor: '#18b300',
        fontFamily: myStateRef.current.activeFont.fontFamily,
        fontSize: 100,
      });
      fabricOverlay.fabricCanvas().add(textbox);

      // De-activate Text tool after adding text to the canvas
      dispatch({ type: 'updateTool', tool: 'POINTER' });
    }

    function handleSelectionCleared(options) {
      if (!myStateRef.current.isSelected) return;

      setMyState({
        ...myState,
        isSelected: false,
        selectedCoords: { top: 0, left: 0 },
      });
    }

    function handleSelected(options) {
      if (options.target.get('type') !== 'textbox') return;
      console.log('handleSelected', options);

      const canvas = fabricOverlay.fabricCanvas();
      const activeObject = canvas.getActiveObject();
      console.log('activeObject', activeObject);

      setMyState({
        ...myState,
        isSelected: true,
        // TODO: Figure out how to center place this w/ coords on canvas
        selectedCoords: {
          top: options.e.y,
          left: options.e.x,
        },
      });
    }

    // Add click handlers
    canvas.on('mouse:down', handleMouseDown);
    canvas.on('selection:created', handleSelected);
    canvas.on('selection:updated', handleSelected);
    canvas.on('selection:cleared', handleSelectionCleared);

    // Remove handler
    return function clearFabricEventHandlers() {
      canvas.off('mouse:down', handleMouseDown);
      canvas.off('selection:created', handleSelected);
      canvas.off('selection:updated', handleSelected);
      canvas.off('selection:cleared', handleSelectionCleared);
    };
  }, [fabricOverlay]);

  /**
   * Handle Type tool being selected in main Toolbar
   */
  React.useEffect(() => {
    if (!fabricOverlay) return;
    const canvas = fabricOverlay.fabricCanvas();

    // Update state here so the event listener callbacks can access accurate values
    setMyState({ ...myState, isActive, isSelected: false });

    if (isActive) {
      // Disable OSD mouseclicks
      viewer.setMouseNavEnabled(false);
      viewer.outerTracker.setTracking(false);

      // Deselect all Fabric Canvas objects
      canvas.discardActiveObject();
      canvas.requestRenderAll();
    } else {
      // Enable OSD mouseclicks
      viewer.setMouseNavEnabled(true);
      viewer.outerTracker.setTracking(true);
    }
  }, [isActive]);

  /**
   * Update a selected textbox
   */
  // React.useEffect(() => {
  //   console.log('useEffect()', myState);
  //   if (!myState.isSelected || !fabricOverlay) return;
  //   const canvas = fabricOverlay.fabricCanvas();
  //   //canvas.requestRenderAll();
  // }, [myState.activeFont]);

  const handleFontChange = font => {
    setMyState({ ...myState, activeFont: font });
    //loadAndUse(font.fontFamily);
  };

  const handlePreviewTextChange = e => {
    setMyState({ ...myState, previewText: e.target.value });
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
      {isActive && (
        <ToolbarOptionsPanel>
          <TypeTextFontPicker
            activeFont={myState.activeFont}
            handleFontChange={handleFontChange}
            handlePreviewTextChange={handlePreviewTextChange}
            previewText={myState.previewText}
          />
        </ToolbarOptionsPanel>
      )}
      {myState.isSelected && (
        <OptionsBar left={340}>Type tool options go here</OptionsBar>
      )}
    </div>
  );
}

TypeText.propTypes = {
  isActive: PropTypes.bool,
};

export default TypeText;
