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
  const { activeTool } = useFabricOverlayState();

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

  const handleColorSelect = color => {
    toolbarDispatch({ type: 'updateColor', color });
  };

  return (
    <Box pl={3} data-testid="color-options-wrapper">
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
