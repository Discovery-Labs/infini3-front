import { Text, VStack } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
const Adventure: NextPage = () => {
  const router = useRouter();
  const questId = router.query.slug;

  return (
    <VStack flex="1" justify="space-between">
      <Text>Hello World</Text>
    </VStack>
  );
};

export default Adventure;
