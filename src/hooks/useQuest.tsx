export default function useQuest() {
  async function createQuest() {
    const res = await fetch("/api/create-quest", {
      method: "POST",
    });
    return res;
  }

  async function logout() {
    await fetch("/api/logout", {
      method: "POST",
    });
  }

  return {
    createQuest,
    logout,
  };
}
