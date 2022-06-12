import { Flex } from "@chakra-ui/react";

interface StepBodyProps {
  children?: React.ReactNode;
}

const StepBody = ({ children }: StepBodyProps) => {
  return (
    <Flex direction="column" w="full" justify="center" align="center" gap="4">
      {children}
    </Flex>
  );
};

export default StepBody;
