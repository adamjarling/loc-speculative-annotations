import React from 'react';
import { Flex, Button, ButtonGroup } from '@chakra-ui/react';
import WorksListModal from 'components/WorksListModal';
import MyAnnotations from 'components/MyAnnotations';
import { GrUserManager } from 'react-icons/gr';

function ViewerFooter(props) {
  return (
    <Flex
      as="footer"
      h="6vh"
      justifyContent="space-between"
      alignItems="center"
      px="3"
      boxShadow="base"
      zIndex="1"
    >
      <WorksListModal />

      <ButtonGroup>
        <MyAnnotations />
        <Button leftIcon={<GrUserManager />}>Curator Annotation</Button>
      </ButtonGroup>
    </Flex>
  );
}

export default ViewerFooter;
