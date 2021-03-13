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

function TypeText({ isActive }) {
  const dispatch = useFabricOverlayDispatch();
  const { color, fabricOverlay, viewer } = useFabricOverlayState();

  const [myState, _setMyState] = React.useState({
    activeFont: fonts[0],
    color,
    isActive, // Is the main Type tool active
    isEditing: false,
    selectedCoords: { top: 0, left: 0 },
  });
  const myStateRef = React.useRef(myState);
  const setMyState = data => {
    myStateRef.current = data;
    _setMyState(data);
  };

  /**
   * Handle main tool change
   */
  React.useEffect(() => {
    setMyState({ ...myState, color, isActive });

    if (!fabricOverlay) return;
    fabricOverlay.fabricCanvas().defaultCursor = isActive ? 'text' : 'auto';
  }, [color, isActive]);

  React.useEffect(() => {
    if (!isActive) return;
    if (myState.isEditing) {
      fabricOverlay.fabricCanvas().defaultCursor = 'auto';
      fabricOverlay.fabricCanvas().hoverCursor = 'text';
    } else {
      fabricOverlay.fabricCanvas().defaultCursor = 'text';
      fabricOverlay.fabricCanvas().hoverCursor = 'move';
    }
  }, [myState.isEditing]);

  /**
   * Handle an individual font being selected
   */
  React.useEffect(() => {
    if (!fabricOverlay) return;
    const canvas = fabricOverlay.fabricCanvas();

    if (myState.activeFont) {
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
  }, [myState.activeFont]);

  /**
   * Set up event handlers when Fabric is ready
   */
  React.useEffect(() => {
    if (!fabricOverlay) return;
    const canvas = fabricOverlay.fabricCanvas();

    function handleMouseDown(options) {
      // Selected an existing object OR not in Type Tool mode
      if (options.target || !myStateRef.current.isActive) {
        return;
      }

      // Was user previously editing text?
      if (myStateRef.current.isEditing) {
        canvas.discardActiveObject();
        setMyState({ ...myStateRef.current, isEditing: false });
        return;
      }

      // Create new Textbox instance and add it to canvas
      const textbox = new fabric.IText('', {
        left: options.absolutePointer.x,
        top: options.absolutePointer.y,
        fontFamily: myStateRef.current.activeFont.fontFamily,
        fontSize: 100,
        selectionBackgroundColor: 'rgba(255, 255, 255, 0.5)',
      });
      fabricOverlay.fabricCanvas().add(textbox);
      textbox.set({ fill: myStateRef.current.color.hex });
      canvas.setActiveObject(textbox);
      textbox.enterEditing();

      setMyState({
        ...myStateRef.current,
        isEditing: true,
      });
    }

    function handleSelectionCleared(options) {
      if (!myStateRef.current.isSelectedOnCanvas) return;

      setMyState({
        ...myStateRef.current,
        selectedCoords: { top: 0, left: 0 },
      });
    }

    function handleSelected(options) {
      if (options.target.get('type') !== 'textbox') return;

      setMyState({
        ...myStateRef.current,
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

  const handleFontChange = font => {
    setMyState({ ...myState, activeFont: font });
    //loadAndUse(font.fontFamily);
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
          />
        </ToolbarOptionsPanel>
      )}
    </div>
  );
}

TypeText.propTypes = {
  isActive: PropTypes.bool,
};

export default TypeText;
