import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Link,
  Progress,
  Spacer,
  Stack,
  Text,
  useToast,
  Image,
  VStack,
} from "@chakra-ui/react";
import ABIS from "@infini3/hardhat-ts";
import { MotionBox } from "components/motion/Box";
import useStore, { AdventureEnum } from "core/states";
import { useCallback, useEffect, useState } from "react";
import useSound from "use-sound";
import { useContractWrite, useNetwork } from "wagmi";

const MintTokenView = () => {
  const [playYay] = useSound("/sounds/yay.mp3");
  const [playClick] = useSound("/sounds/click.mp3");
  const { setProgress, setAdventureState } = useStore();
  const [isCompleted, setIsCompleted] = useState(false);

  const toast = useToast();
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
    if (isCompleted) {
      playYay();
      setProgress(60);
    }
  }, [isCompleted]);

  useEffect(() => {
    if (isSuccess && !isTxPending) {
      setIsCompleted(true);
    }
  }, [isTxPending, isSuccess]);

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
    <>
      <Container maxW="container.lg">
        <Heading pt="4" textAlign="center">
          Buy token
        </Heading>
      </Container>

      <Container maxW="container.lg">
        <Flex w="full" justify="center">
          {isCompleted ? (
            <>
              <Stack layerStyle="solid-card" align="center" spacing={8}>
                <Text>You have successfully minted the token</Text>
              </Stack>
            </>
          ) : (
            <VStack>
              <Image
                src="https://media2.giphy.com/media/TNb10fp1UeVTs7eSbK/giphy.gif?cid=ecf05e47nxodiambgmony06nhi5gd06fyygqwqanhtcq6ytc&rid=giphy.gif&ct=g"
                alt="spinning coin"
                h="300px"
                borderRadius="lg"
              />
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
                  onClick={handleAdventurerMint}
                  isLoading={isLoading || isTxPending}
                  loadingText={
                    isLoading ? "Minting token" : "Transaction pending.."
                  }
                >
                  Buy token
                </Button>
              </MotionBox>
            </VStack>
          )}
        </Flex>
      </Container>

      <Box position="relative" height="120px" w="full">
        <Stack
          w="full"
          bg={isCompleted ? "accent" : ""}
          py={4}
          position="absolute"
          bottom={0}
        >
          <Container maxW="container.lg">
            <Flex
              direction={{ base: "column", md: "row" }}
              justify="space-between"
            >
              {isCompleted ? (
                <Flex>
                  <Text color="primary" fontWeight="bold" pb="4">
                    Excellent!
                  </Text>
                  <Spacer />
                  <Text color="primary" fontWeight="bold" pb="4">
                    +100 xp
                  </Text>
                </Flex>
              ) : (
                <Box></Box>
              )}
              <Button
                w={{ base: "full", md: "md" }}
                disabled={!isCompleted}
                onClick={() => {
                  playClick();
                  setAdventureState(AdventureEnum.stake);
                }}
              >
                Next
              </Button>
            </Flex>
          </Container>
        </Stack>
      </Box>
    </>
  );
};

export default MintTokenView;
