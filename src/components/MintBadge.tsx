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
import { Heading } from "tw-components";

const MintBadge = ({ questId }: { questId: number }) => {
  const isMismatched = useNetworkMismatch();
  const [, switchNetwork] = useNetwork();
  const { mintBadge } = useMint();
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const { login } = useAuthenticate();
  const contractAddress = process.env.NEXT_PUBLIC_EDITION_ADDRESS || "";
  const contract = useEdition(contractAddress);
  const { data: nft, isLoading } = useNFT(contract, 6);

  const mint = async () => {
    if (isMismatched && switchNetwork) {
      switchNetwork(DESIRED_CHAIN_ID);
    }

    await login();

    // Mint NFT Badge
    const signedPayload = await mintBadge(questId);

    try {
      if (!contract) return;

      const tx = await contract.signature.mint(signedPayload);
      console.log("🚀 ~ file: MintBadge.tsx ~ line 39 ~ mint ~ tx", tx);
      return tx;
    } catch (err) {
      console.error(err);
      return null;
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
        <Flex
          w="full"
          align={"center"}
          direction="column"
          overflow="hidden"
          textAlign="center"
        >
          <Heading>Congrats! 🎉</Heading>
          <Text noOfLines={3} pt={2} fontWeight="bold" size="text.medium">
            Mint your badge.
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
            <Button w="full" onClick={() => mint()}>
              Mint
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
