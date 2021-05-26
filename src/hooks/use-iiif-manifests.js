import { loadManifest, parseManifest } from 'manifesto.js';

export default function useIIIFManifests() {
  /**
   * Filter Library of Congress manifest metadata for what we're displaying in the
   * information sidebar
   * @param {Object} metadata
   * @returns {Object}
   */
  function filterMetadata(metadata) {
    const displayMetadata = [
      'contributors',
      'created published',
      'original format',
      'subjects',
    ];
    const filtered = metadata.filter(m => {
      return displayMetadata.indexOf(m.getLabel().toLowerCase()) > -1;
    });
    return filtered;
  }

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
        const locId = manifest.id
          .slice(manifest.id.indexOf('item/'))
          .split('/')[1];
        return locId === id;
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
      const curatorAnnotationPage = annotations.find(a =>
        a.id.includes('/curator')
      );
      const annotationUrl = curatorAnnotationPage.items[0].id;
      const response = await fetch(annotationUrl);
      const fabricData = await response.json();
      return fabricData;
    } catch (e) {
      return;
    }
  }

  /**
   * Get annotation questions
   * @param {Object} manifest
   * @returns {Array}
   */
  function getQuestions(manifest) {
    try {
      const annotations = manifest.getProperty('annotations');
      const page = annotations.find(a => a.id.includes('/questions'));
      return page?.items.map(item => item.body.value);
    } catch (e) {
      console.error('Error parsing Questions metadata', e);
      return;
    }
  }

  /**
   * Get annotation research metadata items
   * @param {Object} manifest
   * @returns {Array}
   */
  function getResearch(manifest) {
    try {
      const annotations = manifest.getProperty('annotations');
      const page = annotations.find(a => a.id.includes('/research'));
      return page?.items.map(item => item.body.value);
    } catch (e) {
      console.error('Error parsing Research metadata', e);
      return;
    }
  }

  return {
    filterMetadata,
    findManifest,
    getCuratorAnnotation,
    getQuestions,
    getResearch,
  };
}
