import { useContractRead } from "wagmi";
import { panopticonAbi } from "./panopticon-abi";

export const useGetHtml = (tokenId: bigint) => {
  const { data, isError, isLoading } = useContractRead({
    address: process.env
      .NEXT_PUBLIC_PANOPTICON_CONTRACT_ADDRESS as `0x${string}`,
    abi: panopticonAbi,
    functionName: "tokenHTML",
    args: [tokenId],
  });

  return {
    html: data as string | undefined,
    error: isError,
    loading: isLoading,
  };
};
