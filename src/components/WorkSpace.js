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

  React.useEffect(() => {
    if (!viewer || !fabricOverlay) return;
    const canvas = fabricOverlay.fabricCanvas();

    // // MOUSE DOWN
    // canvas.on('mouse:down', evt => {
    //   console.log('MOUSE DOWN');
    //   viewer.setMouseNavEnabled(false);
    //   viewer.outerTracker.setTracking(false);
    // });

    // // MOUSE UP
    // canvas.on('mouse:up', evt => {
    //   console.log('MOUSE UP');
    //   viewer.setMouseNavEnabled(true);
    //   viewer.outerTracker.setTracking(true);
    // });

    // viewer.addHandler('canvas-click', onOsdClick);

    // return () => {
    //   console.log('WorkSpace removing event handlers');
    //   // Remove event handlers
    //   canvas.off('mouse:down');
    //   canvas.off('mouse:up');
    //   viewer.removeHandler('canvas-click', onOsdClick);
    // };
  }, [fabricOverlay, viewer]);

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
