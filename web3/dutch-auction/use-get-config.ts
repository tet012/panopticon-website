import { useEffect, useState } from "react";
import { useContractRead } from "wagmi";
import { abi } from "./abi";

interface AuctionConfig {
  startTime: bigint;
  endTime: bigint;
  refundDelayTime: number;
  startAmountInWei: bigint;
  endAmountInWei: string;
}

export const useGetConfig = () => {
  const [config, setConfig] = useState<AuctionConfig>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const contractRead = useContractRead({
    address: process.env
      .NEXT_PUBLIC_DUTCH_AUCTION_CONTRACT_ADDRESS as `0x${string}`,
    abi: abi,
    functionName: "getConfig",
    chainId: Number(process.env.NEXT_PUBLIC_CHAIN_ID || '1')
  });

  useEffect(() => {
    if (contractRead.data) {
      setConfig(contractRead.data as AuctionConfig);
      setLoading(false);
    }

    if (contractRead.error) {
      console.error("Error fetching data:", contractRead.error);
      setError(contractRead.error);
      setLoading(false);
    }
  }, [contractRead.data, contractRead.error]);

  return { config, loading, error };
};
