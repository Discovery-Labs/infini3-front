import { Text, VStack } from "@chakra-ui/react";
import useQuiz from "hooks/useQuiz";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
const Adventure: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const quiz = useQuiz(Number(id));

  if (!id) {
    return (
      <>
        <Text>loading...</Text>
      </>
    );
  }

  return (
    <VStack flex="1" justify="space-between">
      <Text>Hello World</Text>
    </VStack>
  );
};

export default Adventure;
