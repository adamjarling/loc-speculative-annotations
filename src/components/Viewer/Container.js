import React from 'react';
import { Redirect, useParams } from 'react-router-dom';
import Viewer from 'components/Viewer/Viewer';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box,
} from '@chakra-ui/react';
import { locImages } from 'services/loc-images';

export default function ViewerContainer() {
  const params = useParams();

  if (!params.id) {
    return (
      <div>
        <Redirect to={`/${locImages[0].id}`} />
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
