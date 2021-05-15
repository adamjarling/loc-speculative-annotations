import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Flex,
  IconButton,
  Stack,
  Text,
  Tooltip,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { TiArrowForward } from 'react-icons/ti';

const activeStyles = {
  border: '1px',
};

function MyAnnotationsList({
  activeUserCanvas,
  handleChangeCanvas,
  handleCloseClick,
  handleDeleteClick,
  handleUpdateSavedCanvasTitle,
  isOpen,
  userCanvases,
}) {
  const userCanvasTitles = Object.keys(userCanvases);

  return (
    <>
      {/* <Heading size="sm">Work in progress</Heading> */}
      <Wrap direction="column">
        {userCanvasTitles.map(uc => (
          <WrapItem key={uc}>
            <Flex
              width="100%"
              justifyContent="space-between"
              alignItems="center"
            >
              <Flex alignItems="center">
                <Box bg="brand.pink.500" w="20px" h="20px" mr={4}></Box>
                <Box>{uc}</Box>
              </Flex>

              <Stack direction="row" alignItems="center">
                <Tooltip label="Go to saved work" aria-label="Go to saved work">
                  <IconButton
                    icon={<TiArrowForward />}
                    variant="ghost"
                    onClick={() => handleChangeCanvas(uc)}
                  />
                </Tooltip>

                <Tooltip
                  label="Delete saved work"
                  aria-label="Delete saved work"
                >
                  <IconButton
                    icon={<DeleteIcon />}
                    variant="ghost"
                    onClick={() => handleDeleteClick(uc)}
                  />
                </Tooltip>
              </Stack>
            </Flex>
          </WrapItem>
        ))}
      </Wrap>
    </>
  );
}

MyAnnotationsList.propTypes = {
  activeUserCanvas: PropTypes.string,
  handleCloseClick: PropTypes.func,
  handleDeleteClick: PropTypes.func,
  handleChangeCanvas: PropTypes.func,
  handleUpdateSavedCanvasTitle: PropTypes.func,
  isOpen: PropTypes.bool,
  userCanvases: PropTypes.object,
};

export default MyAnnotationsList;
