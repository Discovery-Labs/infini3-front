import { Button, Container, Flex, Text } from "@chakra-ui/react";
import { questions, step_type } from "@prisma/client";
import BottomNextBtn from "components/views/BottomNextBtn";
import ProgressBar from "components/views/ProgressBar";
import useStore from "core/state";
import { Heading } from "tw-components";

interface QuestionCardProps {
  quiz: questions[];
}
const QuestionCard = ({ quiz }: QuestionCardProps) => {
  const { questionIndex, nextQuestion } = useStore();
  const { type, guide, question, options, answer } = quiz[questionIndex];

  const isLast = questionIndex === quiz.length - 1;
  console.log(
    "🚀 ~ file: QuestionCard.tsx ~ line 16 ~ QuestionCard ~ questionIndex",
    questionIndex
  );
  console.log(
    "🚀 ~ file: QuestionCard.tsx ~ line 16 ~ QuestionCard ~ isLast",
    isLast
  );
  const nextOrFinish = () => {
    if (isLast) {
      console.log("finish");
    } else {
      nextQuestion(questionIndex, quiz.length);
    }
  };

  return (
    <>
      <Container my={{ base: 4, md: 8 }} maxW="container.lg">
        <ProgressBar hasStripe={false} />
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
          <Heading size="title.sm" pt="4">
            Explore more projects and quests
          </Heading>
          {type === step_type.guide && (
            <>
              <Text>{guide}</Text>
              <Button onClick={nextOrFinish}>
                {isLast ? "Submit" : "Next"}
              </Button>
            </>
          )}
          {type === step_type.question && (
            <>
              <Text>{question}</Text>
              {options.map((option) => (
                <div key={option}>
                  <Button onClick={() => console.log(option === answer)}>
                    {option}
                  </Button>
                </div>
              ))}
            </>
          )}
        </Flex>
      </Container>

      <BottomNextBtn isLast />
    </>
  );
};
export default QuestionCard;
