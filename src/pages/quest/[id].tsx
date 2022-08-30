import { Text, VStack } from "@chakra-ui/react";
import QuestionCard from "components/QuestionCard";
import useStore from "core/state";
import useQuiz from "hooks/useQuiz";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
const Adventure: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { quiz, isLoading, mutate } = useQuiz(Number(id));
  const { reset } = useStore();

  useEffect(() => {
    mutate([`/api/quiz`, id]);
    reset();
  }, [id]);

  if (isLoading) {
    return (
      <VStack flex="1" justify="center" align={"center"}>
        <Text>loading...</Text>
      </VStack>
    );
  }

  return (
    <VStack flex="1" justify="space-between">
      {quiz && <QuestionCard quiz={quiz} />}
    </VStack>
  );
};

export default Adventure;
