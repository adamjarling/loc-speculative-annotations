import React from 'react';
import PropTypes from 'prop-types';
import { Image, Stage, Layer, Rect, Circle } from 'react-konva';
import { Box } from '@chakra-ui/react';
import useImage from 'use-image';
import Konva from 'konva';

export default function KonvaZoomPinchScroll({ locImage }) {
  Konva.hitOnDragEnabled = true;
  const [dimensions, setDimensions] = React.useState({
    height: window.innerHeight,
    stageScale: 1,
    stageX: 0,
    stageY: 0,
    width: window.innerWidth,
  });
  const [touchVals, setTouchVals] = React.useState({
    lastCenter: null,
    lastDist: null,
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
    e.evt.preventDefault();
    const scaleBy = 1.02;
    const stage = e.target.getStage();
    const oldScale = stage.scaleX();
    const mousePointTo = {
      x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
      y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale,
    };
    const newScale = e.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;
    setDimensions({
      ...dimensions,
      stageScale: newScale,
      stageX:
        -(mousePointTo.x - stage.getPointerPosition().x / newScale) * newScale,
      stageY:
        -(mousePointTo.y - stage.getPointerPosition().y / newScale) * newScale,
    });
  };

  // TOUCH DEVISE PINCH ZOOM
  function getDistance(p1, p2) {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
  }
  function getCenter(p1, p2) {
    return {
      x: (p1.x + p2.x) / 2,
      y: (p1.y + p2.y) / 2,
    };
  }
  const handleTouchMove = e => {
    e.evt.preventDefault();
    const stage = stageRef.current;

    var touch1 = e.evt.touches[0];
    var touch2 = e.evt.touches[1];

    if (touch1 && touch2) {
      // if the stage was under Konva's drag&drop
      // we need to stop it, and implement our own pan logic with two pointers
      if (stage.isDragging()) {
        stage.stopDrag();
      }

      var p1 = {
        x: touch1.clientX,
        y: touch1.clientY,
      };
      var p2 = {
        x: touch2.clientX,
        y: touch2.clientY,
      };

      if (!touchVals.lastCenter) {
        touchVals.lastCenter = getCenter(p1, p2);
        return;
      }
      var newCenter = getCenter(p1, p2);

      var dist = getDistance(p1, p2);

      if (!touchVals.lastDist) {
        touchVals.lastDist = dist;
      }

      // local coordinates of center point
      var pointTo = {
        x: (newCenter.x - stage.x()) / stage.scaleX(),
        y: (newCenter.y - stage.y()) / stage.scaleX(),
      };

      var scale = stage.scaleX() * (dist / touchVals.lastDist);

      stage.scaleX(scale);
      stage.scaleY(scale);

      // calculate new position of the stage
      var dx = newCenter.x - touchVals.lastCenter.x;
      var dy = newCenter.y - touchVals.lastCenter.y;

      var newPos = {
        x: newCenter.x - pointTo.x * scale + dx,
        y: newCenter.y - pointTo.y * scale + dy,
      };

      stage.position(newPos);
      stage.batchDraw();

      setTouchVals({
        ...touchVals,
        lastDist: dist,
        lastCenter: newCenter,
      });
    }
  };

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
        width={dimensions.width}
        height={dimensions.height}
        onWheel={handleWheel}
        onTouchMove={handleTouchMove}
        ref={stageRef}
        scaleX={dimensions.stageScale}
        scaleY={dimensions.stageScale}
        x={dimensions.stageX}
        y={dimensions.stageY}
        draggable
      >
        <Layer>
          {image && <Image image={image} ref={locImageRef} draggable />}
          <Rect
            width={100}
            height={100}
            fill="red"
            shadowBlur={10}
            x={200}
            y={dimensions.height / 2}
            draggable
          />
          <Circle radius={50} fill="green" draggable />
        </Layer>
      </Stage>
    </Box>
  );
}

KonvaZoomPinchScroll.defaultProps = {
  locImage: { src: '', height: '', width: '' },
};

KonvaZoomPinchScroll.propTypes = {
  locImage: PropTypes.object,
};
