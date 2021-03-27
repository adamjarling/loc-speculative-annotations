import React from 'react';
import { Checkbox, Flex, Stack, Text } from '@chakra-ui/react';
import { BiOutline } from 'react-icons/bi';
import {
  useFabricOverlayDispatch,
  useFabricOverlayState,
} from 'context/fabric-overlay-context';
import { useParams } from 'react-router-dom';
import useIIIFManifests from 'hooks/use-iiif-manifests';
import useFabricHelpers from 'hooks/use-fabric-helpers';

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
  const [curatorKlassObjects, setCuratorKlassObjects] = React.useState();
  const { findManifest, getCuratorAnnotation } = useIIIFManifests();
  const {
    deselectAll,
    getUserObjects,
    makeObjectsInvisible,
    makeObjectsVisible,
  } = useFabricHelpers();

  async function getManifestData() {
    if (!params.id || !fabricOverlay) return;

    const manifest = await findManifest(params.id);
    const curatorObj = await getCuratorAnnotation(manifest);

    if (!curatorObj) return;

    // Make curator annotation objects uneditable
    curatorObj.objects.forEach(obj => {
      obj.selectable = false;
      obj.opacity = 0;
    });

    // Load invisible curator annotion onto screen
    fabricOverlay.fabricCanvas().loadFromJSON(curatorObj);

    // Save curator klass objects so we can easily reference them to show/hide
    setCuratorKlassObjects(fabricOverlay.fabricCanvas().getObjects());
  }

  React.useEffect(() => {
    if (!fabricOverlay) return;
    getManifestData();
  }, [fabricOverlay]);

  // Handle a new or changed Work
  React.useEffect(() => {
    setState(defaultState);
    if (curatorKlassObjects) {
      setCuratorKlassObjects(null);
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
      makeObjectsInvisible(curatorKlassObjects);
      setState({ ...state, isCuratorVisible: false });
    } else {
      // Enable Curator
      makeObjectsVisible(curatorKlassObjects);
      setState({ ...state, isCuratorVisible: true });
    }
  };

  return (
    <Stack spacing={3} direction="row" ml={6} align="center">
      <Flex alignItems="center">
        <BiOutline />
        <Text ml={2} fontFamily="ocrAStd" fontSize={fontSize}>
          Change Display:{' '}
        </Text>
      </Flex>

      <Checkbox
        isChecked={state.isMyVisible}
        onChange={handleUserCheckboxChange}
      >
        <Text fontSize={fontSize}>Your Annotations</Text>
      </Checkbox>
      {curatorKlassObjects && (
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
