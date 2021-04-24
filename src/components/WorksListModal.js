import React from 'react';
import {
  Box,
  Button,
  Image,
  Link,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { locImages } from 'services/loc-images';
import { useHistory } from 'react-router-dom';

import Slider from 'react-slick';
// Import css files
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

var settings = {
  arrows: true,
  dots: true,
  infinite: false,
  slidesToShow: 4,
  slidesToScroll: 1,
  swipeToSlide: true,
};

function WorksListModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [activeWork, setActiveWork] = React.useState();
  const history = useHistory();

  const handleImageClick = image => {
    setActiveWork(image);
  };

  const handleSelectItem = () => {
    onClose();
    history.push(`/${activeWork.id}`);
  };

  return (
    <Box>
      <Button
        onClick={() => onOpen()}
        leftIcon={<AddIcon />}
        colorScheme="brand.pink"
      >
        New Annotation
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="full"
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Select another item from the Library of Congress
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box px={4}>
              <Slider {...settings}>
                {locImages.map((image, index) => (
                  <Box className="slick-sa-item-wrapper" key={image.id}>
                    <Text
                      pr={2}
                      fontSize="2xl"
                      fontFamily="ocr-a-std"
                      color="brand.pink.300"
                    >
                      {index + 1}
                    </Text>
                    <Link
                      key={image.id}
                      href="#"
                      onClick={() => handleImageClick(image)}
                    >
                      <Image src={image.url} alt={image.alt} />
                    </Link>
                  </Box>
                ))}
              </Slider>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} variant="ghost" mr={3}>
              Cancel
            </Button>
            <Button
              onClick={handleSelectItem}
              disabled={!activeWork}
              colorScheme="brand.pink"
            >
              Annotate
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default WorksListModal;
