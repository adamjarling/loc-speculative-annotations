import React from 'react';
import { Box, Button, Flex, HStack, useColorModeValue } from '@chakra-ui/react';
import WorksListModal from 'components/WorksListModal';
import ShowHideAnnotations from 'components/ShowHideAnnotations';
import { isBrowser, isTablet } from 'react-device-detect';
import Metadata from 'components/Metadata/Metadata';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import LCStaffAnnotation from 'components/LCStaffAnnotation';
import useLocImages from 'hooks/use-loc-images';
import { useParams } from 'react-router-dom';

function LayoutAppFooter() {
  const bgColor = useColorModeValue('gray.200', 'gray.600');
  const params = useParams();
  const { findImage } = useLocImages();
  const locImageObj = findImage(params.id);
  const hasCuratorImage = locImageObj?.curatorImageSrc;

  return (
    <Flex
      as="footer"
      bgColor={bgColor}
      justifyContent={hasCuratorImage ? 'space-between' : 'flex-end'}
      alignItems={isTablet ? 'flex-end' : 'center'}
      px={isBrowser || isTablet ? '12px' : '2px'}
      py={`12px`}
      zIndex="1"
    >
      {hasCuratorImage && (
        <LCStaffAnnotation curatorImageSrc={locImageObj?.curatorImageSrc} />
      )}
      <HStack>
        <Metadata />
        <WorksListModal />
      </HStack>
    </Flex>
  );
}

export default LayoutAppFooter;
