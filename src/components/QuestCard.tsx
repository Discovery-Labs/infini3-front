import { Box, Button, Flex, Tag, TagLabel, Text } from "@chakra-ui/react";
import { Heading, LinkButton } from "tw-components";

interface Props {
  title: string;
  description: string;
  children?: React.ReactNode;
}

const QuestCard = ({ title, description }: Props) => {
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
        <Box>
          <Tag size="md" borderRadius="full" variant="solid">
            <TagLabel>Tag</TagLabel>
          </Tag>
        </Box>
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
          href="/quest/first-quest"
        >
          Play
        </LinkButton>
      </Box>
    </Flex>
  );
};

export default QuestCard;
