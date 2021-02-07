import React from 'react';
import PropTypes from 'prop-types';
import { useOpenSeadragon, OpenSeadragon } from 'use-open-seadragon';
import { Box } from '@chakra-ui/react';
import { fabric, initFabricJSOverlay } from 'openseadragon-fabricjs-overlay';
import { useFabricOverlayDispatch } from 'context/fabric-overlay-context';
import ViewerZoomBar from 'components/Viewer/ZoomBar';
import { isBrowser } from 'react-device-detect';

const osdOptions = {
  constrainDuringPan: true,
  debugMode: false,
  gestureSettingsMouse: {
    clickToZoom: false,
    flickEnabled: true,
    pinchToZoom: true,
    scrollToZoom: false,
  },
  gestureSettingsTouch: {
    clickToZoom: false,
    flickEnabled: true,
    pinchToZoom: true,
    scrollToZoom: true,
  },
  // minZoomLevel: 1,
  // maxZoomLevel: 3,
  showNavigationControl: true,
  springStiffness: 20,
  zoomPerClick: 1.0,
};

export default function Viewer({ tile }) {
  const dispatch = useFabricOverlayDispatch();

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
