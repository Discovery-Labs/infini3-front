import { Text, VStack } from "@chakra-ui/react";
import QuestionCard from "components/QuestionCard";
import useQuiz from "hooks/useQuiz";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button, Heading } from "tw-components";
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
      <VStack flex="1" justify="center" align={"center"} spacing={8}>
        <Heading>{quiz.title}</Heading>
        <Text>{quiz.description}</Text>
        <Button onClick={() => setIsOverview(false)}>Start</Button>
      </VStack>
    );
  }

  return <>{quiz && <QuestionCard quiz={quiz} />}</>;
};

export default Adventure;
