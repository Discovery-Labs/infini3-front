import { Container, Flex } from "@chakra-ui/react";
import BottomNextBtn from "components/views/BottomNextBtn";
import ProgressBar from "components/views/ProgressBar";
import QuestGuide from "components/views/QuestGuide";
import { AdventureEnum } from "core/states";
import { Heading, Link } from "tw-components";

const guide = {
  title: "You completed the quest 🥳",
  description: "What are the next steps I can take?",
};

const NextSteps = () => {
  return (
    <>
      <Container my={{ base: 4, md: 8 }} maxW="container.lg">
        <ProgressBar hasStripe={false} />
        <QuestGuide guide={guide} />
      </Container>

      <Container maxW="container.lg">
        <Flex
          direction="column"
          w="full"
          justify="center"
          align="center"
          gap="4"
        >
          <Heading size="title.sm" pt="4">
            Explore more projects and quests
          </Heading>
          <Link isExternal color="primary" href="https://alpha.dcompass.xyz/">
            Go to Alpha
          </Link>
          <Heading size="title.sm" pt="4">
            Connect with us
          </Heading>
          <Link isExternal color="primary" href="https://discord.gg/UPRRAJahDa">
            Join Discord
          </Link>
        </Flex>
      </Container>

      <BottomNextBtn isLast adventureState={AdventureEnum.NextSteps} />
    </>
  );
};
export default NextSteps;
