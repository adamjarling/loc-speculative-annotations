import React from 'react';
import { IconButton, Tooltip } from '@chakra-ui/react';
import { RiArrowGoBackFill, RiArrowGoForwardLine } from 'react-icons/ri';
import useButtonSize from 'hooks/use-button-size';
import { useFabricOverlayState } from 'context/fabric-overlay-context';
import { useParams } from 'react-router-dom';
import 'fabric-history/src/index';
function UndoRedo() {
  const buttonSize = useButtonSize();
  const { fabricOverlay } = useFabricOverlayState();
  const [canvas, setCanvas] = React.useState();
  const params = useParams();

  React.useEffect(() => {
    if (!fabricOverlay) return;
    const canvasLocal = fabricOverlay.fabricCanvas();
    setCanvas(canvasLocal);
    canvasLocal.clearHistory();
  }, [fabricOverlay]);

  React.useEffect(() => {
    if (!params || !canvas) return;
    fabricOverlay.fabricCanvas().clearHistory();
    fabricOverlay.fabricCanvas().clear();
  }, [params.id]);

  const handleUndo = () => {
    fabricOverlay.fabricCanvas().undo();
  };

  const handleRedo = () => {
    fabricOverlay.fabricCanvas().redo();
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
