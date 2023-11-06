import { useContractRead } from "wagmi";
import { abi } from "./abi";
import { useEffect, useState } from "react";

type dataType = {
  contribution: bigint;
  tokensBidded: number;
  tokensBiddedWithDiscount: number;
  refundClaimed: boolean;
};

export const useGetUserData = (userAddress: `0x${string}`) => {
  const [userData, setUserData] = useState<dataType>();

  const contractRead = useContractRead({
    address: process.env
      .NEXT_PUBLIC_DUTCH_AUCTION_CONTRACT_ADDRESS as `0x${string}`,
    abi: abi,
    functionName: "getUserData",
    args: [userAddress],
  });

  useEffect(() => {
    if (contractRead.data) {
      setUserData(contractRead.data);
    }
  }, [contractRead.data]);

  return userData;
};
