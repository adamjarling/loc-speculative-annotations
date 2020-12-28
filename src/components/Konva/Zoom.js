import React from 'react';
import { Stage, Layer, Circle } from 'react-konva';
import Konva from 'konva';
import { Box } from '@chakra-ui/react';

export default function KonvaZoom() {
  Konva.hitOnDragEnabled = true;
  const [stageState, setStageState] = React.useState({
    stageScale: 1,
    stageX: 0,
    stageY: 0,
  });

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

    setStageState({
      stageScale: newScale,
      stageX:
        -(mousePointTo.x - stage.getPointerPosition().x / newScale) * newScale,
      stageY:
        -(mousePointTo.y - stage.getPointerPosition().y / newScale) * newScale,
    });
  };

  return (
    <Box w="100%" h="600px" bgColor="antiquewhite">
      <Stage
        width={window.innerWidth + 500}
        height={window.innerHeight + 500}
        onWheel={handleWheel}
        scaleX={stageState.stageScale}
        scaleY={stageState.stageScale}
        x={stageState.stageX}
        y={stageState.stageY}
      >
        <Layer>
          <Circle
            x={window.innerWidth / 2}
            y={window.innerHeight / 2}
            radius={50}
            fill="green"
            shadowBlur={5}
            draggable
          />
        </Layer>
      </Stage>
    </Box>
  );
}
