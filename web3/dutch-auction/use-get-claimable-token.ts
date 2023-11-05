import { useContractRead } from "wagmi";
import { abi } from "./abi";
import { useEffect, useState } from "react";

const useGetClaimableTokens = (userAddress: `0x${string}`) => {
  const [claimableTokens, setClaimableTokens] = useState<number>();

  const contractRead = useContractRead({
    address: process.env
      .NEXT_PUBLIC_DUTCH_AUCTION_CONTRACT_ADDRESS as `0x${string}`,
    abi: abi,
    functionName: "getClaimableTokens",
    args: [userAddress],
  });

  useEffect(() => {
    if (contractRead.data) {
      setClaimableTokens(contractRead.data);
    }
  }, [contractRead.data]);

  return claimableTokens;
};

export default useGetClaimableTokens;
