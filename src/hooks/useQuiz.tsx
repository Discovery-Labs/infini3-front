import { questions } from "@prisma/client";
import { useEffect, useState } from "react";
import useSWR from "swr";

const fetcher = async (url: string, questId: number) =>
  fetch(url, {
    method: "POST",
    body: JSON.stringify({ questId: questId }),
  }).then((res) => res.json());

export default function useQuiz(questId: number) {
  const [mounted, setMounted] = useState(false);

  const { data, error, mutate } = useSWR(
    mounted ? [`/api/quiz`, questId] : null,
    fetcher
  );
  useEffect(() => {
    if (!questId) {
      return;
    }
    setMounted(true);
  }, [questId]);

  return {
    quiz: data as questions[],
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}
