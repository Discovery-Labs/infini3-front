import { Button, Text, VStack } from "@chakra-ui/react";
import { step_type } from "@prisma/client";
import useStore from "core/state";
import useQuiz from "hooks/useQuiz";
import type { NextPage } from "next";
import { useRouter } from "next/router";
const Adventure: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { questionIndex, nextQuestion } = useStore();
  const { quiz, isLoading } = useQuiz(Number(id));

  if (isLoading) {
    return (
      <VStack flex="1" justify="center" align={"center"}>
        <Text>loading...</Text>
      </VStack>
    );
  }

  const { type, guide, question, options, answer } = quiz[questionIndex];

  return (
    <VStack flex="1" justify="center">
      {type === step_type.guide && (
        <>
          <Text>Hello question</Text>
          {questionIndex === quiz.length - 1 ? (
            <Button onClick={() => nextQuestion(questionIndex, quiz.length)}>
              Submit
            </Button>
          ) : (
            <Button onClick={() => nextQuestion(questionIndex, quiz.length)}>
              Next
            </Button>
          )}
        </>
      )}
      {type === step_type.question && (
        <>
          <Text>Hello question</Text>
          {questionIndex === quiz.length - 1 ? (
            <Button onClick={() => nextQuestion(questionIndex, quiz.length)}>
              Submit
            </Button>
          ) : (
            <Button onClick={() => nextQuestion(questionIndex, quiz.length)}>
              Next
            </Button>
          )}
        </>
      )}
    </VStack>
  );
};

export default Adventure;
