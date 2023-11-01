import React from "react";
import { useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";
import { abi } from "../contract-abi";

const contractConfig = {
  address: "0x00edbf449d5bf37fb1ea0bfdb1dbee29b9a1aa8a",
  abi,
} as const;

export const useContractInteraction = () => {
  const [totalMinted, setTotalMinted] = React.useState(0);
  const { isConnected } = useAccount();

  const { config: contractWriteConfig } = usePrepareContractWrite({
    ...contractConfig,
    functionName: "testMint",
  });

  const {
    data: mintData,
    write: mint,
    isLoading: isMintLoading,
    isSuccess: isMintStarted,
    error: mintError,
  } = useContractWrite(contractWriteConfig);

  // ... other logic related to contract interaction ...

  return {
    totalMinted,
    isConnected,
    mintData,
    mint,
    isMintLoading,
    isMintStarted,
    mintError,
  };
};
