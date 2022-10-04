import {
  Box,
  Button,
  Container,
  Flex,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { step_type } from "@prisma/client";
import BottomNextBtn from "components/views/BottomNextBtn";
import ProgressBar from "components/views/ProgressBar";
import useStore from "core/state";
import { Quiz } from "hooks/useQuiz";
import { useCallback, useEffect, useState } from "react";
import { Heading } from "tw-components";
import MintBadge from "./MintBadge";
import { NotSuccessModal } from "./Modal/NotSuccessModal";

const QuestionCard = ({ quiz }: { quiz: Quiz }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isFinished, setIsFinished] = useState(false);
  const {
    questionIndex,
    nextQuestion,
    incrementCorrects,
    incrementAnswered,
    corrects,
    totalAnswered,
    reset,
  } = useStore();

  // Reset on new
  useEffect(() => {
    reset();
  }, []);

  const { type, guide, question, options, answer, questsId } =
    quiz.questions[questionIndex];
  const tokenId = quiz.token_id;
  const questionsLengthOriginal = quiz.questions.length;

  const questionsLength = quiz.questions.length - 1;
  const isLast = questionIndex === questionsLength;

  const openModal = useCallback(() => {
    if (isFinished && corrects !== totalAnswered) {
      onOpen();
    }
  }, [totalAnswered, corrects, isFinished, onOpen]);
  useEffect(() => {
    openModal();
  }, [openModal]);

  const resetQuiz = useCallback(() => {
    reset();
    setIsFinished(false);
    onClose();
  }, [onClose, reset]);

  const guideNext = useCallback(() => {
    isLast ? setIsFinished(true) : nextQuestion();
  }, [isLast, nextQuestion]);

  const questionNext = (option?: string) => {
    answer === option ? incrementCorrects() : incrementAnswered();
    isLast ? setIsFinished(true) : nextQuestion();
  };

  if (isFinished && corrects === totalAnswered) {
    return (
      <VStack alignSelf="center" flex="1" justify="center">
        <Container
          my={{ base: 4, md: 8 }}
          maxW="container.lg"
          alignItems="center"
        >
          <MintBadge
            tokenId={tokenId}
            questsId={questsId}
            experiencePoints={corrects * 10}
          />
        </Container>
      </VStack>
    );
  }

  return (
    <VStack flex="1" justify="space-between">
      <Container my={{ base: 4, md: 8 }} maxW="container.lg">
        <ProgressBar
          progress={questionIndex}
          max={questionsLengthOriginal}
          hasStripe={true}
        />
        {/* <QuestGuide guide={guide} /> */}
      </Container>

      <Container maxW="container.lg">
        <NotSuccessModal
          isOpen={isOpen}
          onClose={onClose}
          corrects={corrects}
          totalAnswered={totalAnswered}
          resetQuiz={resetQuiz}
        />
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
    </VStack>
  );
};
export default QuestionCard;
