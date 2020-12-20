import React from 'react';
//import { useOpenSeadragon } from 'use-open-seadragon';
import { Box } from '@chakra-ui/react';
import useOpenSeadragon from '../hooks/use-osd-fabric';

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
  const { init } = useOpenSeadragon();

  React.useEffect(() => {
    init();
  }, []);

  return (
    <Box id="openseadragon-viewer" w="100%" h="600px" bgColor="antiquewhite" />
  );

  //return <Box id="osd" w="100%" h="800px" />;
}
