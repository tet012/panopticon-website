import { useContractRead } from "wagmi";
import { useState, useEffect } from "react";
import { foundersAbi } from "./foundersAbi";

const useFoundersUri = (tokenId: bigint) => {
  const [tokenData, setTokenData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { data, isError, isLoading } = useContractRead({
    address: "0x58ec2863c5917aebee09a7ea65f588b47fdb4f93",
    abi: foundersAbi,
    functionName: "tokenURI",
    args: [tokenId],
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

export default useFoundersUri;
