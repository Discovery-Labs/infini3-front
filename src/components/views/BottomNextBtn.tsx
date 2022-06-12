import { Box, Container, Flex, Stack } from "@chakra-ui/react";
import useStore, { AdventureEnum } from "core/states";
import { Button, Text } from "tw-components";

interface BottomNextBtnProps {
  isLast?: boolean;
  isCompleted?: boolean;
  adventureState: AdventureEnum;
}

const BottomNextBtn = ({
  isLast = false,
  isCompleted = false,
  adventureState,
}: BottomNextBtnProps) => {
  const { setAdventureState } = useStore();

  const SuccessText = () => {
    const sentences = [
      "Awesome!",
      "Nicely done!",
      "Great!",
      "Amazing!",
      "Nice!",
      "Excellent!",
      "Nice job!",
      "Wagmi",
      "Great job!",
      "LFG!!!",
    ];

    return (
      <>
        {isCompleted ? (
          <Flex>
            <Text size="body.2xl" color="primary" fontWeight="bold" pb="4">
              {sentences[Math.floor(Math.random() * sentences.length)]}
            </Text>
          </Flex>
        ) : (
          <Box></Box>
        )}
      </>
    );
  };

  const NavButton = () => {
    return (
      <>
        {isLast ? (
          <Button
            w="full"
            onClick={() => {
              setAdventureState(AdventureEnum.StepZero);
            }}
          >
            Restart
          </Button>
        ) : (
          <Button
            w={{ base: "full", md: "md" }}
            disabled={!isCompleted}
            onClick={() => {
              setAdventureState(adventureState);
            }}
          >
            Next
          </Button>
        )}
      </>
    );
  };

  return (
    <Box position="relative" height="120px" w="full">
      <Stack
        w="full"
        bg={isCompleted ? "accent" : ""}
        py={4}
        position="absolute"
        bottom={0}
      >
        <Container maxW="container.lg">
          <Flex
            direction={{ base: "column", md: "row" }}
            justify="space-between"
          >
            <SuccessText />
            <NavButton />
          </Flex>
        </Container>
      </Stack>
    </Box>
  );
};

export default BottomNextBtn;
