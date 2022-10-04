import { Text, VStack } from "@chakra-ui/react";
import OverviewCard from "components/OverviewCard";
import QuestionCard from "components/QuestionCard";
import useQuiz from "hooks/useQuiz";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";

const Adventure: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { quiz, isLoading } = useQuiz(Number(id));
  const [isOverview, setIsOverview] = useState(true);

  if (isLoading) {
    return (
      <VStack flex="1" justify="center" align={"center"}>
        <Text>loading...</Text>
      </VStack>
    );
  }

  if (isOverview) {
    return (
      <>{quiz && <OverviewCard quiz={quiz} setIsOverview={setIsOverview} />}</>
    );
  }

  return <>{quiz && <QuestionCard quiz={quiz} />}</>;
};

export default Adventure;
