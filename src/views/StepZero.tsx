import { Button, Container, HStack, Image } from "@chakra-ui/react";
import BottomNextBtn from "components/views/BottomNextBtn";
import ProgressBar from "components/views/ProgressBar";
import QuestGuide from "components/views/QuestGuide";
import StepBody from "components/views/StepBody";
import useStore, { AdventureEnum } from "core/states";
import { useEffect, useState } from "react";
import { Text } from "tw-components";

// > Set Guide title and description
const guide = {
  title: "Introduction",
  description: "",
};

const StepOne = () => {
  // Quest progress and success state
  const { setProgress } = useStore();
  const [isCompleted, setIsCompleted] = useState(false);

  // Verify quest completion
  // useEffect(() => {}, []);

  // > Set progress on complete
  useEffect(() => {
    if (isCompleted) {
      setProgress(10);
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
          <Text>
            At the end of this adventure, you are going to have your Generative
            NFT collection deployed with a minting website.
          </Text>
          <Image
            alt={"Hero Image"}
            fit={"contain"}
            align={"center"}
            w={"100%"}
            h={"100%"}
            maxW="lg"
            src={"assets/images/figma-starter.png"}
            borderRadius="md"
          />
          <HStack>
            <Button onClick={done}>I am ready!</Button>
          </HStack>
        </StepBody>
      </Container>

      <BottomNextBtn
        isCompleted={isCompleted}
        adventureState={AdventureEnum.StepOne}
      />
    </>
  );
};
export default StepOne;
