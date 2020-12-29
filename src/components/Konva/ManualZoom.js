import React from 'react';
import PropTypes from 'prop-types';
import { Image, Stage, Layer, Rect, Circle } from 'react-konva';
import { Box, Button, Center } from '@chakra-ui/react';
import useImage from 'use-image';
import Konva from 'konva';
import debounce from 'lodash.debounce';

export default function KonvaManualZoom({ locImage }) {
  Konva.hitOnDragEnabled = true;
  Konva.captureTouchEventsEnabled = true;

  const [dimensions, _setDimensions] = React.useState({
    height: window.innerHeight,
    stageScale: 1,
    stageX: 0,
    stageY: 0,
    width: window.innerWidth,
  });

  const dimensionsRef = React.useRef(dimensions);
  const setDimensions = data => {
    dimensionsRef.current = data;
    _setDimensions(data);
  };

  const locImageRef = React.useRef();
  const stageRef = React.useRef();
  const boxRef = React.useRef();
  const [image] = useImage(locImage.src);

  React.useEffect(() => {
    function handleResize() {
      setDimensions({
        ...dimensionsRef.current,
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

  const manualHandleWheel = (stage, zoomType) => {
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
      if (counter > 20) {
        clearInterval(theInterval);
      }
    }, 10);
  };

  const handleZoomInClick = () => {
    const theRef = stageRef.current;
    let counter = 0;
    const theInterval = setInterval(() => {
      manualHandleWheel(theRef, 'in');
      counter = counter + 1;
      if (counter > 20) {
        clearInterval(theInterval);
      }
    }, 10);
  };

  var dist1 = 0;
  var touchZoomDirection = '';
  const handleTouchStart = e => {
    const ev = e.evt;
    console.log('Touchstart ev', ev);
    if (ev.targetTouches.length == 2) {
      e.evt.preventDefault();
      //check if two fingers touched screen
      dist1 = Math.hypot(
        //get rough estimate of distance between two fingers
        ev.touches[0].pageX - ev.touches[1].pageX,
        ev.touches[0].pageY - ev.touches[1].pageY
      );
    }
  };
  const handleTouchMove = debounce(e => {
    const ev = e.evt;
    if (ev.targetTouches.length == 2 && ev.changedTouches.length == 2) {
      e.evt.preventDefault();
      // Check if the two target touches are the same ones that started
      var dist2 = Math.hypot(
        //get rough estimate of new distance between fingers
        ev.touches[0].pageX - ev.touches[1].pageX,
        ev.touches[0].pageY - ev.touches[1].pageY
      );
      if (dist1 > dist2) {
        //if fingers are closer now than when they first touched screen, they are pinching
        console.log('zoom out');
        touchZoomDirection = 'out';
      }
      if (dist1 < dist2) {
        //if fingers are further apart than when they first touched the screen, they are making the zoomin gesture
        console.log('zoom in');
        touchZoomDirection = 'in';
      }
    }
  }, 10);
  const handleTouchEnd = debounce(e => {
    const ev = e.evt;
    console.log('Touchend ev', ev);
    console.log('END');
    console.log('touchZoomDirection', touchZoomDirection);

    if (touchZoomDirection === 'in') {
      handleZoomInClick();
    } else {
      handleZoomOutClick();
    }
  }, 100);

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
        ref={boxRef}
      >
        <p>
          height: {dimensions.height} width: {dimensions.width}
        </p>
        <Stage
          width={dimensions.width + 200}
          height={dimensions.height + 200}
          ref={stageRef}
          //   onTouchStart={handleTouchStart}
          //   onTouchMove={handleTouchMove}
          //onTouchEnd={handleTouchEnd}
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

KonvaManualZoom.defaultProps = {
  locImage: { src: '', height: '', width: '' },
};

KonvaManualZoom.propTypes = {
  locImage: PropTypes.object,
};
