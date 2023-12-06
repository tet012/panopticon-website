import { useContractRead } from "wagmi";
import { creepzAbi } from "./creepz-abi";

const useCreepzUri = (tokenId: bigint) => {
  const { data, isError, isLoading } = useContractRead({
    address: process.env
      .NEXT_PUBLIC_THE_CREEPZ_CONTRACT_ADDRESS as `0x${string}`,
    abi: creepzAbi,
    functionName: "tokenURI",
    args: [tokenId],
  });

  let tokenData = null;

  if (data) {
    try {
      const base64Content = data.split(",")[1];
      const bytes = base64ToBytes(base64Content);
      const json = new TextDecoder().decode(bytes);
      tokenData = JSON.parse(json);
    } catch (e) {
      console.error("Error decoding or parsing token URI:", e);
    }
  }

  return {
    tokenData,
    error: isError,
    loading: isLoading,
  };
};

export default useCreepzUri;

function base64ToBytes(base64: string) {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}
