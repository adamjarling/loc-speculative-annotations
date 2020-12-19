import React from 'react';
import { useOpenSeadragon } from 'use-open-seadragon';
import { initOverlay } from 'openseadragon-fabricjs-overlay';
import { Box } from '@chakra-ui/react';

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
  const [ref, { viewer }] = useOpenSeadragon(tile, { ...osdOptions });

  console.log('viewer', viewer);

  // React.useEffect(() => {
  //   if (!viewer) return;
  //   fabricjsOverlay();
  //   viewer.fabricOverlay();
  // }, [viewer]);

  return <Box ref={ref} w="100%" h="600px" bgColor="antiquewhite" />;

  //return <Box id="osd" w="100%" h="800px" />;
}
