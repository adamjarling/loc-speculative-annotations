import React from 'react';
import Toolbar from 'components/Toolbar';
import Viewer from 'components/Viewer/Viewer';
import { useFabricOverlayState } from 'context/fabric-overlay-context';
import { fabric } from 'openseadragon-fabricjs-overlay';
import SaveCanvasList from 'components/Save/CanvasList';

function WorkSpace(props) {
  const [activeTool, setActiveTool] = React.useState();
  const { fabricOverlay } = useFabricOverlayState();

  const handleRedBoxClick = () => {
    // Add fabric rectangle
    var rect = new fabric.Rect({
      left: 0,
      top: 0,
      fill: 'red',
      width: 200,
      height: 200,
    });
    fabricOverlay.fabricCanvas().add(rect);
  };

  const handleToolSelect = tool => {
    console.log('tool', tool);
    setActiveTool(tool);
  };

  return (
    <React.Fragment>
      <SaveCanvasList />
      <Toolbar
        activeTool={activeTool}
        handleRedBoxClick={handleRedBoxClick}
        handleToolSelect={handleToolSelect}
      />
      <Viewer />
    </React.Fragment>
  );
}

export default WorkSpace;
