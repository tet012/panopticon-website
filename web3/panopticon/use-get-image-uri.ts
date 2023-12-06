import { useContractRead } from "wagmi";
import { panopticonAbi } from "./panopticon-abi";

const useGetImageUri = (tokenId: bigint) => {
  const { data, isError, isLoading } = useContractRead({
    address: process.env
      .NEXT_PUBLIC_PANOPTICON_CONTRACT_ADDRESS as `0x${string}`,
    abi: panopticonAbi,
    chainId: Number(process.env.NEXT_PUBLIC_CHAIN_ID || "1"),
    functionName: "tokenImageURI",
    args: [tokenId],
  });

  return {
    imageUri: data as string | undefined,
    error: isError,
    loading: isLoading,
  };
};

export default useGetImageUri;
