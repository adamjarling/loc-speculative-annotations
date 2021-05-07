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
import { useHistory, useParams } from 'react-router-dom';
import { isMobile } from 'react-device-detect';

import Slider from 'react-slick';
// Import css files
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const activeStyle = {
  border: '2px solid',
  borderColor: 'brand.pink.500',
};

function WorksListModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const history = useHistory();
  const params = useParams();
  const sliderRef = React.useRef();
  const [activeWork, setActiveWork] = React.useState(
    locImages.find(image => image.id === params.id)
  );

  const handleImageClick = image => {
    setActiveWork(image);
  };

  const handleSelectItem = () => {
    onClose();
    history.push(`/${activeWork.id}`);
  };

  const settings = {
    centerMode: true,
    dots: true,
    infinite: true,
    initialSlide: locImages.findIndex(image => image.id === params.id),
    slidesToShow: isMobile ? 1 : 4,
    slidesToScroll: 1,
    swipeToSlide: true,
  };

  return (
    <Box>
      <Button
        onClick={() => onOpen()}
        leftIcon={<AddIcon />}
        colorScheme="brand.pink"
      >
        Select from the Collection
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
              <Slider ref={sliderRef} {...settings}>
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
                      {...(activeWork &&
                        activeWork.id === image.id && { ...activeStyle })}
                    >
                      <Image src={image.url} alt={image.alt} />
                    </Link>
                  </Box>
                ))}
              </Slider>
            </Box>
          </ModalBody>

          <ModalFooter>
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
