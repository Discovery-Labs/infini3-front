import { users } from "@prisma/client";
import useSWR from "swr";

const fetcher = async (url: string) => fetch(url).then((res) => res.json());

export default function useProfile() {
  const { data, error, mutate } = useSWR(`/api/profile`, fetcher);

  async function editProfile(data: any) {
    const res = await fetch("/api/edit-profile", {
      method: "POST",
      body: JSON.stringify(data),
    });
    return res;
  }

  return {
    user: data as users,
    isLoading: !error && !data,
    isError: error,
    mutate,
    editProfile,
  };
}
