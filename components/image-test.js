import styles from "./image-test.module.css";
import {
  Box,
  Center,
  FormControl,
  FormLabel,
  FormHelperText,
  HStack,
  IconButton,
  Image,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";

export default function ImageTest() {
  const [percent, setPercent] = React.useState(50);
  const [rotation, setRotation] = React.useState(0);

  return (
    <VStack spacing="2rem" maxW="100%">
      <Box>
        <HStack spacing="2rem">
          <FormControl>
            <FormLabel>Picture size %</FormLabel>
            <NumberInput
              step={10}
              defaultValue={50}
              min={10}
              max={100}
              onChange={(valueString) => setPercent(valueString)}
              value={percent}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>

          <FormControl>
            <FormLabel>Rotate</FormLabel>
            <HStack spacing="0.5rem">
              <IconButton
                aria-label="Rotate left"
                icon={<ArrowBackIcon />}
                onClick={() => setRotation(rotation - 90)}
              />
              <IconButton
                aria-label="Rotate right"
                icon={<ArrowForwardIcon />}
                onClick={() => setRotation(rotation + 90)}
              />
              <Text>{rotation} &deg;</Text>
            </HStack>
          </FormControl>
        </HStack>
      </Box>

      <Center>
        <Image
          src={`https://tile.loc.gov/image-services/iiif/service:pnp:fsa:8c34000:8c34000:8c34058v/full/pct:${percent}/${rotation}/default.jpg`}
          alt="LOC image"
          className={styles.image}
          d="inline-block"
          fallback={
            <Center>
              <Spinner size="xl" />
            </Center>
          }
        />
      </Center>
    </VStack>
  );
}
