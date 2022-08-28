import {
  Button,
  Container,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Link,
  Stack,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { Heading } from "tw-components";
import useAuthenticate from "../hooks/useAuthenticate";
import useQuest from "../hooks/useQuest";
import { useAddress, useMetamask } from "@thirdweb-dev/react";

const Create = () => {
  const { login, authenticate } = useAuthenticate();
  const { createQuest } = useQuest();
  const address = useAddress();
  const connectWithMetamask = useMetamask();

  const createQuizQuest = async () => {
    if (!address) {
      console.log("Connect Wallet");
      await connectWithMetamask();
      await login();
    }

    const res = await authenticate();
    if (!res.ok) {
      await login();
    }

    //call a function
    createQuest();
  };
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
                  onClick={createQuizQuest}
                  loadingText="Submitting"
                  size="lg"
                  color={"white"}
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
