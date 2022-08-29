import { Text, VStack } from "@chakra-ui/react";
import QuestionCard from "components/QuestionCard";
import useQuiz from "hooks/useQuiz";
import type { NextPage } from "next";
import { useRouter } from "next/router";
const Adventure: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { quiz, isLoading } = useQuiz(Number(id));

  if (isLoading) {
    return (
      <VStack flex="1" justify="center" align={"center"}>
        <Text>loading...</Text>
      </VStack>
    );
  }

  return (
    <VStack flex="1" justify="center">
      {quiz && <QuestionCard quiz={quiz} />}
    </VStack>
  );
};

export default Adventure;
