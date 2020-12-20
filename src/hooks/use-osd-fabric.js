import { fabric, initFabricJSOverlay } from 'openseadragon-fabricjs-overlay';
import OpenSeadragon from 'openseadragon';
import { useCallback, useContext, useRef } from 'react';

const tile = {
  type: 'image',
  url:
    'https://tile.loc.gov/image-services/iiif/service:pnp:fsa:8c34000:8c34000:8c34058v/full/pct:100/0/default.jpg',
};

let openSeadragon = null;
let overlay = null;

export default function useOpenSeadragon() {
  const init = useCallback(() => {
    if (openSeadragon) return;
    initFabricJSOverlay(OpenSeadragon, fabric);
    openSeadragon = OpenSeadragon({
      id: 'openseadragon-viewer',
      tileSources: [tile],
    });
    overlay = openSeadragon.fabricjsOverlay({ scale: 1 });
    overlay.fabricCanvas().freeDrawingBrush.color = 'black';
    overlay.fabricCanvas().freeDrawingBrush.width = 2;
  }, []);

  return {
    init,
  };
}
