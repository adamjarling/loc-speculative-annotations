import React from 'react';
import PropTypes from 'prop-types';
import { useOpenSeadragon, OpenSeadragon } from 'use-open-seadragon';
import { Box, useColorModeValue } from '@chakra-ui/react';
import {
  fabric,
  initFabricJSOverlay,
} from '@adamjarling/openseadragon-fabricjs-overlay';
import { useFabricOverlayDispatch } from 'context/fabric-overlay-context';
import { isBrowser } from 'react-device-detect';
import ViewerWatermarkLogo from 'components/Viewer/WatermarkLogo';
import ViewerDisclaimer from 'components/Viewer/Disclaimer';

/* These options have been re-configured a few times.  Leaving previous settings
commented out for future reference, if need be */
const minZoomLevel = isBrowser ? 0.5 : 0.8;
const osdOptions = {
  //constrainDuringPan: isBrowser ? true : false,
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
  //minZoomLevel: minZoomLevel,
  maxZoomLevel: 4,
  //preserveImageSizeOnResize: true,
  springStiffness: isBrowser ? 20 : 10,
  // viewportMargin: {
  //   left: 100,
  //   top: 100,
  //   right: 100,
  //   bottom: 100,
  // },
  //visibilityRatio: isBrowser ? 1 : 0.5,
  visibilityRatio: 0.5,
  zoomPerClick: 1.0,
};

export default function Viewer({ tile }) {
  const dispatch = useFabricOverlayDispatch();
  const colorMode = useColorModeValue('light', 'dark');
  const bgColor = useColorModeValue('gray.200', 'gray.800');

  // Customize Fabric selection handles
  fabric.Object.prototype.set({
    borderColor: '#22a2f8',
    borderScaleFactor: 2, // selection stroke width
    cornerColor: 'white',
    cornerStrokeColor: colorMode === 'dark' ? 'white' : '#22a2f8',
    cornerSize: 10,
    transparentCorners: false,
  });

  fabric.Canvas.prototype.set({
    // When true, hover activated only on actual shape, not bounding box
    perPixelTargetFind: true,
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
    <Box ref={ref} flexGrow="1" bgColor={bgColor} id="download-wrapper">
      <ViewerWatermarkLogo />
      <ViewerDisclaimer />
    </Box>
  );
}

Viewer.propTypes = {
  tile: PropTypes.object,
};
