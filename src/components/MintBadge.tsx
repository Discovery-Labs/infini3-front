import { Box, Button, Text } from "@chakra-ui/react";
import {
  useAddress,
  useEdition,
  useMetamask,
  useNetwork,
  useNetworkMismatch,
} from "@thirdweb-dev/react";
import { DESIRED_CHAIN_ID } from "core/utils/constants";
import useAuthenticate from "hooks/useAuthenticate";
import useMint from "hooks/useCreateMint";

const MintBadge = ({ questId }: { questId: number }) => {
  const isMismatched = useNetworkMismatch();
  const [, switchNetwork] = useNetwork();
  const contractAddress = process.env.NEXT_PUBLIC_EDITIONDROP_ADDRESS || "";
  const contract = useEdition(contractAddress);
  const { mintBadge } = useMint();
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const { login } = useAuthenticate();

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
      <Box position="relative" height="120px" w="full"></Box>
      <Text> Mint Badge</Text>
      {address ? (
        <Button onClick={() => mint()}>Mint</Button>
      ) : (
        <Button onClick={connectWithMetamask}>Connect</Button>
      )}

      <Box position="relative" height="120px" w="full"></Box>
    </>
  );
};

export default MintBadge;
