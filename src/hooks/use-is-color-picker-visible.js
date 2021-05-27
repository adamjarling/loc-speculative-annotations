import { useFabricOverlayState } from 'context/fabric-overlay-context';

export default function useIsColorPickerVisible() {
  const { activeTool } = useFabricOverlayState();
  const isColorVisible = Boolean(
    activeTool && ['POINTER', 'STAMP_QUESTION'].indexOf(activeTool) === -1
  );
  return isColorVisible;
}
