import React from 'react';
import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useToast,
} from '@chakra-ui/react';
import { RiShareForwardFill } from 'react-icons/ri';
import { useFabricOverlayState } from 'context/fabric-overlay-context';
import ShareLinkDisplay from 'components/Share/LinkDisplay';

var codec = require('json-url')('lzma');

// Url parameter key to use when appending data to the url
const queryURLParam = 'sharedCanvas';
function Share() {
  const toast = useToast();
  const { fabricOverlay } = useFabricOverlayState();
  const [showLink, setShowLink] = React.useState();
  const [linkUrl, setLinkUrl] = React.useState('');

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
      <Menu placement="left-end">
        <MenuButton
          as={Button}
          leftIcon={<RiShareForwardFill />}
          size="sm"
          textTransform="uppercase"
          variant="ghost"
          data-testid="share-link"
        >
          Share
        </MenuButton>
        <MenuList position="relative" zIndex="10000">
          <MenuItem position="relative" zIndex="10000">
            #LOCAnnotations
          </MenuItem>
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

export default Share;
