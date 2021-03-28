import React from 'react';
import PropTypes from 'prop-types';
import { IconButton, Tooltip } from '@chakra-ui/react';
import { RiArrowGoBackFill, RiArrowGoForwardLine } from 'react-icons/ri';
import useButtonSize from 'hooks/use-button-size';
import { useFabricOverlayState } from 'context/fabric-overlay-context';
import { useParams } from 'react-router-dom';
import 'fabric-history/src/index';

function UndoRedo(props) {
  const buttonSize = useButtonSize();
  const { fabricOverlay } = useFabricOverlayState();
  const [canvas, setCanvas] = React.useState();
  const params = useParams();

  React.useEffect(() => {
    if (!fabricOverlay) return;
    console.log(`useEffect fabricOverlay`, fabricOverlay.fabricCanvas());
    const canvasLocal = fabricOverlay.fabricCanvas();
    setCanvas(canvasLocal);
    canvasLocal.clearHistory();

    function handleHistoryAppend(e) {
      console.log(`e`, e);
    }

    // Add click handlers
    canvasLocal.on('history:append', handleHistoryAppend);

    // Remove handler
    return function clearFabricEventHandlers() {
      canvasLocal.off('history:append', handleHistoryAppend);
    };
  }, [fabricOverlay]);

  React.useEffect(() => {
    if (!params || !canvas) return;
    console.log(`useEffect params.id`, canvas);
    canvas.clearHistory();
  }, [params.id]);

  const handleUndo = () => {
    console.log(`canvas`, canvas);
    canvas.undo();
  };

  const handleRedo = () => {
    console.log(`canvas`, canvas);
    canvas.redo();
  };

  return (
    <>
      <Tooltip label="Undo" aria-label="Undo">
        <IconButton
          icon={<RiArrowGoBackFill />}
          aria-label="Undo"
          size={buttonSize}
          onClick={handleUndo}
        />
      </Tooltip>
      <Tooltip label="Redo" aria-label="Redo">
        <IconButton
          icon={<RiArrowGoForwardLine />}
          aria-label="Redo"
          size={buttonSize}
          onClick={handleRedo}
        />
      </Tooltip>
    </>
  );
}

UndoRedo.propTypes = {};

export default UndoRedo;
