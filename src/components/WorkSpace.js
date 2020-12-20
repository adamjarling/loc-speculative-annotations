import React from 'react';
import PropTypes from 'prop-types';
import Toolbar from './Toolbar';
import OpenSeadragonViewer from './OpenSeadragonViewer';
import {
  useFabricOverlayDispatch,
  useFabricOverlayState,
} from '../context/fabric-overlay-context';
import { fabric } from 'openseadragon-fabricjs-overlay';

function WorkSpace(props) {
  const [activeTool, setActiveTool] = React.useState();
  const { fabricOverlay } = useFabricOverlayState();
  const dispatch = useFabricOverlayDispatch();

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

  return (
    <React.Fragment>
      <Toolbar handleRedBoxClick={handleRedBoxClick} />
      <OpenSeadragonViewer />
    </React.Fragment>
  );
}

WorkSpace.propTypes = {};

export default WorkSpace;
