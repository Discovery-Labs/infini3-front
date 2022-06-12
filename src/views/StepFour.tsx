import { Button, Container } from "@chakra-ui/react";
import BottomNextBtn from "components/views/BottomNextBtn";
import ProgressBar from "components/views/ProgressBar";
import QuestGuide from "components/views/QuestGuide";
import StepBody from "components/views/StepBody";
import useStore, { AdventureEnum } from "core/states";
import { useEffect, useState } from "react";
import { Heading, Link, Text } from "tw-components";

// > Set Guide title and description
const guide = {
  title: "Launch your NFT Collection",
  description: "we copy the mint widget and insert it in our website",
};

const StepFour = () => {
  // Quest progress and success state
  const { setProgress } = useStore();
  const [isCompleted, setIsCompleted] = useState(false);

  // > Set progress on complete
  useEffect(() => {
    if (isCompleted) {
      setProgress(100);
    }
  }, [isCompleted, setProgress]);

  const done = async () => {
    setIsCompleted(true);
  };

  return (
    <>
      <Container my={{ base: 4, md: 8 }} maxW="container.lg">
        <ProgressBar />
        <QuestGuide guide={guide} />
      </Container>

      <Container maxW="container.lg">
        <StepBody>
          {/* > Change and play with your experiments here */}
          <Heading>Mint site</Heading>

          <Text>
            Now we have everything ready let&apos;s create the website to allow
            the user to mint
          </Text>
          <Text textAlign="center">
            Go to the embed tab and copy the embed code. Paste it wherever you
            want. If your website builder offers embed block it should be
            enough. You can also start from a template like in this example.
            Replit works on your browser so you do not need to download
            anything.
          </Text>

          <Link
            isExternal
            color="primary"
            href="https://replit.com/@aeither/Quest-Adventurer-NFT-on-Rinkeby?v=1"
          >
            Open Replit
          </Link>

          <iframe
            src="https://gateway.ipfscdn.io/ipfs/QmfJu3spsSJot6givCK2VjwEgVHymc5RCXHqfG1W5WZyFX/nft-drop.html?contract=0xD157c2Fc0C46FB2b6DB7BBA90c695Ca94FDFbbC5&chainId=4"
            width="600px"
            height="600px"
            frameBorder="0"
          ></iframe>

          <Text textAlign="center">
            Test the mint with our collection on Rinkeby made for this guide. Go
            to your Opensea profile to see the NFT.
          </Text>

          <Link
            isExternal
            color="primary"
            href="https://testnets.opensea.io/account"
          >
            Go to Opensea
          </Link>

          <Button onClick={done}>I have minted!</Button>
        </StepBody>
      </Container>

      <BottomNextBtn
        isCompleted={isCompleted}
        adventureState={AdventureEnum.NextSteps}
      />
    </>
  );
};
export default StepFour;
