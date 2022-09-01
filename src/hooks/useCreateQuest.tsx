export default function useCreateQuest() {
  async function createQuest(questData: any) {
    const res = await fetch("/api/create-quest", {
      method: "POST",
      body: JSON.stringify({ questData }),
    });
    return res;
  }

  return {
    createQuest,
  };
}
