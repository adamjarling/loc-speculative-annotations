import React from 'react';
import Layout from 'components/Layout';
import KonvaZoom from 'components/Konva/Zoom';
import KonvaScroll from 'components/Konva/Scroll';

const iiifImageParams = '/full/pct:100/0/default.jpg';

export default function KonvaWrapper() {
  const [locImage, setLocImage] = React.useState();

  async function getIIIFImage() {
    //TODO: handle errors here
    const response = await fetch('loc-images/loc-iiif-image.json');
    const data = await response.json();
    setLocImage({
      src: `${data['@id']}${iiifImageParams}`,
      height: data.height,
      width: data.width,
    });
  }

  React.useEffect(() => {
    getIIIFImage();
  }, []);

  return (
    <Layout>
      <KonvaScroll locImage={locImage} />

      {/* <KonvaZoom /> */}
    </Layout>
  );
}
