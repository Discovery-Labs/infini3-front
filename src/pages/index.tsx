import {
  Box,
  chakra,
  Container,
  Flex,
  Image,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";
import GridOfCards from "components/GridOfQuestCards";
import { isValidMotionProp, motion } from "framer-motion";
import { FaRocket } from "react-icons/fa";
import { Heading, LinkButton } from "tw-components";

const ChakraBox = chakra(motion.div, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || prop === "children",
});

const Home = () => {
  FaRocket;
  return (
    <VStack flex="1" justify="start" align="center">
      <Container my={{ base: 4, md: 8 }} maxW="container.lg">
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 6, md: 8 }}>
          <Flex
            flexDir="column"
            gap={{ base: 6, md: 8 }}
            align={{ base: "center", md: "start" }}
          >
            <Heading
              as="h2"
              size="display.md"
              textAlign={{ base: "center", md: "left" }}
            >
              Start your <Box layerStyle="gradient-text">Web3</Box> Adventure
            </Heading>
            <Heading
              as="h3"
              size="subtitle.md"
              textAlign={{ base: "center", md: "left" }}
            >
              Learn by completing quest.
            </Heading>
          </Flex>
          <Flex justifyContent="flex-end">
            <Image
              alt={"Hero Image"}
              fit={"contain"}
              align={"center"}
              w={"100%"}
              h={"100%"}
              src={"assets/images/herocards.png"}
            />
          </Flex>
        </SimpleGrid>
      </Container>
      <Container maxW="container.lg">
        <Flex justify="center">
          <ChakraBox
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ transition: "0.1", ease: "easeOut" }}
          >
            <LinkButton
              _hover={{ color: "white" }}
              leftIcon={<FaRocket />}
              href="/create"
              layerStyle="gradient-bg"
            >
              Create Quest!
            </LinkButton>
          </ChakraBox>
        </Flex>
      </Container>
      <Container maxW="container.lg">
        <GridOfCards />
      </Container>
    </VStack>
  );
};

export default Home;
