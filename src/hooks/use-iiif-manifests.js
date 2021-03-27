import { loadManifest, parseManifest } from 'manifesto.js';

export default function useIIIFManifests() {
  /**
   * Find an individual Work manifest in the top level Collection manifest
   * @param {String} id
   * @returns {Object}
   */
  async function findManifest(id) {
    if (!id) return;

    try {
      const m = await loadManifest(
        'iiif/speculative-annotations-manifest.json'
      );
      const manifests = parseManifest(m).getManifests();

      // Find current work manifest
      const currentManifest = manifests.find(manifest => {
        const idSlug = manifest.id.split('/')[1];
        return idSlug === id;
      });

      return currentManifest;
    } catch (e) {
      console.error('Error finding Work manifest', e);
      return;
    }
  }

  /**
   * Find a Curator's annotation within a manifest
   * This annotation has the shape of a FabricJS object
   * @param {Object} manifest IIIF manifest
   * @returns {Object} Fabric JS object
   */
  async function getCuratorAnnotation(manifest) {
    if (!manifest) return;

    try {
      const annotations = manifest.getProperty('annotations');
      const annotationUrl = annotations[0].items[0].id;
      const response = await fetch(annotationUrl);
      const fabricData = await response.json();
      return fabricData;
    } catch (e) {
      return;
    }
  }

  return {
    findManifest,
    getCuratorAnnotation,
  };
}
