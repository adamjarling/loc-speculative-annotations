import React from 'react';
import PropTypes from 'prop-types';
import { IconButton, Tooltip } from '@chakra-ui/react';
import { RiArrowGoBackFill, RiArrowGoForwardLine } from 'react-icons/ri';
import useButtonSize from 'hooks/use-button-size';
import { useFabricOverlayState } from 'context/fabric-overlay-context';
import { useParams } from 'react-router-dom';

function UndoRedoCustom(props) {
  const buttonSize = useButtonSize();
  const { fabricOverlay } = useFabricOverlayState();
  const params = useParams();

  const [myState, _setMyState] = React.useState({
    redos: [],
    undos: [],
  });
  const myStateRef = React.useRef(myState);
  const setMyState = data => {
    myStateRef.current = data;
    _setMyState(data);
  };

  function saveState(state) {
    console.log(`myState`, myState);
    console.log(`myStateRef.current`, myStateRef.current);
    setMyState({
      ...myStateRef.current,
      undos: [...myStateRef.current.undos, state],
    });
    //setUndos([...undos, state]);
  }

  function handleRedoClick() {}

  function handleUndoClick() {
    const c = myStateRef.current;
    console.log(`c`, c);
    const undoState = c.undos.pop();
    console.log(`undoState`, undoState);
    fabricOverlay.fabricCanvas().loadFromJSON(undoState);
    fabricOverlay.fabricCanvas().renderAll();

    setMyState({
      ...c,
      undos: c.undos.slice(0, 1),
      redos: [...c.redos, undoState],
    });
  }

  React.useEffect(() => {
    if (!fabricOverlay) return;
    const canvas = fabricOverlay.fabricCanvas();
    //setCanvas(canvas);
    saveState(JSON.stringify(canvas));

    //fabricOverlay.fabricCanvas().clearHistory();

    function handleObjectAdded(o) {
      console.log(`added`, o);
      saveState(JSON.stringify(fabricOverlay.fabricCanvas()));
    }

    function handleObjectModified(o) {
      console.log(`modified`, o);
      saveState(JSON.stringify(fabricOverlay.fabricCanvas()));
    }

    function handleObjectRemoved(o) {
      console.log(`removed`, o);
      saveState(JSON.stringify(fabricOverlay.fabricCanvas()));
    }

    // Add click handlers
    canvas.on('object:added', handleObjectAdded);
    canvas.on('object:modified', handleObjectModified);
    canvas.on('object:removed', handleObjectRemoved);

    // Remove handler
    return function clearFabricEventHandlers() {
      canvas.off('object:added', handleObjectAdded);
      canvas.off('object:modified', handleObjectModified);
      canvas.off('object:removed', handleObjectRemoved);
    };
  }, [fabricOverlay]);

  React.useEffect(() => {
    if (!params || !fabricOverlay) return;
    console.log(`clearHistory`);
    //canvas.clearHistory();
  }, [params.id]);

  return (
    <>
      <Tooltip label="Undo" aria-label="Undo">
        <IconButton
          icon={<RiArrowGoBackFill />}
          aria-label="Undo"
          size={buttonSize}
          onClick={handleUndoClick}
        />
      </Tooltip>
      <Tooltip label="Redo" aria-label="Redo">
        <IconButton
          icon={<RiArrowGoForwardLine />}
          aria-label="Redo"
          size={buttonSize}
          onClick={handleRedoClick}
        />
      </Tooltip>
    </>
  );
}

UndoRedoCustom.propTypes = {};

export default UndoRedoCustom;
