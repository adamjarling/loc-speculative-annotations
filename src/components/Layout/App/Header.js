import React from 'react';
import { Box, Flex, HStack, Link } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import SALogo from 'components/SALogo';
import { Link as RRLink } from 'react-router-dom';
import EyebrowNav from 'components/Layout/EyebrowNav';
import useButtonSize from 'hooks/use-button-size';
import MyAnnotations from 'components/MyAnnotations/MyAnnotations';

function LayoutAppHeader() {
  const history = useHistory();
  const fontSizes = ['xs', 'sm', 'md'];
  const buttonSize = useButtonSize();

  const handleHomeClick = () => {
    history.push('/');
  };

  return (
    <Box as="header">
      <EyebrowNav />
      <Flex
        justifyContent="space-between"
        alignItems="center"
        boxShadow="md"
        zIndex="1"
        px={4}
        fontSize={fontSizes}
      >
        <SALogo />
        <HStack spacing={[4, 6, 10]}>
          <Link as={RRLink} to="/about">
            About
          </Link>
          <Link as={RRLink} to="/about">
            Teach
          </Link>
          <MyAnnotations />

          {/* <Button
            onClick={handleHomeClick}
            leftIcon={<FaPencilAlt />}
            size={buttonSize}
          >
            Annotate
          </Button> */}
        </HStack>
      </Flex>
    </Box>
  );
}

export default LayoutAppHeader;
