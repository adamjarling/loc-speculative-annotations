import React from 'react';
import PropTypes from 'prop-types';
import { Image, Stage, Layer, Rect, Circle } from 'react-konva';
import { Box, Button, Center } from '@chakra-ui/react';
import useImage from 'use-image';

const STAGE_WIDTH = 900;
const STAGE_HEIGHT = 900;

export default function KonvaScrollCenteredFixedImage({ locImage }) {
  const [dimensions, setDimensions] = React.useState({
    height: STAGE_HEIGHT,
    width: STAGE_WIDTH,
  });
  const [scale, setScale] = React.useState(1);

  const locImageRef = React.useRef();
  const stageRef = React.useRef();
  const stageParentRef = React.useRef();
  const [image] = useImage(locImage.src);

  function centreRectShape(shape) {
    if (!shape) return;

    const shapeWidth = shape.getWidth();
    const shapeAdjustedWidth = shapeWidth * scale;

    console.log('dimensions', dimensions);
    console.log('shapeWidth', shapeWidth);
    console.log('shapeAdjustedWidth', shapeAdjustedWidth);

    shape.x((dimensions.width - shapeAdjustedWidth) / 2);
    shape.y((dimensions.height - shape.getHeight() * scale) / 2);
  }

  React.useEffect(() => {
    function handleResize() {
      const newScale = window.innerWidth / STAGE_WIDTH;
      console.log('newScale', newScale);
      setDimensions({
        height: STAGE_HEIGHT * newScale + 300,
        width: STAGE_WIDTH * newScale + 300,
      });
      setScale(newScale);
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  React.useEffect(() => {
    centreRectShape(locImageRef.current);
  }, [scale]);

  React.useEffect(() => {
    if (!image) return;
    centreRectShape(locImageRef.current);
  }, [image]);

  return (
    <React.Fragment>
      <Center>
        <Button onClick={() => setScale(scale + 0.15)}>Zoom In</Button>
        <Button onClick={() => setScale(scale - 0.15)}>Zoom Out</Button>
      </Center>
      <Box
        w={window.innerWidth}
        h="700px"
        overflow="scroll"
        mb={12}
        bgColor="antiquewhite"
        ref={stageParentRef}
      >
        <p>
          height: {dimensions.height} width: {dimensions.width}
        </p>
        <Stage
          width={dimensions.width}
          height={dimensions.height}
          ref={stageRef}
          scale={{ x: scale, y: scale }}
        >
          <Layer>
            {image && (
              <Image
                image={image}
                ref={locImageRef}
                listening={false}
                key={scale}
              />
            )}
            <Rect
              width={100}
              height={100}
              fill="red"
              shadowBlur={10}
              draggable
            />
            <Circle x={200} y={200} radius={50} fill="green" draggable />
          </Layer>
        </Stage>
      </Box>
    </React.Fragment>
  );
}

KonvaScrollCenteredFixedImage.defaultProps = {
  locImage: { src: '', height: '', width: '' },
};

KonvaScrollCenteredFixedImage.propTypes = {
  locImage: PropTypes.object,
};
