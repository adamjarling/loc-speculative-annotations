import React from 'react';
import PropTypes from 'prop-types';
import { Image, Stage, Layer, Rect, Circle } from 'react-konva';
import { Box, Button, Center } from '@chakra-ui/react';
import useImage from 'use-image';
import Konva from 'konva';

export default function KonvaZoomScroll({ locImage }) {
  Konva.hitOnDragEnabled = true;
  const [dimensions, setDimensions] = React.useState({
    height: window.innerHeight,
    stageScale: 1,
    stageX: 0,
    stageY: 0,
    width: window.innerWidth,
  });

  const locImageRef = React.useRef();
  const stageRef = React.useRef();
  const [image] = useImage(locImage.src);

  React.useEffect(() => {
    function handleResize() {
      setDimensions({
        ...dimensions,
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

  function centreRectShape(shape) {
    if (!shape) return;
    const stage = stageRef.current;
    shape.x((stage.getWidth() - shape.getWidth()) / 2);
    shape.y((stage.getHeight() - shape.getHeight()) / 2);
  }

  // DESKTOP ZOOM MOUSESCROLL
  const handleWheel = e => {
    console.log('\nhandleWheel');
    e.evt.preventDefault();
    const scaleBy = 1.02;
    const stage = e.target.getStage();
    const oldScale = stage.scaleX();
    console.log('oldScale', oldScale);
    const mousePointTo = {
      x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
      y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale,
    };
    console.log('mousePointTo', mousePointTo);
    console.log('stage.getPointerPosition()', stage.getPointerPosition());
    console.log('stage.x()', stage.x());
    console.log('stage.y()', stage.y());
    const newScale = e.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;
    console.log('newScale', newScale);
    console.log(
      'stageX',
      -(mousePointTo.x - stage.getPointerPosition().x / newScale) * newScale
    );
    console.log(
      'stageY',
      -(mousePointTo.y - stage.getPointerPosition().y / newScale) * newScale
    );
    // setDimensions({
    //   ...dimensions,
    //   stageScale: newScale,
    //   stageX:
    //     -(mousePointTo.x - stage.getPointerPosition().x / newScale) * newScale,
    //   stageY:
    //     -(mousePointTo.y - stage.getPointerPosition().y / newScale) * newScale,
    // });
    const zoomType = e.evt.deltaY > 0 ? 'out' : 'in';
    manualHandleWheel(stage, zoomType);
  };

  const manualHandleWheel = (stage, zoomType) => {
    console.log('\nhandleWheel');
    const pointerPosX = stage.getWidth() / 2;
    const pointerPosY = stage.getHeight() / 2;
    const scaleBy = 1.02;
    const oldScale = stage.scaleX();
    const mousePointTo = {
      x: pointerPosX / oldScale - stage.x() / oldScale,
      y: pointerPosY / oldScale - stage.y() / oldScale,
    };
    const newScale =
      zoomType === 'in' ? oldScale * scaleBy : oldScale / scaleBy;
    const stageX = -(mousePointTo.x - pointerPosX / newScale) * newScale;
    const stageY = -(mousePointTo.y - pointerPosY / newScale) * newScale;
    setDimensions({
      ...dimensions,
      stageScale: newScale,
      stageX,
      stageY,
    });
  };

  const handleZoomOutClick = () => {
    const theRef = stageRef.current;
    let counter = 0;
    const theInterval = setInterval(() => {
      manualHandleWheel(theRef, 'out');
      counter = counter + 1;
      if (counter > 10) {
        clearInterval(theInterval);
      }
    }, 20);
  };

  const handleZoomInClick = () => {
    const theRef = stageRef.current;
    let counter = 0;
    const theInterval = setInterval(() => {
      manualHandleWheel(theRef, 'in');
      counter = counter + 1;
      if (counter > 10) {
        clearInterval(theInterval);
      }
    }, 20);
  };

  return (
    <React.Fragment>
      <Center>
        <Button onClick={handleZoomInClick}>Zoom In</Button>{' '}
        <Button onClick={handleZoomOutClick}>Zoom Out</Button>
      </Center>
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
          width={dimensions.width + 200}
          height={dimensions.height + 200}
          //onWheel={handleWheel}
          ref={stageRef}
          scaleX={dimensions.stageScale}
          scaleY={dimensions.stageScale}
          x={dimensions.stageX}
          y={dimensions.stageY}
        >
          <Layer>
            {image && (
              <Image image={image} ref={locImageRef} listening={false} />
            )}
            <Rect
              width={100}
              height={100}
              fill="red"
              shadowBlur={10}
              draggable
            />
            <Circle radius={50} fill="green" draggable />
          </Layer>
        </Stage>
      </Box>
    </React.Fragment>
  );
}

KonvaZoomScroll.defaultProps = {
  locImage: { src: '', height: '', width: '' },
};

KonvaZoomScroll.propTypes = {
  locImage: PropTypes.object,
};
