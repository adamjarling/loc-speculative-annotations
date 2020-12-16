import React from 'react';
import { Box, Heading, Textarea } from '@chakra-ui/react';
import { Layer, Line, Stage } from 'react-konva';
import SourceImage from './SourceImage';
import Toolbar from './Toolbar';

const imgUrl =
  'https://tile.loc.gov/image-services/iiif/service:pnp:fsa:8c34000:8c34000:8c34058v/full/pct:100/0/default.jpg';

export default function KonvaTest() {
  const stageRef = React.useRef();
  const [tool, setTool] = React.useState('pen');
  const [imgSize, setImgSize] = React.useState({ width: 959, height: 1024 });

  const [lines, setLines] = React.useState([]);
  const isDrawing = React.useRef(false);

  const [stageSize, setStageSize] = React.useState({
    width: imgSize.width,
    height: imgSize.height,
    scale: { x: 1, y: 1 },
  });

  const isPenErase = tool === 'pen' || tool === 'eraser';

  React.useEffect(() => {
    const fitStageIntoParentContainer = () => {
      setImgSize({ width: 959, height: 1024 });

      const scale = window.innerWidth / imgSize.width;
      setStageSize({
        width: imgSize.width * scale,
        height: imgSize.height * scale,
        scale: { x: scale, y: scale },
      });
    };

    // Initiate size when loaded
    fitStageIntoParentContainer();

    window.addEventListener('resize', fitStageIntoParentContainer);
    return () =>
      window.removeEventListener('resize', fitStageIntoParentContainer);
  }, [imgSize.height, imgSize.width]);

  const handleClick = e => {
    console.log('handleClick');
    if (tool === 'text') {
      handleTextClick();
    }
  };

  const handleTextClick = e => {
    console.log(
      'stageRef.current.getPointerPosition()',
      stageRef.current.getPointerPosition()
    );
  };

  const handleMouseDown = e => {
    if (isPenErase) {
      handlePenEraseMouseDown(e);
    }
  };

  const handlePenEraseMouseDown = e => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { tool, points: [pos.x, pos.y] }]);
  };

  const handleMouseMove = e => {
    if (isPenErase) {
      handlePenEraseMouseMove(e);
    }
  };

  const handlePenEraseMouseMove = e => {
    // no drawing - skipping
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    // add point
    lastLine.points = lastLine.points.concat([point.x, point.y]);

    // replace last
    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  };

  const handleMouseUp = () => {
    if (isPenErase) {
      isDrawing.current = false;
    }
  };

  const handleToolSelect = tool => {
    setTool(tool);
  };

  return (
    <React.Fragment>
      <Box position="relative">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          as="section"
        >
          <Heading as="h2" size="md" my={4} pt={6}>
            Konva.js package experimenting
          </Heading>

          <Toolbar handleToolSelect={handleToolSelect} activeTool={tool} />
        </Box>

        {tool === 'text' && (
          <Textarea
            placeholder="Enter text here"
            width={300}
            position="absolute"
            top={200}
            right={20}
            zIndex={100}
            background="white"
          />
        )}

        <Stage
          ref={stageRef}
          width={stageSize.width}
          height={stageSize.height}
          //scale={stageSize.scale}
          style={{ background: 'antiquewhite' }}
          onMouseDown={handleMouseDown}
          onMousemove={handleMouseMove}
          onMouseup={handleMouseUp}
          onClick={handleClick}
        >
          <Layer>
            <SourceImage imgUrl={imgUrl} stageSize={stageSize} />
            {lines.map((line, i) => (
              <Line
                key={i}
                points={line.points}
                stroke="#df4b26"
                strokeWidth={5}
                tension={0.5}
                lineCap="round"
                globalCompositeOperation={
                  line.tool === 'eraser' ? 'destination-out' : 'source-over'
                }
              />
            ))}
          </Layer>
        </Stage>
      </Box>
    </React.Fragment>
  );
}
