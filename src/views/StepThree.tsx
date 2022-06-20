import { Button, Container, Image } from "@chakra-ui/react";
import BottomNextBtn from "components/views/BottomNextBtn";
import ProgressBar from "components/views/ProgressBar";
import QuestGuide from "components/views/QuestGuide";
import StepBody from "components/views/StepBody";
import useStore, { AdventureEnum } from "core/states";
import { useEffect, useState } from "react";
import { Heading, Link, Text } from "tw-components";

// > Set Guide title and description
const guide = {
  title: "Upload the images and deploy the smart contract",
  description:
    "Now that we have our images ready. We are going to use thirdweb pre-made NFT Drop contract to upload the images and create the mint contract",
};

const StepThree = () => {
  // Quest progress and success state
  const { setProgress } = useStore();
  const [isCompleted, setIsCompleted] = useState(false);

  // > Set progress on complete
  useEffect(() => {
    if (isCompleted) {
      setProgress(75);
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
          <Heading>Deploy the smart contract</Heading>

          <Text>
            Let&apos;s create the smart contract. Open your browser and go to
            the Thirdweb dashboard
          </Text>
          <Link
            isExternal
            color="primary"
            href="https://thirdweb.com/dashboard"
          >
            Go to Thirdweb
          </Link>
          <Text>
            Use the pre-built contract NFT drop. Give it a name, symbol,
            description, percentage of the royalties of secondary sales. Select
            Rinkeby Testnet so you can mess around without cost before deploying
            to mainnet.
          </Text>

          <Link isExternal color="primary" href="https://rinkebyfaucet.com/">
            Get some rinkeby eth
          </Link>

          <Heading>Upload the collection</Heading>
          <Text textAlign="center">
            In the NFT Drop contract page, use the Batch Upload button to upload
            all the images. Click the area to select files. Select all the files
            inside images folder where we have the _metadata file and all the
            images.
          </Text>

          <Image
            alt={"Image"}
            fit={"contain"}
            align={"center"}
            w={"100%"}
            h={"100%"}
            maxW="lg"
            maxH="md"
            src={"assets/images/metadata.png"}
            borderRadius="md"
          />

          <Text textAlign="center">
            To add more suspense we can set the mint with delayed reveal. You
            just need to set a preview image and text for the pre-reveal and a
            password that are you should not forget to reveal the NFTs later.
          </Text>

          <Image
            alt={"Image"}
            fit={"contain"}
            align={"center"}
            w={"100%"}
            h={"100%"}
            maxW="lg"
            maxH="md"
            src={"assets/images/reveal.png"}
            borderRadius="md"
          />

          <Text textAlign="center">
            To start the mint we need to set a claim phase. One phase is enough
            if everyone had the same condition. If there are whitelisted wallets
            or it is cheaper for the first ones to mint the multiphase feature
            comes very handy. Once the phases have been configured, we save the
            setting with a transaction by clicking on the button save claim
            phases
          </Text>

          <Image
            alt={"Image"}
            fit={"contain"}
            align={"center"}
            w={"100%"}
            h={"100%"}
            maxW="lg"
            maxH="md"
            src={"assets/images/claimphase.png"}
            borderRadius="md"
          />

          <Button onClick={done}>Ready to mint</Button>
        </StepBody>
      </Container>

      <BottomNextBtn
        isCompleted={isCompleted}
        adventureState={AdventureEnum.StepFour}
      />
    </>
  );
};
export default StepThree;
