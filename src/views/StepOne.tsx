import { Button, Container, HStack, Image } from "@chakra-ui/react";
import BottomNextBtn from "components/views/BottomNextBtn";
import ProgressBar from "components/views/ProgressBar";
import QuestGuide from "components/views/QuestGuide";
import StepBody from "components/views/StepBody";
import useStore, { AdventureEnum } from "core/states";
import { useEffect, useState } from "react";
import { Link } from "tw-components";

// > Set Guide title and description
const guide = {
  title: "Prepare your art",
  description: "Duplicate the starter, change it with your own design",
};

const StepOne = () => {
  // Quest progress and success state
  const { setProgress } = useStore();
  const [isCompleted, setIsCompleted] = useState(false);

  // > Set progress on complete
  useEffect(() => {
    if (isCompleted) {
      setProgress(20);
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
          <Image
            alt={"Image"}
            fit={"contain"}
            align={"center"}
            w={"100%"}
            h={"100%"}
            maxW="lg"
            src={"assets/images/figma-starter.png"}
            borderRadius="md"
          />
          <HStack>
            <Link
              isExternal
              color="primary"
              href="https://www.figma.com/community/file/1117742763202404226"
            >
              Duplicate Generative NFT starter
            </Link>
            <Button onClick={done}>Done</Button>
          </HStack>
        </StepBody>
      </Container>

      <BottomNextBtn
        isCompleted={isCompleted}
        adventureState={AdventureEnum.StepTwo}
      />
    </>
  );
};
export default StepOne;
