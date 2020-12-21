import React from 'react';
import Toolbar from 'components/Toolbar';
import Viewer from 'components/Viewer/Viewer';
import {
  useFabricOverlayDispatch,
  useFabricOverlayState,
} from 'context/fabric-overlay-context';
import { fabric } from 'openseadragon-fabricjs-overlay';
import useSavedCanvases from 'hooks/use-saved-canvases';
import SaveCanvasList from 'components/Save/CanvasList';

const savedCanvas =
  '{"version":"4.0.0-rc.1","objects":[{"type":"rect","version":"4.0.0-rc.1","originX":"left","originY":"top","left":87.35,"top":180.63,"width":200,"height":200,"fill":"red","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeMiterLimit":4,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","skewX":0,"skewY":0,"rx":0,"ry":0},{"type":"rect","version":"4.0.0-rc.1","originX":"left","originY":"top","left":869.51,"top":426.52,"width":200,"height":200,"fill":"red","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeMiterLimit":4,"scaleX":0.85,"scaleY":0.85,"angle":280.15,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","skewX":0,"skewY":0,"rx":0,"ry":0}]}';

function WorkSpace(props) {
  const [activeTool, setActiveTool] = React.useState();
  const { fabricOverlay } = useFabricOverlayState();
  const dispatch = useFabricOverlayDispatch();
  const { canvases, updateCanvas } = useSavedCanvases();
  console.log('canvases', canvases);

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

  const handleSaveCanvas = userCanvasName => {
    console.log('userCanvasName', userCanvasName);
    console.log(
      'JSON.stringify(fabricOverlay._fabricCanvas)',
      JSON.stringify(fabricOverlay._fabricCanvas)
    );
    updateCanvas({
      key: userCanvasName,
      fabricCanvas: fabricOverlay._fabricCanvas.toObject(),
    });

    //fabricOverlay._fabricCanvas.loadFromJSON(savedCanvas);
  };

  const handleSelectSavedCanvas = canvasName => {
    console.log('canvasName', canvasName);
    fabricOverlay._fabricCanvas.loadFromJSON(canvases[canvasName]);
  };

  return (
    <React.Fragment>
      <SaveCanvasList
        canvasNames={Object.keys(canvases)}
        handleSelectSavedCanvas={handleSelectSavedCanvas}
      />
      <Toolbar
        handleRedBoxClick={handleRedBoxClick}
        handleSaveCanvas={handleSaveCanvas}
      />
      <Viewer />
    </React.Fragment>
  );
}

export default WorkSpace;
