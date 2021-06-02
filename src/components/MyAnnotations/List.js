import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Flex, Stack, Wrap, WrapItem } from '@chakra-ui/react';

function MyAnnotationsList({
  handleChangeCanvas,
  handleDeleteClick,
  userCanvases,
}) {
  const userCanvasTitles = Object.keys(userCanvases);

  return (
    <>
      <Wrap direction="column" data-testid="my-saved-annotations-list">
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
                <Button variant="ghost" onClick={() => handleChangeCanvas(uc)}>
                  Edit
                </Button>
                <Button variant="ghost" onClick={() => handleDeleteClick(uc)}>
                  Delete
                </Button>
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
