import { Box, Button, Container, Flex, Text } from "@chakra-ui/react";
import { questions, step_type } from "@prisma/client";
import BottomNextBtn from "components/views/BottomNextBtn";
import ProgressBar from "components/views/ProgressBar";
import useStore from "core/state";
import { useCallback } from "react";
import { Heading } from "tw-components";

interface QuestionCardProps {
  quiz: questions[];
}
const QuestionCard = ({ quiz }: QuestionCardProps) => {
  const { questionIndex, nextQuestion, incrementCorrect } = useStore();
  const { type, guide, question, options, answer } = quiz[questionIndex];

  const questionsLength = quiz.length - 1;
  const isLast = questionIndex === questionsLength;

  const guideNext = useCallback(() => {
    console.log("guideNext", guideNext);
    if (isLast) {
      openResult();
    } else {
      nextQuestion();
    }
  }, [isLast, nextQuestion]);

  const questionNext = (option?: string) => {
    if (isLast) {
      openResult();
      return;
    }

    if (answer === option) {
      incrementCorrect();
      nextQuestion();
    } else {
      nextQuestion();
    }
  };

  const openResult = () => {
    console.log("open result");
  };

  return (
    <>
      <Container my={{ base: 4, md: 8 }} maxW="container.lg">
        <ProgressBar
          progress={questionIndex}
          max={questionsLength}
          hasStripe={true}
        />
        {/* <QuestGuide guide={guide} /> */}
      </Container>

      <Container maxW="container.lg">
        <Flex
          direction="column"
          w="full"
          justify="center"
          align="center"
          gap="4"
        >
          {type === step_type.guide && (
            <>
              <Heading size="title.sm" pt="4">
                {guide}
              </Heading>
            </>
          )}

          {type === step_type.question && (
            <>
              <Heading size="title.sm" pt="4">
                {question}
              </Heading>
              {options.map((option) => (
                <Button
                  w="full"
                  key={option}
                  onClick={() => questionNext(option)}
                >
                  {option}
                </Button>
              ))}
            </>
          )}
        </Flex>
      </Container>

      {type === step_type.guide ? (
        <BottomNextBtn guideNext={guideNext} isLast={isLast} />
      ) : (
        <Box position="relative" height="120px" w="full"></Box>
      )}
    </>
  );
};
export default QuestionCard;
