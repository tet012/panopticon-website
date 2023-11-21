import axios from "axios";
import { useState, useEffect } from "react";

export const useGetNftHistory = (tokenId: bigint, contractAddress: string) => {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://api.etherscan.io/api`, {
          params: {
            module: "account",
            action: "tokennfttx",
            contractaddress: contractAddress,
            tokenid: tokenId.toString(),
            page: 1,
            offset: 10,
            sort: "asc",
            apiKey: "8BBK9NFV32DQ8KY4MK3MJFZXN577ZVH1CT", // Replace with your Etherscan API key
          },
        });

        // Filter response to include only transactions for the specific tokenId
        const filteredHistory = response.data.result.filter(
          (tx) => tx.tokenID === tokenId.toString()
        );
        console.log(response); // Log the full response

        setHistory(filteredHistory);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    if (tokenId && contractAddress) {
      fetchHistory();
    }
  }, [tokenId, contractAddress]);

  return { history, loading, error };
};
