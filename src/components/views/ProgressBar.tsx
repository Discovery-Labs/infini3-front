import { CloseIcon } from "@chakra-ui/icons";
import { HStack, Progress } from "@chakra-ui/react";
import { LinkButton } from "tw-components";

interface ProgressBarProps {
  progress?: number;
  hasStripe?: boolean;
}

const ProgressBar = ({
  progress = 100,
  hasStripe = true,
}: ProgressBarProps) => {
  return (
    <HStack w="full">
      <LinkButton leftIcon={<CloseIcon />} variant="ghost" href="/" />
      <Progress hasStripe={hasStripe} w="full" value={progress} />
    </HStack>
  );
};

export default ProgressBar;
