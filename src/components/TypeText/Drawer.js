import React from 'react';
import { fabric } from 'openseadragon-fabricjs-overlay';
import {
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Radio,
  RadioGroup,
  Stack,
  Text,
  Textarea,
  useDisclosure,
} from '@chakra-ui/react';
import {
  useFabricOverlayDispatch,
  useFabricOverlayState,
} from 'context/fabric-overlay-context';
import { FiType } from 'react-icons/fi';
import ToolbarButton from 'components/Toolbar/Button';
import useRandomNumber from 'hooks/use-random-number';
import faker from 'faker';
import FontFaceObserver from 'fontfaceobserver';

const fonts = [
  { id: 'staatliches', name: 'Staatliches', sampleText: faker.lorem.words() },
  { id: 'xanhMono', name: 'Xanh Mono', sampleText: faker.lorem.words() },
  { id: 'yellowtail', name: 'Yellowtail', sampleText: faker.lorem.words() },
];

function TypeTextDrawer({ isActive }) {
  const [textValue, setTextValue] = React.useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { fabricOverlay } = useFabricOverlayState();
  const dispatch = useFabricOverlayDispatch();
  const [currentFont, setCurrentFont] = React.useState(fonts[0].id);
  const { getRandomNumber } = useRandomNumber();

  const handleAddText = () => {
    // Create new Textbox instance
    const textbox = new fabric.Textbox(textValue, {
      left: getRandomNumber(50, 800),
      top: getRandomNumber(30, 800),
      //width: 400,
      editingBorderColor: 'green',
      fontFamily: currentFont,
      fontSize: 50,
    });

    fabricOverlay.fabricCanvas().add(textbox);
    setTextValue('');
    onClose();
  };

  const handleClose = () => {
    setTextValue('');
    onClose();
  };

  const handleFontChange = font => {
    setCurrentFont(font);
    // loadAndUse(font);
  };

  const handleTextChange = e => {
    setTextValue(e.target.value);
  };

  const handleToolbarButtonClick = () => {
    dispatch({ type: 'updateTool', tool: isActive ? '' : 'TYPE' });
    onOpen();
  };

  // TODO: We'll need this if adjusting the font or size of a selected textarea item
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

  return (
    <>
      <ToolbarButton
        onClick={handleToolbarButtonClick}
        icon={<FiType />}
        isActive={isActive}
        label="Type text"
      />
      <Drawer isOpen={isOpen} placement="right" onClose={handleClose}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Type something</DrawerHeader>

            <DrawerBody>
              <Textarea
                value={textValue}
                onChange={handleTextChange}
                placeholder="Type something"
              />
              <RadioGroup
                onChange={handleFontChange}
                value={currentFont}
                mt={6}
              >
                <Stack direction="column" spacing="4">
                  {fonts.map(font => (
                    <Radio key={font.id} value={font.id}>
                      <Text fontSize="xl" fontFamily={font.id}>
                        {font.sampleText}
                      </Text>
                    </Radio>
                  ))}
                </Stack>
              </RadioGroup>

              <Divider my={6} />
              <Text fontSize="sm" color="grey">
                Could maybe extend options here to select font color, size,
                background color, etc.?
              </Text>
            </DrawerBody>

            <DrawerFooter>
              <Button variant="outline" mr={3} onClick={handleClose}>
                Cancel
              </Button>
              <Button onClick={handleAddText}>Add to canvas</Button>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
}

export default TypeTextDrawer;
