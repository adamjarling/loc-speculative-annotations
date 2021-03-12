import React from 'react';
import PropTypes from 'prop-types';
import { Box, Center, Divider, Flex, HStack } from '@chakra-ui/react';
import useColorModeColors from 'hooks/use-color-mode-colors';
import ClearCanvas from 'components/ClearCanvas';
import Share from 'components/Share/Share';
import MyAnnotationsSave from 'components/MyAnnotations/Save';
import Download from 'components/Download';
import { isBrowser } from 'react-device-detect';
import Color from 'components/Color/Color';

function AdjustmentBar(props) {
  const { bg } = useColorModeColors();

  return (
    <Flex
      bgColor={bg}
      py={1}
      my={1}
      justifyContent="space-between"
      alignItems="center"
    >
      <Box ml={2}>
        <Color />
      </Box>
      <HStack spacing={2}>
        <ClearCanvas />
        <Center height="20px">
          <Divider orientation="vertical" />
        </Center>

        <Share />
        <MyAnnotationsSave />
        {isBrowser && <Download />}
      </HStack>
    </Flex>
  );
}

AdjustmentBar.propTypes = {};

export default AdjustmentBar;
