import axios from "axios";
import { useEffect, useState } from "react";

interface getMetadataProps {
  chainId: number;
  address: string;
  tokenId: number;
}

const useNFTMetadata = ({ chainId, address, tokenId }: getMetadataProps) => {
  const [tokenName, setTokenName] = useState<string>();
  const [tokenImageURL, setTokenImageURL] = useState<string>();

  const getMetadata = async () => {
    const result = await axios.get(
      `https://api.covalenthq.com/v1/${chainId}/tokens/${address}/nft_metadata/${tokenId}/?key=ckey_b50d19f98bea40628b90af32c9c`
    );
    console.log("result", result);
    setTokenName(result.data.data.items[0].nft_data[0].external_data.name);
    setTokenImageURL(
      result.data.data.items[0].nft_data[0].external_data.image_512
    );
  };
  useEffect(() => {
    getMetadata();
  }, []);

  return {
    tokenName,
    tokenImageURL,
  };
};

export default useNFTMetadata;
