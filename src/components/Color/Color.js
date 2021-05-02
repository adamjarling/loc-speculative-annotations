import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@chakra-ui/react';
import { useFabricOverlayState } from 'context/fabric-overlay-context';
import ColorOptionsPanel from 'components/Color/OptionsPanel';
import {
  useToolbarOptionsDispatch,
  useToolbarOptionsState,
} from 'context/toolbar-options-context';

function Color({ buttonSize }) {
  const toolbarDispatch = useToolbarOptionsDispatch();
  const { color } = useToolbarOptionsState();
  const { activeTool, fabricOverlay } = useFabricOverlayState();

  const [myState, _setMyState] = React.useState({
    isObjectSelected: false,
  });
  const myStateRef = React.useRef(myState);
  const setMyState = data => {
    myStateRef.current = data;
    _setMyState(data);
  };

  React.useEffect(() => {
    setMyState({
      ...myState,
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
    toolbarDispatch({ type: 'updateColor', color });
  };

  return (
    <Box pl={3}>
      <ColorOptionsPanel
        buttonSize={buttonSize}
        color={color}
        handleColorSelect={handleColorSelect}
      />
    </Box>
  );
}

Color.propTypes = {
  buttonSize: PropTypes.object,
};

export default Color;
