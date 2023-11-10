import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { abi } from "./abi";

const useCallClaimTokens = (
  amountToClaim: number,
  merkleProof: `0x${string}`[]
) => {
  const prepareContractWrite = usePrepareContractWrite({
    address: process.env
      .NEXT_PUBLIC_DUTCH_AUCTION_CONTRACT_ADDRESS as `0x${string}`,
    abi: abi,
    functionName: "claimTokens",
    args: [amountToClaim, merkleProof],
  });

  const { data, error, write } = useContractWrite(prepareContractWrite.config);

  const hashCallClaimTokens = data?.hash;

  const getError = () => {
    if (error) {
      return error.message;
    }
    return "";
  };

  const errorMessageClaimTokens = getError();

  const writeClaimTokens = () => write?.();

  return { hashCallClaimTokens, errorMessageClaimTokens, writeClaimTokens };
};

export default useCallClaimTokens;
