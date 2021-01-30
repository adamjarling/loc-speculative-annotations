import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Flex,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Stack,
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
  isOpen,
  userCanvases,
}) {
  const userCanvasTitles = Object.keys(userCanvases);

  return (
    <>
      <Modal isOpen={isOpen} onClose={handleCloseClick}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Your Saved Annotations</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Wrap direction="column">
              {userCanvasTitles.map(uc => (
                <WrapItem
                  key={uc}
                  {...(uc === activeUserCanvas && { ...activeStyles })}
                >
                  <Flex width="100%" alignItems="center">
                    <Box flex="1">
                      <Box bg="tomato" w="100px" h="75px"></Box>
                    </Box>
                    <Box flex="auto">{uc}</Box>
                    <Stack direction="row" alignItems="center">
                      <IconButton
                        icon={<TiArrowForward />}
                        variant="ghost"
                        onClick={() => handleChangeCanvas(uc)}
                      />
                      <IconButton
                        icon={<DeleteIcon />}
                        variant="ghost"
                        onClick={() => handleDeleteClick(uc)}
                      />
                      <Button size="xs" variant="ghost">
                        Edit
                      </Button>
                    </Stack>
                  </Flex>
                </WrapItem>
              ))}
            </Wrap>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

MyAnnotationsList.propTypes = {
  activeUserCanvas: PropTypes.string,
  handleCloseClick: PropTypes.func,
  handleDeleteClick: PropTypes.func,
  handleChangeCanvas: PropTypes.func,
  isOpen: PropTypes.bool,
  userCanvases: PropTypes.object,
};

export default MyAnnotationsList;
