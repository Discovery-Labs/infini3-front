import { Box, Flex, HStack, Tag, TagLabel, Text } from "@chakra-ui/react";
import { quests } from "@prisma/client";
import { LinkButton } from "tw-components";

interface Props {
  quest: quests & {
    author: {
      username: string | null;
    };
  };
  children?: React.ReactNode;
}

const QuestCard = ({ quest }: Props) => {
  const { id: questId, title, description, tags, author } = quest;

  return (
    <Flex
      w="full"
      layerStyle="solid-hover2"
      h="sm"
      borderRadius="base"
      align="start"
      justify="space-between"
      direction="column"
    >
      <Flex w="full" direction="column" overflow="hidden">
        <HStack>
          {tags.split(",").map((tag, i) => (
            <Tag key={i} size="md" borderRadius="full" variant="solid">
              <TagLabel>{tag}</TagLabel>
            </Tag>
          ))}
        </HStack>
        <Text pt={2} fontWeight="light" size="text.small" color="gray.400">
          {author.username || "anon"}
        </Text>
        <Text noOfLines={3} pt={2} fontWeight="bold" size="text.medium">
          {title}
        </Text>
        <Text noOfLines={5} color="gray.400">
          {description}
        </Text>
      </Flex>
      <Box w="full">
        <LinkButton
          w="full"
          _hover={{ color: "white" }}
          href={`/quest/${questId}`}
        >
          Play
        </LinkButton>
      </Box>
    </Flex>
  );
};

export default QuestCard;
