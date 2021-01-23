import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useBreakpointValue,
  useToast,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { useFabricOverlayState } from 'context/fabric-overlay-context';
import ShareLinkDisplay from 'components/Share/LinkDisplay';

var codec = require('json-url')('lzma');

// Url parameter key to use when appending data to the url
const queryURLParam = 'sharedCanvas';
function Share(props) {
  const toast = useToast();
  const { fabricOverlay } = useFabricOverlayState();
  const [showLink, setShowLink] = React.useState();
  const [linkUrl, setLinkUrl] = React.useState('');
  const buttonSize = useBreakpointValue({ base: 'xs', sm: 'sm', md: 'md' });

  const handleSharableLinkClick = () => {
    if (showLink) {
      setShowLink(false);

      // Clear out SharedLink value
      setLinkUrl('');
    } else {
      const canvasObj = fabricOverlay.fabricCanvas().toObject();
      codec
        .compress(canvasObj)
        .then(result => {
          setLinkUrl(`${window.location.href}?${queryURLParam}=${result}`);
          setShowLink(true);
        })
        .catch(error => {
          console.error(error);
          toast({
            title: 'An error occurred.',
            description:
              'Unable to compress the FabricJS canvas annotations object.',
            status: 'error',
            duration: 9000,
            isClosable: true,
          });
        });
    }
  };

  const onModalClose = () => {
    setShowLink(false);
    setLinkUrl('');
  };

  return (
    <div>
      <Menu>
        <MenuButton
          as={Button}
          rightIcon={<ChevronDownIcon />}
          size={buttonSize}
        >
          Share
        </MenuButton>
        <MenuList>
          <MenuItem>#LOCAnnotations</MenuItem>
          <MenuItem>Instagram</MenuItem>
          <MenuItem onClick={handleSharableLinkClick}>Shareable link</MenuItem>
        </MenuList>
      </Menu>
      <ShareLinkDisplay
        linkUrl={linkUrl}
        onModalClose={onModalClose}
        showLink={showLink}
      />
    </div>
  );
}

Share.propTypes = {};

export default Share;
