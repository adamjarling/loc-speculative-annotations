import React from 'react';
import {
  Box,
  Center,
  Divider,
  Flex,
  HStack,
  useBreakpointValue,
} from '@chakra-ui/react';
import useColorModeColors from 'hooks/use-color-mode-colors';
import ClearCanvas from 'components/ClearCanvas';
import Share from 'components/Share/Share';
import MyAnnotationsSave from 'components/MyAnnotations/Save';
import Download from 'components/Download';
import { isBrowser } from 'react-device-detect';
import Color from 'components/Color/Color';
import { useFabricOverlayState } from 'context/fabric-overlay-context';
import UndoRedo from 'components/UndoRedo/UndoRedo';

function AdjustmentBar(props) {
  const { bg } = useColorModeColors();
  const flexDirection = useBreakpointValue({
    base: 'column-reverse',
    sm: 'row',
  });
  const { activeTool } = useFabricOverlayState();

  return (
    <Flex
      bgColor={bg}
      justifyContent="space-between"
      alignItems="center"
      direction={flexDirection}
      data-testid="adjustment-bar"
    >
      <Box
        ml={2}
        py={2}
        h={!activeTool || activeTool === 'POINTER' ? 0 : '100%'}
      >
        <Color />
      </Box>
      <HStack spacing={2} pt={[2, 0]}>
        <ClearCanvas />
        <UndoRedo />
        <Center height="20px">
          <Divider orientation="vertical" />
        </Center>

        <Share />
        {/* <MyAnnotationsSave /> */}
        {<Download />}
      </HStack>
    </Flex>
  );
}

AdjustmentBar.propTypes = {};

export default AdjustmentBar;
