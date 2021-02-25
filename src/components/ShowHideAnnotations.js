import React from 'react';
import { Box, Checkbox, Flex, Icon, Stack, Text } from '@chakra-ui/react';
import { BiOutline } from 'react-icons/bi';
import {
  useFabricOverlayDispatch,
  useFabricOverlayState,
} from 'context/fabric-overlay-context';
import { useParams } from 'react-router-dom';
import useLocImages from 'hooks/use-loc-images';

const fontSize = 'sm';

export default function ShowHideAnnotations() {
  const { fabricOverlay, viewer } = useFabricOverlayState();
  const dispatch = useFabricOverlayDispatch();
  const params = useParams();
  const { findImage } = useLocImages();
  const [state, setState] = React.useState({
    isCuratorVisible: false,
    isMyVisible: true,
  });
  const [locImage, setLocImage] = React.useState({ url: '' });
  const [originalUrl, setOriginalUrl] = React.useState();

  React.useEffect(() => {
    if (params.id) {
      let image = findImage(params.id);
      setOriginalUrl(image.url);
      setLocImage(image);
    }
  }, [params.id]);

  React.useEffect(() => {
    if (!viewer || !locImage.url) return;
    viewer.open(locImage);
  }, [locImage.url]);

  const handleCheckboxChange = () => {
    const objects = fabricOverlay.fabricCanvas().getObjects();

    // Enable My Annotations
    if (!state.isMyVisible) {
      // Set opacity of all objects to 1 (make visible)
      for (let obj of objects) {
        obj.opacity = 1;
      }
      fabricOverlay.fabricCanvas().renderAll();
      setState({ ...state, isMyVisible: true });
      dispatch({ type: 'toggleToolbarVisible', isVisible: true });
    }
    // Disable My Annotations
    else {
      // Set opacity of all objects to 1 (make visible)
      for (let obj of objects) {
        obj.opacity = 0;
      }
      fabricOverlay.fabricCanvas().renderAll();
      setState({ ...state, isMyVisible: false });
      dispatch({ type: 'toggleToolbarVisible', isVisible: false });
    }
  };

  const handleCuratorCheckboxChange = () => {
    if (state.isCuratorVisible) {
      // Disable Curator
      setLocImage({
        ...locImage,
        url: originalUrl,
      });
      setState({ ...state, isCuratorVisible: false });
    } else {
      // Enable Curator
      setLocImage({
        ...locImage,
        url: locImage.curatorImage,
      });
      setState({ ...state, isCuratorVisible: true });
    }
  };

  return (
    <Stack spacing={5} direction="row" ml={6} align="center">
      <Flex alignItems="center">
        <BiOutline />
        <Text ml={2} fontFamily="ocrAStd">
          Change Display:{' '}
        </Text>
      </Flex>

      <Checkbox isChecked={state.isMyVisible} onChange={handleCheckboxChange}>
        <Text fontSize={fontSize}>Your Annotations</Text>
      </Checkbox>
      {locImage.curatorImage && (
        <Checkbox
          isChecked={state.isCuratorVisible}
          onChange={handleCuratorCheckboxChange}
        >
          <Text fontSize={fontSize}>Curators Annotations</Text>
        </Checkbox>
      )}
    </Stack>
  );
}
