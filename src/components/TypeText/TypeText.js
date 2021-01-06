import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { CgFormatText } from 'react-icons/cg';
import { useFabricOverlayState } from 'context/fabric-overlay-context';
import { fabric } from 'openseadragon-fabricjs-overlay';
import FontFaceObserver from 'fontfaceobserver';
import { FiSettings } from 'react-icons/fi';

// Textbox with padding solution:
// https://github.com/fabricjs/fabric.js/issues/3731

const fonts = ['Staatliches', 'Xanh Mono', 'Yellowtail'];

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function TypeText(props) {
  const { fabricOverlay, viewer } = useFabricOverlayState();
  const [currentFont, setCurrentFont] = React.useState(fonts[0]);

  const loadAndUse = font => {
    const canvas = fabricOverlay.fabricCanvas();
    const activeObject = canvas.getActiveObject();

    if (!activeObject) {
      return;
    }

    var myfont = new FontFaceObserver(font);
    myfont
      .load()
      .then(function () {
        // when font is loaded, use it.
        canvas.getActiveObject().set('fontFamily', font);
        canvas.requestRenderAll();
      })
      .catch(function (e) {
        console.error(e);
      });
  };

  const handleButtonClick = e => {
    const textbox = new fabric.Textbox('Type something here', {
      left: getRandomInt(50, 800),
      top: getRandomInt(30, 800),
      width: 400,
      backgroundColor: 'white',
      editingBorderColor: 'green',
      fontFamily: currentFont,
      fontSize: 50,
    });

    fabricOverlay.fabricCanvas().add(textbox);
  };

  const handleFontChange = font => {
    setCurrentFont(font);
    loadAndUse(font);
  };

  return (
    <div>
      <Button onClick={handleButtonClick} leftIcon={<CgFormatText />}>
        Type
      </Button>
      <Menu>
        <MenuButton as={Button}>
          <FiSettings />
        </MenuButton>
        <MenuList>
          <MenuOptionGroup
            defaultValue={fonts[0]}
            title="Font Choice"
            type="radio"
            onChange={handleFontChange}
          >
            <MenuItemOption value="Staatliches" fontFamily="staatliches">
              Staatliches
            </MenuItemOption>
            <MenuItemOption value="Xanh Mono" fontFamily="xanhMono">
              Xanh Mono
            </MenuItemOption>
            <MenuItemOption value="Yellowtail" fontFamily="yellowtail">
              Yellowtail
            </MenuItemOption>
          </MenuOptionGroup>
        </MenuList>
      </Menu>
    </div>
  );
}

TypeText.propTypes = {};

export default TypeText;
