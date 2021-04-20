import React from 'react';
import {
  Checkbox,
  Flex,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { BiOutline } from 'react-icons/bi';
import {
  useFabricOverlayDispatch,
  useFabricOverlayState,
} from 'context/fabric-overlay-context';
import { useParams } from 'react-router-dom';
import useIIIFManifests from 'hooks/use-iiif-manifests';
import useFabricHelpers from 'hooks/use-fabric-helpers';
import { fabric } from 'openseadragon-fabricjs-overlay';
import { isTablet } from 'react-device-detect';

const fontSize = ['xs', 'xs', 'xs', 'sm'];
const defaultState = {
  isCuratorVisible: false,
  isMyVisible: true,
};

export default function ShowHideAnnotations() {
  const { fabricOverlay } = useFabricOverlayState();
  const dispatch = useFabricOverlayDispatch();
  const params = useParams();
  const [state, setState] = React.useState(defaultState);
  const [curatorObjects, setCuratorObjects] = React.useState();
  const { findManifest, getCuratorAnnotation } = useIIIFManifests();
  const {
    deselectAll,
    getNonSelectableObjects,
    getUserObjects,
    makeObjectsInvisible,
    makeObjectsVisible,
    removeObjectsFromCanvas,
  } = useFabricHelpers();
  const bgColor = useColorModeValue('gray.200', 'gray.700');

  async function getManifestData() {
    if (!params.id || !fabricOverlay) return;

    const manifest = await findManifest(params.id);
    const curatorObj = await getCuratorAnnotation(manifest);

    if (!curatorObj) return;

    // Make curator annotation objects uneditable
    curatorObj.objects.forEach(obj => {
      obj.selectable = false;
    });

    setCuratorObjects(curatorObj.objects);
  }

  React.useEffect(() => {
    if (!fabricOverlay) return;
    getManifestData();
  }, [fabricOverlay]);

  // Handle a new or changed Work
  React.useEffect(() => {
    setState(defaultState);
    if (curatorObjects) {
      setCuratorObjects(null);
    }
    getManifestData();
  }, [params.id]);

  const handleUserCheckboxChange = () => {
    const userObjects = getUserObjects();

    // Enable My Annotations
    if (!state.isMyVisible) {
      makeObjectsVisible(userObjects);
      setState({ ...state, isMyVisible: true });
      dispatch({ type: 'toggleToolbarVisible', isVisible: true });
    }
    // Disable My Annotations
    else {
      makeObjectsInvisible(userObjects);
      deselectAll();
      setState({ ...state, isMyVisible: false });
      dispatch({ type: 'toggleToolbarVisible', isVisible: false });
    }
  };

  const handleCuratorCheckboxChange = () => {
    if (state.isCuratorVisible) {
      // Disable Curator
      const curatorObjects = getNonSelectableObjects();
      removeObjectsFromCanvas(curatorObjects);
      setState({ ...state, isCuratorVisible: false });
      dispatch({
        type: 'updateCuratorAnnotationVisible',
        isCuratorAnnotationVisible: false,
      });
    } else {
      // Enable Curator
      fabric.util.enlivenObjects(curatorObjects, objects => {
        fabricOverlay.fabricCanvas().add(...objects);
      });
      setState({ ...state, isCuratorVisible: true });
      dispatch({
        type: 'updateCuratorAnnotationVisible',
        isCuratorAnnotationVisible: true,
      });
    }
  };

  return (
    <Stack
      spacing={3}
      direction={isTablet ? 'column' : 'row'}
      ml={6}
      align={isTablet ? 'left' : 'center'}
      bgColor={bgColor}
      borderRadius="10px"
      px={4}
      py={3}
    >
      <Flex alignItems="center">
        <BiOutline />
        <Text ml={2} mb={0} fontFamily="ocrAStd" fontSize={fontSize}>
          Change Display:{' '}
        </Text>
      </Flex>

      <Checkbox
        isChecked={state.isMyVisible}
        onChange={handleUserCheckboxChange}
      >
        <Text fontSize={fontSize} mb={0}>
          My Annotation
        </Text>
      </Checkbox>
      {curatorObjects && (
        <Checkbox
          isChecked={state.isCuratorVisible}
          onChange={handleCuratorCheckboxChange}
        >
          <Text fontSize={fontSize} mb={0}>
            Librarian Annotation
          </Text>
        </Checkbox>
      )}
    </Stack>
  );
}
