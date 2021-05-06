import React from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Textarea,
  useDisclosure,
} from '@chakra-ui/react';
import { useFabricOverlayState } from 'context/fabric-overlay-context';

var codec = require('json-url')('lzma');

export default function Decompressor() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [code, setCode] = React.useState();
  const { fabricOverlay } = useFabricOverlayState();

  function parseCode() {
    codec
      .decompress(code)
      .then(json => {
        console.log(`json`, json);
        fabricOverlay.fabricCanvas().loadFromJSON(json);
      })
      .catch(error => {
        console.error('error', error);
      });
  }

  return (
    <>
      <Button onClick={onOpen}>LOC</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Decompress Share string code</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Textarea value={code} onChange={e => setCode(e.target.value)} />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost" onClick={parseCode}>
              Parse
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
