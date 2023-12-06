import { useContractRead } from "wagmi";
import { panopticonAbi } from "./panopticon-abi"; // Replace with your contract's ABI

export const useGetOwnerOf = (tokenId: bigint) => {
  const { data, isError, isLoading } = useContractRead({
    address: process.env
      .NEXT_PUBLIC_PANOPTICON_CONTRACT_ADDRESS as `0x${string}`,
    abi: panopticonAbi,
    functionName: "ownerOf",
    args: [tokenId],
  });

  return {
    owner: data as string | undefined,
    error: isError,
    loading: isLoading,
  };
};
