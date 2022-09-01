export default function useMint() {
  async function createMint(questData: any) {
    const { signedPayload } = await fetch("/api/create-mint", {
      method: "POST",
      body: JSON.stringify({ questData }),
    }).then((res) => res.json());

    return signedPayload;
  }

  async function mintBadge(questId: number) {
    const { signedPayload } = await fetch("/api/mint-badge", {
      method: "POST",
      body: JSON.stringify({ questId }),
    }).then((res) => res.json());

    return signedPayload;
  }

  return {
    createMint,
    mintBadge,
  };
}
