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
import useFabricHelpers from 'hooks/use-fabric-helpers';
import { useToolbarOptionsState } from 'context/toolbar-options-context';
import { useBreakpointValue } from '@chakra-ui/react';

function TypeText({ isActive }) {
  const dispatch = useFabricOverlayDispatch();
  const { fabricOverlay, viewer } = useFabricOverlayState();
  const { color } = useToolbarOptionsState();
  const { deselectAll, setDefaultCursor } = useFabricHelpers();
  const textBoxWidth = useBreakpointValue({ base: 200, sm: 300, lg: 500 });
  const textBoxFontSize = useBreakpointValue({ base: 20, sm: 30, lg: 50 });

  const [myState, _setMyState] = React.useState({
    activeFont: fonts[0],
    color,
    isActive, // Is the main Type tool active
    isEditing: false,
    isOptionPanelVisible: false,
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

    // User is leaving tool, re-enable OSD mouse interactions
    if (!isActive) {
      // Enable OSD mouseclicks
      viewer.setMouseNavEnabled(true);
      viewer.outerTracker.setTracking(true);
    }

    setDefaultCursor(isActive ? 'text' : 'auto');
  }, [color, isActive]);

  React.useEffect(() => {
    if (!isActive) return;
    if (myState.isEditing) {
      setDefaultCursor(myState.isEditing ? 'auto' : 'text');
    }
  }, [myState.isEditing]);

  /**
   * Handle an individual font being selected
   */
  React.useEffect(() => {
    if (!fabricOverlay) return;

    if (myState.activeFont) {
      // Disable OSD mouseclicks
      viewer.setMouseNavEnabled(false);
      viewer.outerTracker.setTracking(false);

      // Deselect all Fabric Canvas objects
      deselectAll();
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
      if (
        options.target || // NOTE: this code blocks adding text onto an existing Fabric object
        !myStateRef.current.isActive ||
        // Block the extra touchstart event fired for touch devices
        options.e.type === 'touchstart'
      ) {
        return;
      }

      // Was user previously editing text?
      if (myStateRef.current.isEditing) {
        deselectAll();
        setMyState({
          ...myStateRef.current,
          isEditing: false,
          isOptionPanelVisible: true,
        });
        return;
      }

      // Create new Textbox instance and add it to canvas
      const textbox = new fabric.Textbox('', {
        left: options.absolutePointer.x,
        top: options.absolutePointer.y,
        fontFamily: myStateRef.current.activeFont.fontFamily,
        fontSize: textBoxFontSize,
        height: 50,
        padding: 10,
        // The config option below puts a light, white opacity as background
        //selectionBackgroundColor: 'rgba(255, 255, 255, 0.2)',
        width: textBoxWidth,
      });
      fabricOverlay.fabricCanvas().add(textbox);
      textbox.set({ fill: myStateRef.current.color.hex });
      canvas.setActiveObject(textbox);
      textbox.enterEditing();
      // Make the border of active edited text white instead of light blue
      textbox.borderColor = '#ffffff';

      setMyState({
        ...myStateRef.current,
        isEditing: true,
        isOptionPanelVisible: false,
      });
    }

    function handleSelectionCleared(options) {
      if (!myStateRef.current.isSelectedOnCanvas) return;

      setMyState({
        ...myStateRef.current,
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
  };

  const handleToolbarButtonClick = e => {
    //dispatch({ type: 'updateTool', tool: isActive ? '' : 'TYPE' });
    dispatch({ type: 'updateTool', tool: 'TYPE' });
    setMyState({
      ...myState,
      isOptionPanelVisible: !myState.isOptionPanelVisible,
    });
  };

  return (
    <div>
      <ToolbarButton
        onClick={handleToolbarButtonClick}
        icon={<FiType />}
        isActive={isActive}
        label="Type Text"
        data-testid="type-text-control"
      />
      {isActive && myState.isOptionPanelVisible && (
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
