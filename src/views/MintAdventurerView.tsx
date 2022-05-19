// Set the value
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
} from "@chakra-ui/react";
import ABIS from "@infini3/hardhat-ts";
import { MotionBox } from "components/motion/Box";
import useStore, { AdventureEnum } from "core/states";
import { useCallback, useEffect, useState } from "react";
import useSound from "use-sound";
import { useContractWrite, useNetwork } from "wagmi";

const MintAdventurerView = () => {
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
      setProgress(20);
    }
  }, [isCompleted]);

  useEffect(() => {
    if (isSuccess && data) {
      setIsCompleted(true);
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
          Mint your adventurer NFT
        </Heading>
      </Container>

      <Container maxW="container.lg">
        <Flex w="full" justify="center">
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
                isLoading ? "Minting adventurer" : "Transaction pending.."
              }
            >
              Mint adventurer
            </Button>
          </MotionBox>
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
                    Awesome!
                  </Text>
                  <Spacer />
                  <Text color="primary" fontWeight="bold" pb="4">
                    +10 xp
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
                  setAdventureState(AdventureEnum.mintAdventurer);
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

export default MintAdventurerView;
