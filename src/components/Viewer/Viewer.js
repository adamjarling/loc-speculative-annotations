import React from 'react';
import PropTypes from 'prop-types';
import { useOpenSeadragon, OpenSeadragon } from 'use-open-seadragon';
import { Box } from '@chakra-ui/react';
import { fabric, initFabricJSOverlay } from 'openseadragon-fabricjs-overlay';
import { useFabricOverlayDispatch } from 'context/fabric-overlay-context';
import ViewerZoomBar from 'components/Viewer/ZoomBar';
import { isBrowser } from 'react-device-detect';

const minZoomLevel = isBrowser ? 0.4 : 0.8;

const osdOptions = {
  constrainDuringPan: isBrowser ? true : false,
  debugMode: false,
  //defaultZoomLevel: minZoomLevel,
  gestureSettingsMouse: {
    clickToZoom: false,
    flickEnabled: true,
    pinchToZoom: true,
    scrollToZoom: false,
  },
  gestureSettingsTouch: {
    clickToZoom: true,
    flickEnabled: true,
    pinchToZoom: true,
    scrollToZoom: true,
  },
  // minZoomLevel: minZoomLevel,
  // maxZoomLevel: 2,
  showNavigationControl: true,
  springStiffness: isBrowser ? 20 : 10,
  viewportMargin: {
    left: 100,
    top: 100,
    right: 100,
    bottom: 100,
  },
  visibilityRatio: isBrowser ? 1 : 0.5,
  zoomPerClick: 1.0,
};

export default function Viewer({ tile }) {
  const dispatch = useFabricOverlayDispatch();

  // Customize Fabric selection handles
  fabric.Object.prototype.set({
    borderColor: '#22a2f8',
    borderScaleFactor: 2, // selection stroke width
    cornerColor: 'white',
    cornerSize: 10,
    transparentCorners: false,
  });

  // Add Fabric support to OSD via the plugin "OpenseadragonFabricjsOverlay"
  initFabricJSOverlay(OpenSeadragon, fabric);

  // Initialize our OpenSeadragon instance
  const [ref, { viewer }] = useOpenSeadragon(tile, osdOptions);

  React.useEffect(() => {
    if (!viewer) return;

    // Create the fabric.js overlay, and set it on a sharable context
    dispatch({
      type: 'updateOverlay',
      fabricOverlay: viewer.fabricjsOverlay({ scale: 1 }),
      viewer: viewer,
    });
  }, [dispatch, viewer]);

  return (
    <Box ref={ref} w="100%">
      {isBrowser && <ViewerZoomBar />}
    </Box>
  );
}

Viewer.propTypes = {
  tile: PropTypes.object,
};
