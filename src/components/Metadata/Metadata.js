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
  Text,
  Tooltip,
  Wrap,
  WrapItem,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { useParams } from 'react-router-dom';
import { locImages } from 'services/loc-images';
import { loadManifest, parseManifest } from 'manifesto.js';
import { m } from 'framer-motion';

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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const params = useParams();
  const [currentWork, setCurrentWork] = React.useState();
  const [manifest, setManifest] = React.useState();
  const iconButtonSize = useBreakpointValue({ base: 'md', md: 'lg' });

  React.useEffect(() => {
    async function getManifestData() {
      const m = await loadManifest(
        'iiif/speculative-annotations-manifest.json'
      );
      const manifests = parseManifest(m).getManifests();
      const currentManifest = manifests.find(manifest => {
        const arr = manifest.id.split(
          'https://speculative-annotations.org/iiif/'
        );
        const id = arr[1].slice(0, arr[1].indexOf('/'));
        return params.id === id;
      });
      console.log(`currentManifest`, currentManifest.getLabel().getValue());

      const obj = {
        contact: currentManifest.getProperty('provider')[0].id,
        label: currentManifest.getLabel().getValue(),
        metadata: currentManifest.getMetadata(),
        summary: currentManifest.getDescription(),
        workUrl: currentManifest.getProperty('homepage')[0].id,
      };

      const collectionManifest = await loadManifest(
        currentManifest.getProperty('partOf')[0].id
      );
      obj.collectionUrl = collectionManifest
        ? parseManifest(collectionManifest).getProperty('homepage')[0].id
        : '';

      setManifest(obj);
    }
    getManifestData();
  }, [params.id]);

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
        />
      </Tooltip>

      <Drawer isOpen={isOpen} placement="right" onClose={handleClose}>
        <DrawerOverlay>
          {currentWork && (
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>{manifest.label || ''}</DrawerHeader>

              <DrawerBody>
                <MetadataBody>{manifest.summary || ''}</MetadataBody>

                {manifest.metadata.map((m, i) => (
                  <div key={i}>
                    <MetadataHeading>{m.getLabel()}</MetadataHeading>
                    <MetadataBody>{m.getValue()}</MetadataBody>
                  </div>
                ))}

                <MetadataHeading>Contact</MetadataHeading>
                <MetadataBody>
                  <Link href={manifest.contact} isExternal>
                    {manifest.contact} <ExternalLinkIcon mx="2px" />
                  </Link>
                </MetadataBody>

                <MetadataBody>
                  <Link href={manifest.collectionUrl} isExternal>
                    View Collection <ExternalLinkIcon mx="2px" />
                  </Link>
                </MetadataBody>

                <MetadataBody>
                  <Link href={manifest.workUrl} isExternal>
                    View Image <ExternalLinkIcon mx="2px" />
                  </Link>
                </MetadataBody>

                {/* <MetadataHeading>Creator</MetadataHeading>
                <MetadataBody>{currentWork.creator}</MetadataBody>

                <MetadataHeading>Date</MetadataHeading>
                <MetadataBody>{currentWork.date}</MetadataBody>

                <MetadataHeading>Questions</MetadataHeading>
                <MetadataBody>
                  <Wrap>
                    {currentWork.questions.map((question, i) => (
                      <WrapItem key={i}>{question}</WrapItem>
                    ))}
                  </Wrap>
                </MetadataBody>

                <MetadataHeading>Contact</MetadataHeading>
                <MetadataBody>
                  <Link href={currentWork.contact} isExternal>
                    {currentWork.contact} <ExternalLinkIcon mx="2px" />
                  </Link>
                </MetadataBody>

                <MetadataBody>
                  <Link href={currentWork.seeCollection} isExternal>
                    View Collection <ExternalLinkIcon mx="2px" />
                  </Link>
                </MetadataBody>

                <MetadataBody>
                  <Link href={currentWork.seeImage} isExternal>
                    View Image <ExternalLinkIcon mx="2px" />
                  </Link>
                </MetadataBody> */}
              </DrawerBody>

              <DrawerFooter>
                <Button variant="outline" onClick={handleClose}>
                  Close
                </Button>
              </DrawerFooter>
            </DrawerContent>
          )}
        </DrawerOverlay>
      </Drawer>
    </>
  );
}

export default Metadata;
