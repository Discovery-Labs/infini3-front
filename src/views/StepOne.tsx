import { Container, Flex, Stack } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import BottomNextBtn from "components/views/BottomNextBtn";
import ProgressBar from "components/views/ProgressBar";
import QuestGuide from "components/views/QuestGuide";
import useStore, { AdventureEnum } from "core/states";
import { useEffect, useState } from "react";
import { Text } from "tw-components";
import { useConnect } from "wagmi";

const guide = {
  title: "First quest!!!",
  description: "Welcome, prepare yourself for your first quest!",
};

const StepOne = () => {
  const { setProgress, progress } = useStore();
  const { activeConnector } = useConnect();
  const [isCompleted, setIsCompleted] = useState(false);

  // Verify quest completion
  useEffect(() => {
    setIsCompleted(activeConnector ? true : false);
  }, [activeConnector]);

  // Set progress on complete
  useEffect(() => {
    if (isCompleted) {
      setProgress(50);
    }
  }, [isCompleted, setProgress]);

  return (
    <>
      <Container my={{ base: 4, md: 8 }} maxW="container.lg">
        <ProgressBar progress={progress} />
        <QuestGuide guide={guide} />
      </Container>

      {/* Change and play with your experiments Here */}
      <Container maxW="container.lg">
        <Flex w="full" justify="center">
          {activeConnector ? (
            <Stack layerStyle="solid-card" align="center" spacing={8}>
              <Text>Connected to {activeConnector.name}</Text>
            </Stack>
          ) : (
            <Stack layerStyle="solid-card" align="center" spacing={8}>
              <Text>Connect your wallet</Text>
              <ConnectButton />
            </Stack>
          )}
        </Flex>
      </Container>

      <BottomNextBtn
        isCompleted={isCompleted}
        adventureState={AdventureEnum.NextSteps}
      />
    </>
  );
};
export default StepOne;
