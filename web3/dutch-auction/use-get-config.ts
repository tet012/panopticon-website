import { useEffect, useState } from "react";
import { useContractRead } from "wagmi";
import { abi } from "./abi";

interface AuctionConfig {
  startTime: bigint;
  endTime: bigint;
  refundDelayTime: number;
  startAmountInWei: bigint;
  endAmountInWei: bigint;
}

export enum AuctionState {
  LOADING = "LOADING",
  UPCOMING = "UPCOMING",
  RUNNING = "RUNNING",
  COMPLETED = "COMPLETED",
  ERROR = "ERROR"
};

const getAuctionState = (config: any) => {
  if (!config) {
    return AuctionState.LOADING;
  }

  const currentTime = Math.floor(Date.now() / 1000);

  if (currentTime < Number(config.startTime) || !config.endTime) {
    return AuctionState.UPCOMING;
  } else if (currentTime < Number(config.endTime)) {
    return AuctionState.RUNNING;
  } else {
    return AuctionState.COMPLETED;
  }
};

export const useGetConfig = () => {
  const [config, setConfig] = useState<AuctionConfig>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [auctionState, setAuctionState] = useState<AuctionState>(AuctionState.LOADING);

  const contractRead = useContractRead({
    address: process.env
      .NEXT_PUBLIC_DUTCH_AUCTION_CONTRACT_ADDRESS as `0x${string}`,
    abi: abi,
    functionName: "getConfig",
    chainId: Number(process.env.NEXT_PUBLIC_CHAIN_ID || "1"),
  });

  useEffect(() => {
    if (contractRead.data) {
      setConfig(contractRead.data as AuctionConfig);
      setAuctionState(getAuctionState(contractRead.data));
      setLoading(false);
    }

    if (contractRead.error) {
      console.error("Error fetching data:", contractRead.error);
      setError(contractRead.error);
      setAuctionState(AuctionState.ERROR);
      setLoading(false);
    }
  }, [contractRead.data, contractRead.error]);

  return { config, loading, error, auctionState };
};
