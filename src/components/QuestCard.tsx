import { Box, Flex, HStack, Tag, TagLabel, Text } from "@chakra-ui/react";
import { quests } from "@prisma/client";
import { ThirdwebNftMedia, useEdition, useNFT } from "@thirdweb-dev/react";
import { LinkButton } from "tw-components";

interface Props {
  quest: quests & {
    author?: {
      username: string | null;
    };
  };
  children?: React.ReactNode;
}

const QuestCard = ({ quest }: Props) => {
  const { id: questId, title, description, tags, author, token_id } = quest;
  const contractAddress = process.env.NEXT_PUBLIC_EDITION_ADDRESS || "";
  const contract = useEdition(contractAddress);
  const { data: nft, isLoading } = useNFT(contract, token_id);

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
          {author?.username || ""}
        </Text>
        <Flex
          w="full"
          align={"center"}
          direction="column"
          overflow="hidden"
          textAlign="center"
        >
          {!isLoading && nft ? (
            <Box boxSize={"200px"} alignContent="center" textAlign="center">
              <ThirdwebNftMedia metadata={nft.metadata} />
            </Box>
          ) : (
            <p>Loading NFT...</p>
          )}
        </Flex>
        <Text noOfLines={1} pt={2} fontWeight="bold" size="text.medium">
          {title}
        </Text>
        <Text noOfLines={1} color="gray.400">
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
