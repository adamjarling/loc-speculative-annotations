import React from 'react';
import { Box, Flex, Button, ButtonGroup } from '@chakra-ui/react';
import WorksListModal from 'components/WorksListModal';
import MyAnnotations from 'components/MyAnnotations';
import { GrUserManager } from 'react-icons/gr';
import RemoveObject from 'components/RemoveObject';

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
      <Box>
        <WorksListModal />
        <RemoveObject />
      </Box>

      <ButtonGroup>
        <MyAnnotations />
        <Button leftIcon={<GrUserManager />}>Curator Annotation</Button>
      </ButtonGroup>
    </Flex>
  );
}

export default ViewerFooter;
