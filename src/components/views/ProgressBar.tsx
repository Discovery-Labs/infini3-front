import { CloseIcon } from "@chakra-ui/icons";
import { HStack, Progress } from "@chakra-ui/react";
import { LinkButton } from "tw-components";

interface ProgressBarProps {
  progress: number;
  max: number;
  hasStripe?: boolean;
}

const ProgressBar = ({ progress, max, hasStripe = true }: ProgressBarProps) => {
  return (
    <HStack w="full">
      <LinkButton leftIcon={<CloseIcon />} variant="ghost" href="/" />
      {progress === max ? (
        <Progress colorScheme="green" max={max} w="full" value={progress} />
      ) : (
        <Progress
          max={max}
          isAnimated
          hasStripe={hasStripe}
          w="full"
          value={progress}
        />
      )}
    </HStack>
  );
};

export default ProgressBar;
