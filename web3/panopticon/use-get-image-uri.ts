import { useContractRead } from "wagmi";
import { abi } from "./panopticon-abi";

export const useGetImageUri = (tokenId: bigint) => {
  const { data, isError, isLoading } = useContractRead({
    address: process.env
      .NEXT_PUBLIC_PANOPTICON_CONTRACT_ADDRESS as `0x${string}`,
    abi: abi,
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
