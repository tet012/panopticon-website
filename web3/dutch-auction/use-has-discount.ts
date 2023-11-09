import { useContractRead } from "wagmi";
import { abi } from "./abi";
import { useEffect, useState } from "react";

export const useHasDiscount = (merkleProof: any, userAddress: `0x${string}`) => {
  const [hasDiscount, setHasDiscount] = useState<boolean>(false);

  const { data } = useContractRead({
    address: process.env
      .NEXT_PUBLIC_DUTCH_AUCTION_CONTRACT_ADDRESS as `0x${string}`,
    abi: abi,
    functionName: "hasDiscount",
    args: [merkleProof, userAddress],
    chainId: Number(process.env.NEXT_PUBLIC_CHAIN_ID || "1"),
  });

  useEffect(() => {
    if (data) {
      setHasDiscount(data);
    } else {
      setHasDiscount(false);
    }
  }, [data]);

  return {
    hasDiscount
  };
};

export default useHasDiscount;
