import useSWR from "swr";

const fetcher = async (url: string) => fetch(url).then((res) => res.json());

export default function useQuests() {
  const { data, error } = useSWR(`/api/quests`, fetcher);

  return {
    quests: data,
    isLoading: !error && !data,
    isError: error,
  };
}
