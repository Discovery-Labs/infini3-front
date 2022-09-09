import {
  Container,
  Flex,
  Link,
  Stack,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import QuestionsForm from "components/quiz/QuestionsForm";
import { Heading } from "tw-components";
import NextLink from "next/link";

const Create = () => {
  return (
    <VStack flex="1" justify="start" align="center">
      <Container my={{ base: 4, md: 8 }} maxW="container.lg">
        <Flex align={"center"} justify={"center"}>
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
                  <NextLink href="/" passHref>
                    <Link color={"red.400"}>Quit</Link>
                  </NextLink>
                </Text>
              </Stack>
              <QuestionsForm />
            </Flex>
          </Stack>
        </Flex>
      </Container>
    </VStack>
  );
};

export default Create;
