import { Box, Button, Flex, Text } from "@chakra-ui/react";
import {
  ThirdwebNftMedia,
  useAddress,
  useEdition,
  useMetamask,
  useNetwork,
  useNetworkMismatch,
  useNFT,
} from "@thirdweb-dev/react";
import { DESIRED_CHAIN_ID } from "core/utils/constants";
import useAuthenticate from "hooks/useAuthenticate";
import useMint from "hooks/useCreateMint";
import { useEffect, useState } from "react";
import { Heading } from "tw-components";
import toast, { Toaster } from "react-hot-toast";

const MintBadge = ({
  tokenId,
  questsId,
}: {
  tokenId: number;
  questsId: number;
}) => {
  const isMismatched = useNetworkMismatch();
  const [, switchNetwork] = useNetwork();
  const { mintBadge } = useMint();
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const { login } = useAuthenticate();
  const contractAddress = process.env.NEXT_PUBLIC_EDITION_ADDRESS || "";
  const contract = useEdition(contractAddress);
  const { data: nft, isLoading } = useNFT(contract, tokenId);
  const [isMinted, setIsMinted] = useState(true);
  const [isMinting, setIsMinting] = useState(false);

  useEffect(() => {
    const getNftBalance = async () => {
      if (!address || !contract) return;

      const nftBalance = await contract.balanceOf(address, tokenId);
      if (nftBalance.toNumber() === 0) setIsMinted(false);
    };
    getNftBalance();
  }, [address, contract, tokenId]);

  const mint = async () => {
    setIsMinting(true);

    const toastId = toast.loading("Minting...", {
      position: "top-center",
      style: { backgroundColor: "#171923", color: "white" },
    });
    try {
      if (isMismatched && switchNetwork) {
        switchNetwork(DESIRED_CHAIN_ID);
      }
      await login();

      // Mint NFT Badge
      const signedPayload = await mintBadge(tokenId, questsId);
      if (!contract) return;

      const tx = await contract.signature.mint(signedPayload);

      toast.success(`Success! ${tx.id.toString().slice(0, 6)}...`, {
        id: toastId,
      });
    } catch (err) {
      toast.error("Something went wrong :(", {
        id: toastId,
      });
      console.error(err);
      return null;
    } finally {
      setIsMinting(false);
      setIsMinted(true);
    }
  };

  return (
    <>
      <Flex
        w="full"
        layerStyle="solid-hover2"
        h="sm"
        maxW={"container.sm"}
        borderRadius="base"
        align="start"
        justify="space-between"
        direction="column"
      >
        <Toaster />
        <Flex
          w="full"
          align={"center"}
          direction="column"
          overflow="hidden"
          textAlign="center"
        >
          <Heading>Congrats! 🎉</Heading>
          <Text noOfLines={3} pt={2} fontWeight="bold" size="text.medium">
            {isMinted ? "Badge already claimed" : "Mint your badge."}
          </Text>
          {!isLoading && nft ? (
            <Box py={8} boxSize={"200px"}>
              <ThirdwebNftMedia metadata={nft.metadata} />
            </Box>
          ) : (
            <p>Loading...</p>
          )}
        </Flex>
        <Box w="full">
          {address ? (
            <Button
              disabled={isMinted || isMinting}
              isLoading={isMinting}
              loadingText="Loading"
              w="full"
              onClick={() => mint()}
            >
              {isMinted ? "Minted" : "Mint"}
            </Button>
          ) : (
            <Button w="full" onClick={connectWithMetamask}>
              Connect
            </Button>
          )}
        </Box>
      </Flex>
    </>
  );
};

export default MintBadge;
