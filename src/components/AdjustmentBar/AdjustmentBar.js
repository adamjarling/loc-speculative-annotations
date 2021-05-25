import React from 'react';
import {
  Box,
  Center,
  Divider,
  Flex,
  HStack,
  StackDivider,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react';
import useColorModeColors from 'hooks/use-color-mode-colors';
import ClearCanvas from 'components/ClearCanvas';
import Share from 'components/Share/Share';
import MyAnnotationsSave from 'components/MyAnnotations/Save';
import Download from 'components/Download';
import Color from 'components/Color/Color';
import { useFabricOverlayState } from 'context/fabric-overlay-context';
import UndoRedo from 'components/UndoRedo/UndoRedo';
import AdjustmentBarWidthPicker from 'components/AdjustmentBar/WidthPicker';
import Decompressor from 'components/Decompressor';
import ShowHideAnnotations from 'components/ShowHideAnnotations';

function AdjustmentBar(props) {
  const { bg } = useColorModeColors();
  const dividerColor = useColorModeValue('white', 'gray.600');
  const flexDirection = useBreakpointValue({
    base: 'column-reverse',
    sm: 'row',
  });
  const { activeTool } = useFabricOverlayState();
  const itemSpacing = useBreakpointValue({
    base: '10px',
    lg: '20px',
  });
  const itemSpacingNarrow = useBreakpointValue({
    base: '0px',
    lg: '20px',
  });
  const buttonSize = useBreakpointValue({
    base: { height: '20px', width: '20px' },
    sm: { height: '24px', width: '24px' },
    lg: { height: '30px', width: '30px' },
  });

  const isColorVisible = Boolean(
    activeTool && ['POINTER', 'STAMP_QUESTION'].indexOf(activeTool) === -1
  );
  const isWidthPickerVisible = Boolean(
    activeTool && ['DRAW', 'HIGHLIGHTER'].indexOf(activeTool) > -1
  );

  return (
    <Flex
      bgColor={bg}
      justifyContent="space-between"
      alignItems="center"
      direction={flexDirection}
      data-testid="adjustment-bar"
      minH="3rem"
    >
      <HStack
        ml={2}
        py={2}
        spacing={itemSpacing}
        divider={<StackDivider borderColor={dividerColor} />}
      >
        {isColorVisible && (
          <Color activeTool={activeTool} buttonSize={buttonSize} />
        )}
        {isWidthPickerVisible && (
          <AdjustmentBarWidthPicker
            activeTool={activeTool}
            buttonSize={buttonSize}
          />
        )}
      </HStack>
      <HStack
        spacing={itemSpacingNarrow}
        pt={[2, 0]}
        divider={<StackDivider borderColor={dividerColor} />}
      >
        {/* <Decompressor /> */}
        <Box>
          <ClearCanvas />
          <UndoRedo />
        </Box>

        {/* <Center height="20px">
          <Divider orientation="vertical" />
        </Center> */}

        <Share />
        <Box>
          <MyAnnotationsSave />
          <Download />
        </Box>
        <ShowHideAnnotations />
      </HStack>
    </Flex>
  );
}

AdjustmentBar.propTypes = {};

export default AdjustmentBar;
