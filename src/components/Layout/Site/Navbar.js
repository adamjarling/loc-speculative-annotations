import React from 'react';
import {
  Box,
  Button,
  Flex,
  HStack,
  Link,
  IconButton,
  useDisclosure,
  useBreakpointValue,
  Stack,
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import { BsThreeDots } from 'react-icons/bs';
import {
  Link as RRLink,
  useHistory,
  useLocation,
  useParams,
} from 'react-router-dom';
import useButtonSize from 'hooks/use-button-size';
import MyAnnotations from 'components/MyAnnotations/MyAnnotations';
import { BiPencil } from 'react-icons/bi';
import ClearCanvas from 'components/ClearCanvas';
import UndoRedo from 'components/UndoRedo/UndoRedo';
import Download from 'components/Download';
import useFabricHelpers from 'hooks/use-fabric-helpers';
import { useFabricOverlayState } from 'context/fabric-overlay-context';
import ChangeWorkWarning from 'components/ChangeWorkWarning';

export default function Simple() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const history = useHistory();
  const fontSizes = ['xs', 'sm', 'md'];
  const params = useParams();
  const buttonSize = useButtonSize();
  const location = useLocation();
  const isDesktop = useBreakpointValue({ base: false, lg: true });
  const { getUserObjects } = useFabricHelpers();
  const { activeUserCanvas, userCanvases } = useFabricOverlayState();
  const [isChangeWorkWarningVisible, setIsChangeWorkWarningVisible] =
    React.useState();
  const [futureRoute, setFutureRoute] = React.useState();

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

  const handleNavClick = route => {
    if (['/about', '/teach'].indexOf(location.pathname) > -1) {
      return history.push(route);
    }

    // Save route where user may be heading
    setFutureRoute(route);

    const objects = getUserObjects();

    // User is on an un-saved user canvas with no annotations
    if (objects.length > 0 && !activeUserCanvas) {
      setIsChangeWorkWarningVisible(true);
      return;
    }
    // User is on a saved user canvas, with additional annotations
    if (
      activeUserCanvas &&
      userCanvases[activeUserCanvas].fabricCanvas.objects.length !==
        objects.length
    ) {
      setIsChangeWorkWarningVisible(true);
      return;
    }
    history.push(route);
  };

  const handleChangeWorkWarningCancel = () => {
    setIsChangeWorkWarningVisible(false);
    // Go to route
    history.push(futureRoute);
    setFutureRoute(null);
  };

  const handleChangeWorkWarningSave = () => {
    setIsChangeWorkWarningVisible(false);
    document.getElementById('save-my-annotations').click();
    setFutureRoute(null);
  };

  return (
    <>
      <ChangeWorkWarning
        isVisible={isChangeWorkWarningVisible}
        handleCancel={handleChangeWorkWarningCancel}
        handleSave={handleChangeWorkWarningSave}
      />
      <Box px={4}>
        <Flex
          h={16}
          alignItems={'center'}
          justifyContent={'space-between'}
          fontSize={fontSizes}
        >
          <HStack spacing={8} alignItems={'center'}>
            <HStack as={'nav'} spacing={4} display="flex">
              <Button
                variant="link"
                onClick={() => handleNavClick('/about')}
                {...(isCurrentLink('/about') && { ...activeStyles })}
              >
                About
              </Button>
              <Button
                variant="link"
                onClick={() => handleNavClick('/teach')}
                {...(isCurrentLink('/teach') && { ...activeStyles })}
              >
                Teach
              </Button>
              {/* <Link
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
              </Link> */}
            </HStack>
          </HStack>

          <Box>
            {isApp() && isDesktop && <MyAnnotations />}

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
          </Box>

          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <BsThreeDots />}
            aria-label={'Open Menu'}
            display={{ base: 'flex', md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4} direction="row" align="center">
              <ClearCanvas />
              <UndoRedo />
              <Download />
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
