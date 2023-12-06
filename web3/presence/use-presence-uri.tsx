import { useContractRead } from "wagmi";
import { useState, useEffect } from "react";
import { presenceAbi } from "./presenceAbi";

const usePresenceUri = (tokenId: bigint) => {
  const [tokenData, setTokenData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Define the valid token IDs
  const validTokenIds = new Set([
    1, 7, 8, 10, 11, 12, 15, 17, 19, 20, 21, 22, 23, 24, 25, 26, 32, 33, 34, 35,
    36, 46, 47, 48, 49, 50, 51, 52,
  ]);

  const { data, isError, isLoading } = useContractRead({
    address: "0x4344d811f26322944136e9878109339f405cc223",
    abi: presenceAbi,
    functionName: "tokenURI",
    args: [tokenId],
    enabled: validTokenIds.has(Number(tokenId)), // Enable the hook only for valid token IDs
  });

  useEffect(() => {
    if (!isLoading && !isError && data) {
      const ipfsUrl = data.replace(/^ipfs:\/\/ipfs\//, "https://ipfs.io/ipfs/");
      fetch(ipfsUrl)
        .then((response) => response.json())
        .then((jsonData) => {
          if (jsonData.image) {
            jsonData.image = jsonData.image.replace(
              /^ipfs:\/\/ipfs\//,
              "https://ipfs.io/ipfs/",
            );
          }
          setTokenData(jsonData);
        })
        .catch((fetchError) => {
          setError(fetchError);
        })
        .finally(() => {
          setLoading(false);
        });
    } else if (isError) {
      setLoading(false);
    }
  }, [data, isError, isLoading, tokenId]);

  return { tokenData, loading, error };
};

export default usePresenceUri;
