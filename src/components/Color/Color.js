import React from 'react';
import { Box } from '@chakra-ui/react';
import {
  useFabricOverlayDispatch,
  useFabricOverlayState,
} from 'context/fabric-overlay-context';
import ColorOptionsPanel from 'components/Color/OptionsPanel';

function Color() {
  const dispatch = useFabricOverlayDispatch();
  const { activeTool, color, fabricOverlay } = useFabricOverlayState();

  const [myState, _setMyState] = React.useState({
    isObjectSelected: false,
    isActiveTool: false,
  });
  const myStateRef = React.useRef(myState);
  const setMyState = data => {
    myStateRef.current = data;
    _setMyState(data);
  };

  React.useEffect(() => {
    setMyState({
      ...myState,
      isActiveTool: Boolean(
        activeTool && ['POINTER', 'STAMP_QUESTION'].indexOf(activeTool) === -1
      ),
    });
  }, [activeTool]);

  /**
   * Handle FabricJS object selection / deselection events
   * NOTE: The code below handles when a user selects or deselects a FabricJS
   * object. It could be used to show/hide controls in the Adjustment bar, if
   * a user was updating an existing object (say changing it's color, or font size, etc.)
   */
  /*
  React.useEffect(() => {
    if (!fabricOverlay) return;

    function handleSelectionCleared(e) {
      setMyState({ ...myStateRef.current, isObjectSelected: false });
    }
    function handleSelectionCreated(e) {
      setMyState({ ...myStateRef.current, isObjectSelected: true });
    }
    function handleSelectionUpdated(e) {}

    const canvas = fabricOverlay.fabricCanvas();
    canvas.on('selection:created', handleSelectionCreated);
    canvas.on('selection:cleared', handleSelectionCleared);
    canvas.on('selection:updated', handleSelectionUpdated);

    return () => {
      canvas.off('selection:created', handleSelectionCreated);
      canvas.off('selection:cleared', handleSelectionCleared);
      canvas.off('selection:updated', handleSelectionUpdated);
    };
  }, [fabricOverlay]);
  */

  const handleColorSelect = color => {
    dispatch({ type: 'updateColor', color });
  };

  return (
    <Box pl={3}>
      <ColorOptionsPanel
        color={color}
        handleColorSelect={handleColorSelect}
        isVisible={myState.isActiveTool}
      />
    </Box>
  );
}

export default Color;
