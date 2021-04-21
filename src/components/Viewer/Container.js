import React from 'react';
import { Redirect, useLocation, useParams } from 'react-router-dom';
import Viewer from 'components/Viewer/Viewer';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  AspectRatio,
  Box,
  Flex,
} from '@chakra-ui/react';
import { locImages } from 'services/loc-images';
import { useFabricOverlayState } from 'context/fabric-overlay-context';
import ViewerControls from 'components/Viewer/Controls';
import { isBrowser } from 'react-device-detect';

export default function ViewerContainer() {
  const params = useParams();
  const location = useLocation();
  const { fabricOverlay, userCanvases } = useFabricOverlayState();

  const newCanvasTitle =
    location.state && location.state.canvasTitle
      ? location.state.canvasTitle
      : '';

  /**
   * Handle changes to selected LOC work.
   * User selected a Saved Annotation from their list, so update the Fabric canvas
   */
  React.useEffect(() => {
    if (!fabricOverlay || !location.state) return;
    fabricOverlay
      .fabricCanvas()
      .loadFromJSON(userCanvases[location.state.canvasTitle]['fabricCanvas']);
  }, [newCanvasTitle]);

  if (!params.id) {
    // If no id is referenced, default to the first LOC image
    const defaultId = locImages[0].id;
    return (
      <div>
        <Redirect to={`/${defaultId}`} />
      </div>
    );
  }

  const { id } = params;

  // Grab the LOC work from supplied id
  const targetImage = locImages.find(locImage => locImage.id === id);

  // Display error message for no match
  if (!targetImage) {
    return (
      <Box w="100%" p={8}>
        <Alert status="error">
          <AlertIcon />
          <AlertTitle mr={2}>Image loading error!</AlertTitle>
          <AlertDescription>No image with that id exists.</AlertDescription>
        </Alert>
      </Box>
    );
  }

  // Success
  return (
    <Flex
      flexGrow={1}
      justifyContent="center"
      alignItems="center"
      position="relative"
      pt="20px"
    >
      <ViewerControls />
      <Viewer tile={targetImage} />
    </Flex>
  );
}
