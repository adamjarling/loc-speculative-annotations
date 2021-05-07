import React from 'react';
import { FaInfoCircle } from 'react-icons/fa';
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Heading,
  IconButton,
  Link,
  Tooltip,
  Wrap,
  WrapItem,
  useBreakpointValue,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { useParams } from 'react-router-dom';
import { locImages } from 'services/loc-images';
import { loadManifest, parseManifest } from 'manifesto.js';
import useIIIFManifests from 'hooks/use-iiif-manifests';

function MetadataHeading({ children }) {
  return (
    <Heading as="h2" size="md" pt={3}>
      {children}
    </Heading>
  );
}

function MetadataBody({ children }) {
  return <Box mb={3}>{children}</Box>;
}

function Metadata() {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const params = useParams();
  const [currentWork, setCurrentWork] = React.useState();
  const [metadata, setMetadata] = React.useState();
  const iconButtonSize = useBreakpointValue({ base: 'md', md: 'lg' });
  const { filterMetadata, findManifest, getQuestions } = useIIIFManifests();

  async function getManifestData() {
    const obj = await getWorkMetadata();

    if (obj) {
      const collection = await getCollection();
      obj.collection = collection;
    }

    setMetadata(obj);
  }

  async function getWorkMetadata() {
    try {
      const currentManifest = await findManifest(params.id);
      if (!currentManifest) return;

      // Fetch the Library of Congress hosted manifest for a work
      const locManifestResponse = await loadManifest(currentManifest.id);
      const locManifest = parseManifest(locManifestResponse);

      // Build up the parsed metadata into an object we feed to the component for display
      // Start with applying Library of Congress manifest info
      const obj = {
        label: locManifest.getLabel().getValue(),
        metadata: filterMetadata(locManifest.getMetadata()),
      };

      // And then apply the application's supplemental information
      obj.contact = currentManifest.getProperty('provider')[0].id;
      obj.questions = getQuestions(currentManifest);
      obj.summary = currentManifest.getProperty('summary')['en'][0];
      obj.workUrl = currentManifest.getProperty('homepage')[0].id;

      return obj;
    } catch (e) {
      console.error('Error loading / parsing IIIF manifest', e);
      toast({
        title: `Error loading IIIF manifest`,
        status: 'error',
        isClosable: true,
      });
      return;
    }
  }

  async function getCollection() {
    try {
      const currentManifest = await findManifest(params.id);
      if (!currentManifest) return;

      // Fetch work's collection information
      const collectionManifest = await loadManifest(
        currentManifest.getProperty('partOf')[0].id
      );

      if (collectionManifest) {
        const parsed = parseManifest(collectionManifest);
        return {
          label: parsed.getLabel().getValue(),
          url: parsed.getProperty('homepage')[0].id,
        };
      }
    } catch (e) {
      console.error(
        'Error loading / parsing Collection from Work in manifest',
        e
      );
      toast({
        title: `Error loading the Work Collection`,
        status: 'error',
        isClosable: true,
      });
      return;
    }
  }

  React.useEffect(() => {
    getManifestData();
  }, [params.id]);

  const createMarkup = value => {
    if (!value) return '';
    if (value.split('<br/>').length > 0) {
      // return dangerously set inner HTML
      return <div dangerouslySetInnerHTML={{ __html: value }} />;
    }
    return value;
  };

  const handleClose = () => {
    onClose();
  };

  const handleToolbarClick = () => {
    // Drawer not yet opened
    if (!isOpen) {
      const work = locImages.find(i => i.id === params.id);
      setCurrentWork(work);
      onOpen();
    } else {
      onClose();
    }
  };

  return (
    <>
      <Tooltip label="Info" aria-label="Info" openDelay={500}>
        <IconButton
          icon={<FaInfoCircle />}
          onClick={handleToolbarClick}
          size={iconButtonSize}
          fontSize={['2xl', '3xl']}
          variant="ghost"
          disabled={!metadata}
        />
      </Tooltip>

      <Drawer isOpen={isOpen} placement="right" onClose={handleClose}>
        <DrawerOverlay>
          {currentWork && metadata && (
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>{metadata.label || ''}</DrawerHeader>

              <DrawerBody>
                <MetadataBody>{metadata.summary || ''}</MetadataBody>

                {metadata.metadata.map((m, i) => (
                  <div key={i}>
                    <MetadataHeading>{m.getLabel()}</MetadataHeading>
                    <MetadataBody>{createMarkup(m.getValue())}</MetadataBody>
                  </div>
                ))}

                <MetadataHeading>Questions</MetadataHeading>
                <MetadataBody>
                  <Wrap direction="column">
                    {metadata.questions.map((q, i) => (
                      <WrapItem key={i}>{q}</WrapItem>
                    ))}
                  </Wrap>
                </MetadataBody>

                <MetadataHeading>Contact</MetadataHeading>
                <MetadataBody>
                  <Link href={metadata.contact} isExternal>
                    {metadata.contact} <ExternalLinkIcon mx="2px" />
                  </Link>
                </MetadataBody>

                {metadata.collection && (
                  <>
                    <MetadataHeading>Collection</MetadataHeading>
                    <MetadataBody>
                      <Link href={metadata.collection?.url} isExternal>
                        {metadata.collection?.label}{' '}
                        <ExternalLinkIcon mx="2px" />
                      </Link>
                    </MetadataBody>
                  </>
                )}

                <MetadataHeading>LOC Image</MetadataHeading>
                <MetadataBody>
                  <Link href={metadata.workUrl} isExternal>
                    View image <ExternalLinkIcon mx="2px" />
                  </Link>
                </MetadataBody>
              </DrawerBody>

              <DrawerFooter></DrawerFooter>
            </DrawerContent>
          )}
        </DrawerOverlay>
      </Drawer>
    </>
  );
}

export default Metadata;
