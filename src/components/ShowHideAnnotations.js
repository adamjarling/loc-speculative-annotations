import React from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Switch,
  useBreakpointValue,
} from '@chakra-ui/react';
import {
  useFabricOverlayDispatch,
  useFabricOverlayState,
} from 'context/fabric-overlay-context';
import { useParams } from 'react-router-dom';
import useIIIFManifests from 'hooks/use-iiif-manifests';
import useFabricHelpers from 'hooks/use-fabric-helpers';
import useIsColorPickerVisible from 'hooks/use-is-color-picker-visible';

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
    getUserObjects,
    makeObjectsInvisible,
    makeObjectsVisible,
  } = useFabricHelpers();
  const isColorPickerVisible = useIsColorPickerVisible();
  const isMobile = useBreakpointValue({ base: true, sm: false });

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

  // TODO: If we're not saving Curator annotations in Work's IIIF manifest,
  // then remove the code supporting that method of displaying Curator annotations.
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

  return (
    <Box pr="12px">
      <FormControl display="flex" alignItems="center">
        {(isMobile || !isColorPickerVisible) && (
          <FormLabel
            htmlFor="email-alerts"
            mb="0"
            fontFamily="ocr-a-std"
            fontSize="sm"
          >
            Hide Annotations
          </FormLabel>
        )}

        <Switch
          id="hide-annotations"
          colorScheme="brand.pink"
          isChecked={!state.isMyVisible}
          onChange={handleUserCheckboxChange}
        />
      </FormControl>
    </Box>
  );
}
