import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  Button,
  useDisclosure,
  useColorModeValue,
  useBreakpointValue,
  Stack,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { Link as RRLink, useHistory } from 'react-router-dom';
import { useLocation, useParams } from 'react-router-dom';
import useButtonSize from 'hooks/use-button-size';
import MyAnnotations from 'components/MyAnnotations/MyAnnotations';
import { BiPencil } from 'react-icons/bi';

export default function Simple() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const history = useHistory();
  const fontSizes = ['xs', 'sm', 'md'];
  const params = useParams();
  const buttonSize = useButtonSize();
  const location = useLocation();
  const isMobile = useBreakpointValue({ base: true, sm: false });

  const activeStyles = {
    borderBottom: '2px solid',
    borderColor: 'brand.pink.500',
    fontWeight: 'bold',
  };

  function isApp() {
    return ['/about', '/teach'].indexOf(location.pathname) === -1;
  }

  function isCurrentLink(route) {
    return route === location.pathname;
  }

  return (
    <>
      <Box px={4}>
        <Flex
          h={16}
          alignItems={'center'}
          justifyContent={'space-between'}
          fontSize={fontSizes}
        >
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}
            >
              <Link
                as={RRLink}
                to="/about"
                {...(isCurrentLink('/about') && { ...activeStyles })}
              >
                About
              </Link>
              <Link
                as={RRLink}
                to="/teach"
                {...(isCurrentLink('/teach') && { ...activeStyles })}
              >
                Teach
              </Link>
            </HStack>
          </HStack>

          {isApp() && !isMobile && <MyAnnotations />}

          {!isApp() && (
            <Button
              colorScheme="brand.pink"
              leftIcon={<BiPencil />}
              onClick={() => history.push('/')}
              disabled={params.id}
              size={buttonSize}
              data-testid="app-link"
            >
              Annotate
            </Button>
          )}
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              <Link
                as={RRLink}
                to="/about"
                {...(isCurrentLink('/about') && { ...activeStyles })}
              >
                About
              </Link>
              <Link
                as={RRLink}
                to="/teach"
                {...(isCurrentLink('/teach') && { ...activeStyles })}
              >
                Teach
              </Link>
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
