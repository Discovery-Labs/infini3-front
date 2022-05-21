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
import transakSDK from "@transak/transak-sdk";

const Home = () => {
  const [play] = useSound("/sounds/click.mp3");
  // const { data: balance, refetch } = useBalance({
  //   addressOrName: account?.address,
  // });

  const transak = () => {
    const transak = new transakSDK({
      apiKey: "52b93ced-3d40-4244-9bb4-61692ba0cb1c", // Your API Key (Required)
      environment: "STAGING", // STAGING/PRODUCTION (Required)
      defaultCryptoCurrency: "ETH",
      walletAddress: "", // Your customer wallet address
      email: "", // Your customer email address (Optional)
      redirectURL: "",
      hostURL: window.location.origin, // Required field
      widgetHeight: "625px",
      widgetWidth: "500px",
    });

    transak.init();

    // This will trigger when the user closed the widget
    transak.on(transak.EVENTS.TRANSAK_WIDGET_CLOSE, (orderData: any) => {
      console.log({ orderData });
      transak.close();
    });

    // This will trigger when the user marks payment is made.
    transak.on(transak.EVENTS.TRANSAK_ORDER_SUCCESSFUL, (orderData: any) => {
      console.log({ orderData });
      transak.close();
    });
  };

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
        <Button onClick={transak}>Transak</Button>
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
