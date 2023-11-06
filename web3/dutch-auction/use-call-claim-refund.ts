import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { abi } from "./abi";

const useCallClaimRefund = () => {
  const prepareContractWrite = usePrepareContractWrite({
    address: process.env
      .NEXT_PUBLIC_DUTCH_AUCTION_CONTRACT_ADDRESS as `0x${string}`,
    abi: abi,
    functionName: "claimRefund",
  });

  const { data, error, write } = useContractWrite(prepareContractWrite.config);

  const writeClaimRefund = () => write?.();

  const hashCallClaimRefund = data?.hash;

  const getError = () => {
    if (prepareContractWrite.error) {
      return prepareContractWrite.error.message;
    }
    if (error) {
      return error.message;
    }
    return "";
  };

  const errorMessage = getError();

  return { hashCallClaimRefund, errorMessage, writeClaimRefund };
};

export default useCallClaimRefund;
