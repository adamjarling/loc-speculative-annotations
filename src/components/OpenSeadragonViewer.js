import React from 'react';
import { useOpenSeadragon, OpenSeadragon, Overlay } from 'use-open-seadragon';
import { Box } from '@chakra-ui/react';
import { fabric, initFabricJSOverlay } from 'openseadragon-fabricjs-overlay';

const tile = {
  type: 'image',
  url:
    'https://tile.loc.gov/image-services/iiif/service:pnp:fsa:8c34000:8c34000:8c34058v/full/pct:100/0/default.jpg',
};

const osdOptions = {
  debugMode: true,
  showNavigationControl: true,
};

export default function OpenSeadragonViewer() {
  // Add Fabric support to OSD via the plugin "OpenseadragonFabricjsOverlay"
  initFabricJSOverlay(OpenSeadragon, fabric);

  // Initialize our OpenSeadragon instance
  const [ref, { viewer }] = useOpenSeadragon(tile, osdOptions);

  React.useEffect(() => {
    if (!viewer) return;

    // Create the fabric.js overlay
    const overlay = viewer.fabricjsOverlay({ scale: 1 });

    // Add fabric rectangle
    var rect = new fabric.Rect({
      left: 0,
      top: 0,
      fill: 'red',
      width: 200,
      height: 200,
    });
    overlay.fabricCanvas().add(rect);
  }, [viewer]);

  return (
    <Box ref={ref} w="100%" h="600px" bgColor="antiquewhite">
      <Overlay x={0.5} y={0.5}>
        <div style={{ background: '#fff' }}>
          <p>
            I'm a Overlay component where React components can live on the
            canvas
          </p>
        </div>
      </Overlay>
      <Overlay x={0.2} y={0.8}>
        <div style={{ background: '#fff' }}>
          <p>I'm another overlay</p>
        </div>
      </Overlay>
    </Box>
  );
}
