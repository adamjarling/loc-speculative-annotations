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
  Wrap,
  WrapItem,
  useDisclosure,
} from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { useParams } from 'react-router-dom';
import { locImages } from 'services/loc-images';
import { loadManifest, parseManifest } from 'manifesto.js';
import useIIIFManifests from 'hooks/use-iiif-manifests';
import useButtonSize from 'hooks/use-button-size';

function MetadataHeading({ children }) {
  return (
    <Heading as="h2" size={['sm', 'md']} pt={3}>
      {children}
    </Heading>
  );
}

function MetadataBody({ children }) {
  return <Box mb={3}>{children}</Box>;
}

function Metadata() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const params = useParams();
  const [currentWork, setCurrentWork] = React.useState();
  const [metadata, setMetadata] = React.useState();
  const { filterMetadata, findManifest, getQuestions, getResearch } =
    useIIIFManifests();
  const buttonSize = useButtonSize();

  async function getManifestData() {
    // Get app level metadata, and LOC hosted metadata
    const appObj = await getAppMetadata();
    const locObj = await getWorkMetadata();

    // Combine the metadata
    const obj = { ...appObj, ...locObj };

    // Add in collection info
    if (obj) {
      const collection = await getCollection();
      obj.collection = collection;
    }

    setMetadata(obj);
  }

  async function getAppMetadata() {
    try {
      const currentManifest = await findManifest(params.id);
      if (!currentManifest) return;

      const obj = {};
      obj.contact = currentManifest.getProperty('provider')[0].id;

      // Expect these to get overwritten by LOC hosted manifest,
      // but supply values as insurance against LOC manifest not loading
      obj.label = currentManifest.getLabel().getValue();
      obj.metadata = filterMetadata(currentManifest.getMetadata());

      // The following metadata items don't exist in LOC manifests
      obj.questions = getQuestions(currentManifest);
      obj.research = getResearch(currentManifest);
      obj.summary = currentManifest.getProperty('summary')['en'][0];
      obj.workUrl = currentManifest.getProperty('homepage')[0].id;

      return obj;
    } catch (e) {
      console.error('Error loading / parsing app level IIIF manifest', e);
      return;
    }
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

      return obj;
    } catch (e) {
      console.error('Error loading / parsing LOC IIIF manifest', e);
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
      <Button
        display={{ base: 'none', lg: 'inline-block' }}
        leftIcon={<FaInfoCircle />}
        onClick={handleToolbarClick}
        size={buttonSize}
        variant="ghost"
        disabled={!metadata}
      >
        Learn More
      </Button>
      <IconButton
        display={{ base: 'flex', lg: 'none' }}
        icon={<FaInfoCircle />}
        onClick={handleToolbarClick}
        disabled={!metadata}
        alignItems="center"
        justifyContent="center"
      />

      <Drawer isOpen={isOpen} placement="right" onClose={handleClose}>
        <DrawerOverlay>
          {currentWork && metadata && (
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader fontSize={['sm', 'md']}>
                {metadata.label || ''}
              </DrawerHeader>

              <DrawerBody>
                <MetadataBody>{metadata.summary || ''}</MetadataBody>

                {metadata.metadata?.map((m, i) => (
                  <div key={i}>
                    <MetadataHeading>
                      {m.getLabel() === 'Contributors' ? 'By' : m.getLabel()}
                    </MetadataHeading>
                    <MetadataBody>{createMarkup(m.getValue())}</MetadataBody>
                  </div>
                ))}

                {metadata.questions && metadata.questions.length > 0 && (
                  <>
                    <MetadataHeading>Questions</MetadataHeading>
                    <MetadataBody>
                      <Wrap direction="column">
                        {metadata.questions?.map((q, i) => (
                          <WrapItem key={i}>{q}</WrapItem>
                        ))}
                      </Wrap>
                    </MetadataBody>
                  </>
                )}

                {metadata.research && metadata.research.length > 0 && (
                  <>
                    <MetadataHeading>Research</MetadataHeading>
                    <MetadataBody>
                      <Wrap direction="column">
                        {metadata.research?.map((url, i) => (
                          <WrapItem key={i}>
                            <Link href={url} isExternal>
                              {url} <ExternalLinkIcon mx="2px" />
                            </Link>
                          </WrapItem>
                        ))}
                      </Wrap>
                    </MetadataBody>
                  </>
                )}

                <MetadataHeading>Ask a Librarian</MetadataHeading>
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

                <MetadataHeading>
                  See item on{' '}
                  <Link href="https://loc.gov" isExternal>
                    loc.gov
                  </Link>
                </MetadataHeading>
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
