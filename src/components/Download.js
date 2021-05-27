import React from 'react';
import {
  Button,
  Flex,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react';
import { DownloadIcon } from '@chakra-ui/icons';
import html2canvas from 'html2canvas';
import AltButton from 'components/AltButton';

export default function Download() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [img, setImg] = React.useState();
  const html2CanvasBg = useColorModeValue('#ffffff', '#1A202C');
  const showButtonText = useBreakpointValue({ base: false, xl: true });

  const handleClick = () => {
    html2canvas(document.querySelector('#download-wrapper'), {
      backgroundColor: html2CanvasBg,
      logging: true,
    }).then(canvas => {
      setImg(canvas.toDataURL('image/png'));
    });
    onOpen();
  };

  return (
    <>
      <AltButton
        leftIcon={<DownloadIcon />}
        onClick={handleClick}
        aria-label="Download as an image"
        variant="ghost"
        mr={2}
        data-testid="download-link"
      >
        Download
      </AltButton>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Download image</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Image src={img} />
          </ModalBody>

          <ModalFooter>
            <Flex w="100%">
              <Button variant="ghost" flexGrow="1" onClick={onClose}>
                Cancel
              </Button>
              <Button
                as="a"
                flexGrow="1"
                variant="saPink"
                mr={3}
                href={img}
                download={'my-speculative-annotation'}
                fontFamily="ocr-a-std"
              >
                Download
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
