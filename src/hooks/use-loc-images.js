import { locImages } from 'services/loc-images';

export default function useLocImages() {
  function findImage(id) {
    return locImages.find(locImage => locImage.id === id);
  }

  return {
    locImages,
    findImage,
  };
}
