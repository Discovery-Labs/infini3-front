import {
  Button,
  Center,
  Container,
  Heading,
  HStack,
  Text,
} from "@chakra-ui/react";
import router from "next/router";
import useSound from "use-sound";
import { MotionBox } from "../components/motion/Box";

const Home = () => {
  const [play] = useSound("/sounds/click.mp3");

  // const { data: balance, refetch } = useBalance({
  //   addressOrName: account?.address,
  // });

  return (
    <>
      <Container my={{ base: 4, md: 8 }} maxW="container.lg">
        <HStack align="center" w="full">
          <Heading color="accent">Adventurers</Heading>
        </HStack>
        <Text textStyle="h2">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dignissimos
          esse rerum doloremque eligendi tenetur reprehenderit consequuntur
          adipisci officia amet quam architecto, commodi deserunt neque debitis
          porro non iusto asperiores molestiae!
        </Text>
        <Text color="text-weak">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dignissimos
          esse rerum doloremque eligendi tenetur reprehenderit consequuntur
          adipisci officia amet quam architecto, commodi deserunt neque debitis
          porro non iusto asperiores molestiae!
        </Text>
        <Center>
          <MotionBox
            animate={{ y: 20 }}
            py="10"
            transition={{
              repeat: Infinity,
              duration: 8,
              repeatType: "reverse",
            }}
            margin="0 auto"
          >
            <Button
              size="lg"
              colorScheme="accent"
              fontFamily="orbitron"
              fontSize="2xl"
              fontWeight="extrabold"
              onClick={() => {
                play();
                router.push("./adventure");
              }}
            >
              Start the Adventure
            </Button>
          </MotionBox>
        </Center>
        {/* 
        <HStack>
          <Text>
            Your Balance: {balance?.value ? hexToString(balance?.value) : "0"}Ξ
          </Text>
          <IconButton
            onClick={() => refetch()}
            aria-label="refresh"
            icon={<RepeatIcon />}
          />
        </HStack> */}
      </Container>
    </>
  );
};

export default Home;
