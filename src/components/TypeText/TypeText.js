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
import { FiType } from 'react-icons/fi';
import {
  useFabricOverlayDispatch,
  useFabricOverlayState,
} from 'context/fabric-overlay-context';
import { fabric } from 'openseadragon-fabricjs-overlay';
import FontFaceObserver from 'fontfaceobserver';
import { FiSettings } from 'react-icons/fi';
import useRandomNumber from 'hooks/use-random-number';
import ToolbarButton from 'components/Toolbar/Button';

// Textbox with padding solution:
// https://github.com/fabricjs/fabric.js/issues/3731

const fonts = ['Staatliches', 'Xanh Mono', 'Yellowtail'];

function TypeText({ isActive }) {
  const { fabricOverlay, viewer } = useFabricOverlayState();
  const [currentFont, setCurrentFont] = React.useState(fonts[0]);
  const { getRandomNumber } = useRandomNumber();
  const dispatch = useFabricOverlayDispatch();

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
    dispatch({ type: 'updateTool', tool: isActive ? '' : 'TYPE' });

    // Create new Textbox instance
    const textbox = new fabric.Textbox('Type something here', {
      left: getRandomNumber(50, 800),
      top: getRandomNumber(30, 800),
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
      <ToolbarButton
        onClick={handleButtonClick}
        icon={<FiType />}
        isActive={isActive}
        label="Type Text"
      />
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

TypeText.propTypes = {
  isActive: PropTypes.bool,
};

export default TypeText;
