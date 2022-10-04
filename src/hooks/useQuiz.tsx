import { questions, quests } from "@prisma/client";
import { useEffect, useState } from "react";
import useSWR from "swr";

export type Quiz = quests & {
  questions: questions[];
};

const fetcher = async (url: string, questId: number) =>
  fetch(url, {
    method: "POST",
    body: JSON.stringify({ questId: questId }),
  }).then((res) => res.json());

export default function useQuiz(questId: number) {
  const [mounted, setMounted] = useState(false);

  const { data, error } = useSWR(
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
    quiz: data as Quiz,
    isLoading: !error && !data,
    isError: error,
  };
}
