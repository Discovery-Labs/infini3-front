import { CloseIcon } from "@chakra-ui/icons";
import { HStack, Progress } from "@chakra-ui/react";
import useStore from "core/states";
import { LinkButton } from "tw-components";

interface ProgressBarProps {
  progress?: number;
  hasStripe?: boolean;
}

const ProgressBar = ({ hasStripe = true }: ProgressBarProps) => {
  const { progress } = useStore();

  return (
    <HStack w="full">
      <LinkButton leftIcon={<CloseIcon />} variant="ghost" href="/" />
      <Progress hasStripe={hasStripe} w="full" value={progress} />
    </HStack>
  );
};

export default ProgressBar;
