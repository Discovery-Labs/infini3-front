import { Flex } from "@chakra-ui/react";
import { Heading, Text } from "tw-components";

interface QuestGuideProps {
  guide: {
    title: string;
    description: string;
  };
}

const QuestGuide = ({ guide }: QuestGuideProps) => {
  return (
    <Flex direction="column" align="center" gap="4">
      <Heading size="title.lg" pt="4">
        {guide.title}
      </Heading>
      <Text size="body.lg" textAlign="center">
        {guide.description}
      </Text>
    </Flex>
  );
};

export default QuestGuide;
