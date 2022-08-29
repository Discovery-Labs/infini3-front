export default function useCreateQuest() {
  async function createQuest(data: any) {
    const res = await fetch("/api/create-quest", {
      method: "POST",
      body: JSON.stringify(data),
    });
    return res;
  }

  return {
    createQuest,
  };
}
