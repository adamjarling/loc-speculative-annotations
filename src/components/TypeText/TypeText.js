import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@chakra-ui/react';
import { CgFormatText } from 'react-icons/cg';
import { useFabricOverlayState } from 'context/fabric-overlay-context';
import { fabric } from 'openseadragon-fabricjs-overlay';

function TypeText(props) {
  const { fabricOverlay, viewer } = useFabricOverlayState();

  const handleButtonClick = e => {
    const textbox = new fabric.IText('Type something here', {
      left: 50,
      top: 50,
      width: 400,
      backgroundColor: 'white',
      fontSize: 50,
    });

    fabricOverlay.fabricCanvas().add(textbox);
  };

  return (
    <div>
      <Button onClick={handleButtonClick} leftIcon={<CgFormatText />}>
        Type
      </Button>
    </div>
  );
}

TypeText.propTypes = {};

export default TypeText;
