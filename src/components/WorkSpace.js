import React from 'react';
import Toolbar from 'components/Toolbar';
import Viewer from 'components/Viewer/Viewer';
import { useFabricOverlayState } from 'context/fabric-overlay-context';
import { fabric } from 'openseadragon-fabricjs-overlay';
import SaveCanvasList from 'components/Save/CanvasList';
import StampWrapper from 'components/Stamp/Wrapper';

function WorkSpace() {
  const [activeTool, setActiveTool] = React.useState();
  const { fabricOverlay, viewer } = useFabricOverlayState();

  const handleClearCanvas = () => {
    fabricOverlay.fabricCanvas().clear();
  };

  const handleNewBoxClick = () => {
    const fabCanvas = fabricOverlay.fabricCanvas();
    const rect = new fabric.Rect();
    rect.set({ width: 100, height: 100, fill: 'blue' });
    fabCanvas.add(rect);
    rect.set({ angle: 45 });
  };

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

  const onOsdClick = obj => console.log('OSD canvas-click', obj);

  return (
    <React.Fragment>
      <SaveCanvasList />
      {/* <StampWrapper /> */}
      <Toolbar
        activeTool={activeTool}
        handleClearCanvas={handleClearCanvas}
        handleNewBoxClick={handleNewBoxClick}
        handleRedBoxClick={handleRedBoxClick}
        handleToolSelect={handleToolSelect}
      />
      <Viewer />
    </React.Fragment>
  );
}

export default WorkSpace;
