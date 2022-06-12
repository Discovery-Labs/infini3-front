import { Button, Container, Image } from "@chakra-ui/react";
import BottomNextBtn from "components/views/BottomNextBtn";
import ProgressBar from "components/views/ProgressBar";
import QuestGuide from "components/views/QuestGuide";
import StepBody from "components/views/StepBody";
import useStore, { AdventureEnum } from "core/states";
import { useEffect, useState } from "react";
import { CodeBlock, Heading, Link, Text } from "tw-components";

// > Set Guide title and description
const guide = {
  title: "Generate the collection images",
  description:
    "We are going to use HashLips art engine to generate them. Export your design from figma and And put them inside the layers folder. Install the dependencies and run the generate command",
};

const StepTwo = () => {
  // Quest progress and success state
  const { setProgress } = useStore();
  const [isCompleted, setIsCompleted] = useState(false);

  // > Set progress on complete
  useEffect(() => {
    if (isCompleted) {
      setProgress(40);
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
          <Heading>Hashlips art engine</Heading>

          <Text>Clone the repo or download it directly from github</Text>
          <CodeBlock
            code={
              "git clone https://github.com/HashLips/hashlips_art_engine.git"
            }
            language={"bash"}
          />
          <Link
            isExternal
            color="primary"
            href="https://github.com/HashLips/hashlips_art_engine"
          >
            Open Hashlips Github repo
          </Link>

          <Text>Import the PNG files inside the layers folder</Text>
          <Image
            alt={"Image"}
            fit={"contain"}
            align={"center"}
            w={"100%"}
            h={"100%"}
            maxW="lg"
            maxH="md"
            src={"assets/images/layers.png"}
            borderRadius="md"
          />

          <Text>
            Set the general metadata, the size and the order of the layers
            inside config.js. Install the dependencies and run generate.
          </Text>
          <CodeBlock code={"yarn install && yarn generate"} language={"bash"} />
          <Link
            isExternal
            color="primary"
            href="https://github.com/HashLips/hashlips_art_engine"
          >
            Open Hashlips Github repo
          </Link>

          <Text textAlign="center">
            At this point you should see a new build folder created with two for
            the inside. The image folder where we have the PNGs and the json
            folder for the metadata.
          </Text>

          <Button onClick={done}>I have the images generated</Button>
        </StepBody>
      </Container>

      <BottomNextBtn
        isCompleted={isCompleted}
        adventureState={AdventureEnum.StepThree}
      />
    </>
  );
};
export default StepTwo;
