import { ExternalLinkIcon, RepeatIcon } from "@chakra-ui/icons";
import {
  Button,
  Heading,
  HStack,
  IconButton,
  Text,
  VStack,
  useToast,
  Link,
  Progress,
} from "@chakra-ui/react";
import { useAccount, useBalance, useContractWrite, useNetwork } from "wagmi";
import { MotionBox } from "../components/motion/Box";
import ABIS from "@infini3/hardhat-ts";
import { hexToString } from "../core/utils/helpers";
import { useCallback, useEffect, useState } from "react";
import router from "next/router";

const Home = () => {
  const toast = useToast();
  const { data: account } = useAccount();
  const { activeChain } = useNetwork();
  const [isTxPending, setIsTxPending] = useState(false);
  const { data, writeAsync, isLoading, isSuccess, isError, error } =
    useContractWrite(
      {
        addressOrName: ABIS[4].rinkeby.contracts.NFTee.address,
        contractInterface: ABIS[4].rinkeby.contracts.NFTee.abi,
      },
      "freeMint"
    );
  const { data: balance, refetch } = useBalance({
    addressOrName: account?.address,
  });

  const blockExplorerLink = useCallback(
    (txHash: string, explorer?: string) => {
      const currExplorer =
        activeChain?.id === 1
          ? `https://etherscan.io/tx/`
          : `https://${activeChain?.name}.etherscan.io/tx/`;
      return `${explorer || currExplorer}${txHash}`;
    },
    [activeChain]
  );

  useEffect(() => {
    if (isSuccess && data) {
      toast({
        title: (
          <Link
            href={blockExplorerLink(data.hash)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <HStack w={"full"}>
              <Text size="md">
                View transaction progress <ExternalLinkIcon />
              </Text>
            </HStack>
          </Link>
        ),
        description: (
          <Link
            href={blockExplorerLink(data.hash)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Progress isIndeterminate />
          </Link>
        ),
        status: "info",
        position: "bottom-right",
        variant: "subtle",
        duration: 8000,
        isClosable: true,
        id: data.hash,
      });
    }
  }, [data, isSuccess, toast, blockExplorerLink]);

  useEffect(() => {
    if (isError) {
      toast({
        title: error?.message,
        description: error?.cause,
        status: "error",
        position: "bottom-right",
        duration: 6000,
        isClosable: true,
        variant: "subtle",
      });
    }
  }, [isError, error, toast]);

  const handleAdventurerMint = async () => {
    setIsTxPending(true);
    try {
      const tx = await writeAsync();
      await tx.wait();
      return setIsTxPending(false);
    } catch (error) {
      return setIsTxPending(false);
    }
  };

  return (
    <VStack>
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
      <MotionBox
        animate={{ y: 20 }}
        py="10"
        transition={{ repeat: Infinity, duration: 8, repeatType: "reverse" }}
        margin="0 auto"
      >
        <Button
          size="lg"
          colorScheme="accent"
          fontFamily="orbitron"
          fontSize="2xl"
          fontWeight="extrabold"
          onClick={handleAdventurerMint}
          isLoading={isLoading || isTxPending}
          loadingText={
            isLoading ? "Minting adventurer" : "Transaction pending.."
          }
        >
          Mint adventurer
        </Button>
      </MotionBox>

      <Button onClick={() => router.push("./adventure")}>
        Start the Adventure
      </Button>

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
