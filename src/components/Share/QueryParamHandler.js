import React from 'react';
import { useLocation } from 'react-router-dom';
import { useFabricOverlayState } from 'context/fabric-overlay-context';
import { useToast } from '@chakra-ui/react';
var codec = require('json-url')('lzma');

function ShareQueryParamHandler() {
  const { fabricOverlay } = useFabricOverlayState();
  const toast = useToast();
  const location = useLocation();
  const sharedCanvasParam = location.search.split('sharedCanvas=')[1];

  React.useEffect(() => {
    if (!fabricOverlay) {
      return;
    }
    if (sharedCanvasParam) {
      // A Fabric JS canvas object query param is passed to the url
      // Decode the value and add objects to the Fabric canvas
      codec
        .decompress(sharedCanvasParam)
        .then(json => {
          fabricOverlay.fabricCanvas().loadFromJSON(json);
        })
        .catch(error => {
          console.error('error', error);
          toast({
            title: 'Error displaying annotations',
            description:
              'There was an error decoding the shared annotations query param value',
            status: 'error',
            duration: 9000,
            isClosable: true,
          });
        });
    }
  }, [fabricOverlay]);
  return <div></div>;
}

export default ShareQueryParamHandler;
