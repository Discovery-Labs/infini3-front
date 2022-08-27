import {
  Container,
  Divider,
  Flex,
  FormHelperText,
  HStack,
  Radio,
  RadioGroup,
  Select,
  VStack,
} from "@chakra-ui/react";
import { Heading } from "tw-components";

import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";

const Create = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <VStack flex="1" justify="start" align="center">
      <Container my={{ base: 4, md: 8 }} maxW="container.lg">
        <Flex minH={"100vh"} align={"center"} justify={"center"}>
          <Stack w="full" spacing={8} mx={"auto"} maxW={"lg"}>
            <Stack align={"center"}>
              <Heading fontSize={"4xl"} textAlign={"center"}>
                Create Quest
              </Heading>
              <Text fontSize={"lg"} color={"gray.500"}>
                Start your own adventure ✌️
              </Text>
            </Stack>
            <Flex
              w="full"
              direction="column"
              rounded={"lg"}
              bg={useColorModeValue("white", "gray.900")}
              boxShadow={"lg"}
              p={8}
            >
              <Stack pb={4}>
                <Text align={"start"}>
                  <Link color={"red.400"}>Quit</Link>
                </Text>
              </Stack>
              <FormControl id="title" isRequired>
                <FormLabel>Title</FormLabel>
                <Input type="text" />
              </FormControl>
              <FormControl id="description" isRequired>
                <FormLabel>Description</FormLabel>
                <Input type="text" />
              </FormControl>
              <Divider />
              {/* answers + correct answer */}
              <Stack spacing={10} pt={2}>
                <Button
                  loadingText="Submitting"
                  size="lg"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Create
                </Button>
              </Stack>
            </Flex>
          </Stack>
        </Flex>
      </Container>
    </VStack>
  );
};

export default Create;
