import React from 'react';
import { Redirect, useLocation, useParams } from 'react-router-dom';
import Viewer from 'components/Viewer/Viewer';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box,
} from '@chakra-ui/react';
import { locImages } from 'services/loc-images';
import { useFabricOverlayState } from 'context/fabric-overlay-context';

export default function ViewerContainer() {
  const params = useParams();
  const location = useLocation();
  const { fabricOverlay, userCanvases } = useFabricOverlayState();

  const newCanvasTitle =
    location.state && location.state.canvasTitle
      ? location.state.canvasTitle
      : '';

  React.useEffect(() => {
    if (!fabricOverlay) return;

    // User selected a Saved Annotation from their list
    // Update the Fabric canvas
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

  // Handle no match
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
  return <Viewer tile={targetImage} />;
}
