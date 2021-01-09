import React from 'react';
import { ViewerProvider } from 'use-open-seadragon';
import { FabricOverlayProvider } from 'context/fabric-overlay-context';

export default function OsdFabricWrapper({ children }) {
  return (
    <ViewerProvider>
      <FabricOverlayProvider>{children}</FabricOverlayProvider>
    </ViewerProvider>
  );
}
