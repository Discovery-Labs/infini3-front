import { SimpleGrid, Skeleton } from "@chakra-ui/react";
import useQuests from "hooks/useQuests";
import QuestCard from "./QuestCard";

const GridOfCards = () => {
  const { quests, isLoading } = useQuests();

  if (isLoading) {
    return (
      <SimpleGrid py={8} columns={[2, null, 3]} spacing="40px">
        <Skeleton height="sm" fadeDuration={1}></Skeleton>
        <Skeleton height="sm" fadeDuration={1}></Skeleton>
        <Skeleton height="sm" fadeDuration={1}></Skeleton>
      </SimpleGrid>
    );
  }

  return (
    <SimpleGrid py={8} columns={[2, null, 3]} spacing="40px">
      {quests &&
        quests.map((quest: any) => <QuestCard quest={quest} key={quest.id} />)}
    </SimpleGrid>
  );
};

export default GridOfCards;
