import { useContractRead } from "wagmi";
import { abi } from "./abi";
import { useEffect, useState } from "react";

export const useGetClaimableTokens = (userAddress: `0x${string}`) => {
  const [claimableTokens, setClaimableTokens] = useState<number>(0);
  const [isErrorGetClaimableTokens, setIsErrorGetClaimableTokens] =
    useState(false);
  const [errorGetClaimableTokens, setErrorGetClaimableTokens] =
    useState<string>();

  const { data, isError, error } = useContractRead({
    address: process.env
      .NEXT_PUBLIC_DUTCH_AUCTION_CONTRACT_ADDRESS as `0x${string}`,
    abi: abi,
    functionName: "getClaimableTokens",
    args: [userAddress],
  });

  useEffect(() => {
    if (data) {
      console.log("enter");
      setClaimableTokens(data);
    }
  }, [data]);

  useEffect(() => {
    if (isError) {
      setIsErrorGetClaimableTokens(isError);
      if (error) {
        setErrorGetClaimableTokens(error);
      }
    }
  }, [isError, error]);

  return {
    claimableTokens,
    isErrorGetClaimableTokens,
    errorGetClaimableTokens,
  };
};

export default useGetClaimableTokens;
