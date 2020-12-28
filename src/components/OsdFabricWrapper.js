import React from 'react';
import { ViewerProvider } from 'use-open-seadragon';
import { FabricOverlayProvider } from 'context/fabric-overlay-context';
import Layout from 'components/Layout';
import WorkSpace from 'components/WorkSpace';

export default function OsdFabricWrapper() {
  return (
    <ViewerProvider>
      <FabricOverlayProvider>
        <Layout>
          <WorkSpace />
        </Layout>
      </FabricOverlayProvider>
    </ViewerProvider>
  );
}
