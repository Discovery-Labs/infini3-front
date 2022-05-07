import { RepeatIcon } from "@chakra-ui/icons";
import { Heading, HStack, IconButton, Text, VStack } from "@chakra-ui/react";
import { useAccount, useBalance } from "wagmi";

import { hexToString } from "../core/utils/helpers";

const Home = () => {
  const { data: account } = useAccount();
  const { data: balance, refetch } = useBalance({
    addressOrName: account?.address,
  });

  return (
    <VStack>
      <HStack align="center" w="full">
        <Heading color="accent">Sponsors</Heading>
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
      <HStack>
        <Text>
          Your Balance: {balance?.value ? hexToString(balance?.value) : "0"}Ξ
        </Text>
        <IconButton
          onClick={() => refetch()}
          aria-label="refresh"
          icon={<RepeatIcon />}
        />
      </HStack>
    </VStack>
  );
};

export default Home;
