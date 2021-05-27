import React from 'react';
import { Button } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import useButtonSize from 'hooks/use-button-size';
import PropTypes from 'prop-types';

function LCStaffAnnotation({ curatorImageSrc }) {
  const buttonSize = useButtonSize();
  if (!curatorImageSrc) return null;

  return (
    <Button
      href={curatorImageSrc}
      target="_blank"
      as="a"
      fontFamily="ocr-a-std"
      rightIcon={<ExternalLinkIcon />}
      size={buttonSize}
      variant="saRust"
    >
      LC Staff Annotations
    </Button>
  );
}

LCStaffAnnotation.propTypes = {
  curatorImageSrc: PropTypes.string,
};

export default LCStaffAnnotation;
