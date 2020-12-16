import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-konva';
import useImage from 'use-image';

//const IMG_SCALE = 0.5;

function SourceImage({ imgUrl, stageSize }) {
  const [image] = useImage(imgUrl);
  //const imgWidth = stageSize.width * stageSize.scale.x * IMG_SCALE;

  return (
    <Image
      //x={(stageSize.width - imgWidth * IMG_SCALE) / 2}
      // y={100}
      //scale={{ x: IMG_SCALE, y: IMG_SCALE }}
      width={959}
      height={1024}
      image={image}
      stroke="red"
      strokeWidth={10}
      opacity={0.5}
    />
  );
}

SourceImage.propTypes = {
  imgUrl: PropTypes.string,
  stageSize: PropTypes.object,
};

export default SourceImage;
