import React from 'react';
import PropTypes from 'prop-types';
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
} from '@chakra-ui/react';

function ShareLinkDisplay({ linkUrl, onModalClose, showLink }) {
  const textAreaRef = React.useRef();
  const [isCopied, setIsCopied] = React.useState('');

  const handleModalClose = () => {
    setIsCopied(false);
    onModalClose();
  };

  /* https://coderrocketfuel.com/article/how-to-copy-text-to-the-clipboard-in-react-js */
  const handleCopyClick = () => {
    textAreaRef.current.select();
    document.execCommand('copy');
    setIsCopied(true);
  };

  return (
    <Modal isOpen={showLink} onClose={handleModalClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Share URL</ModalHeader>
        <ModalCloseButton onClick={handleModalClose} />
        <ModalBody>
          <Textarea rows={10} defaultValue={linkUrl} ref={textAreaRef} />
        </ModalBody>

        <ModalFooter>
          <Button onClick={handleCopyClick} disabled={isCopied}>
            {isCopied ? 'Copied!' : 'Copy link'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

ShareLinkDisplay.propTypes = {
  linkUrl: PropTypes.string,
  onModalClose: PropTypes.func,
  showLink: PropTypes.bool,
};

export default ShareLinkDisplay;
