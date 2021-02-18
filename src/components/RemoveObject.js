import React from 'react';
import { Button } from '@chakra-ui/react';
import { useFabricOverlayState } from 'context/fabric-overlay-context';
import { DeleteIcon } from '@chakra-ui/icons';
import ToolbarButton from 'components/Toolbar/Button';

export default function RemoveObject() {
  const { fabricOverlay } = useFabricOverlayState();
  const [isActiveObject, setIsActiveObject] = React.useState();

  React.useEffect(() => {
    if (!fabricOverlay) return;

    function handleSelectionCleared(e) {
      setIsActiveObject(false);
    }
    function handleSelectionCreated(e) {
      setIsActiveObject(true);
    }

    const canvas = fabricOverlay.fabricCanvas();
    canvas.on('selection:created', handleSelectionCreated);
    canvas.on('selection:cleared', handleSelectionCleared);

    return () => {
      canvas.off('selection:created', handleSelectionCreated);
      canvas.off('selection:cleared', handleSelectionCleared);
    };
  }, [fabricOverlay]);

  const handleRemoveObject = () => {
    const canvas = fabricOverlay.fabricCanvas();
    const activeObject = canvas.getActiveObject();

    // Object has children (ie. arrow has children objects triangle and line)
    if (activeObject.getObjects) {
      let objs = activeObject.getObjects();
      for (let i in objs) {
        canvas.remove(objs[i]);
      }
    }
    canvas.remove(activeObject);
  };

  return (
    <ToolbarButton
      onClick={handleRemoveObject}
      icon={<DeleteIcon />}
      label="Remove item"
      disabled={!isActiveObject}
    />
  );
}
