import { useContractRead } from "wagmi";
import { proxyAbi } from "./proxyAbi";
import { useState, useEffect } from "react";

const useRaeminiscenceUri = (tokenId: bigint) => {
  const [tokenData, setTokenData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { data, isError, isLoading } = useContractRead({
    address: "0x1bd2d13d100ebab54d9222fee0b495e1c63cf68c",
    abi: proxyAbi,
    functionName: "tokenURI",
    args: [tokenId],
  });

  useEffect(() => {
    if (!isLoading && !isError && data) {
      // Fetch JSON data from the returned URL
      fetch(data)
        .then((response) => response.json())
        .then((jsonData) => {
          setTokenData(jsonData);
          setLoading(false);
        })
        .catch((fetchError) => {
          setError(fetchError);
          setLoading(false);
        });
    } else if (isError) {
      setError(null);
      setLoading(false);
    }
  }, [data, isError, isLoading]);

  return { tokenData, loading, error };
};

export default useRaeminiscenceUri;
