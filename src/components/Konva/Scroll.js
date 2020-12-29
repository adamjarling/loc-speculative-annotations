import React from 'react';
import PropTypes from 'prop-types';
import { Image, Stage, Layer, Rect, Circle } from 'react-konva';
import { Box } from '@chakra-ui/react';
import useImage from 'use-image';

export default function KonvaScroll({ locImage }) {
  const [dimensions, setDimensions] = React.useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });
  const [scale, setScale] = React.useState(1);

  const locImageRef = React.useRef();
  const stageRef = React.useRef();
  const [image] = useImage(locImage.src);

  function centreRectShape(shape) {
    if (!shape) return;
    const stage = stageRef.current;
    console.log('stage.getWidth()', stage.getWidth());
    console.log('shape.getWidth()', shape.getWidth());
    shape.x((stage.getWidth() - shape.getWidth()) / 2);
    shape.y((stage.getHeight() - shape.getHeight()) / 2);
  }

  React.useEffect(() => {
    function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  React.useEffect(() => {
    if (!image) return;
    centreRectShape(locImageRef.current);
  }, [image]);

  return (
    <Box
      w={dimensions.width}
      h="700px"
      overflow="scroll"
      mb={12}
      bgColor="antiquewhite"
    >
      <p>
        height: {dimensions.height} width: {dimensions.width}
      </p>
      <Stage
        width={locImage ? locImage.width + 400 : dimensions.width + 400}
        height={locImage ? locImage.height + 200 : 900}
        ref={stageRef}
        scaleX={1}
        scaleY={1}
      >
        <Layer>
          {image && <Image image={image} draggable ref={locImageRef} />}
          <Rect width={100} height={100} fill="red" shadowBlur={10} draggable />
          <Circle radius={50} fill="green" draggable />
        </Layer>
      </Stage>
    </Box>
  );
}

KonvaScroll.defaultProps = {
  locImage: { src: '', height: '', width: '' },
};

KonvaScroll.propTypes = {
  locImage: PropTypes.object,
};
