export default function useCreateMint() {
  async function createMint(questData: any) {
    const { signedPayload } = await fetch("/api/create-mint", {
      method: "POST",
      body: JSON.stringify({ questData }),
    }).then((res) => res.json());

    return signedPayload;
  }

  return {
    createMint,
  };
}
