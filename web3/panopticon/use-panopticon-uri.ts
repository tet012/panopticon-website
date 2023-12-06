import { useContractRead } from "wagmi";
import { panopticonAbi } from "./panopticon-abi";

const usePanopticonUri = (tokenId: bigint) => {
  const { data, isError, isLoading } = useContractRead({
    address: process.env
      .NEXT_PUBLIC_PANOPTICON_CONTRACT_ADDRESS as `0x${string}`,
    abi: panopticonAbi,
    functionName: "tokenURI",
    args: [tokenId],
  });

  let tokenData;
  if (data) {
    try {
      // Extract the base64 content from the data URI
      const base64Content = data.split(",")[1];
      const bytes = base64ToBytes(base64Content);
      const json = new TextDecoder().decode(bytes);

      // Parse the JSON string into an object
      tokenData = JSON.parse(json);

      // Log the token data to the console
      console.log("Token Data:", tokenData);
    } catch (e) {
      // Handle any errors in decoding or parsing
      console.error("Error decoding or parsing token URI:", e);
      tokenData = undefined;
    }
  }

  return {
    tokenData,
    error: isError,
    loading: isLoading,
  };
};

export default usePanopticonUri;

function base64ToBytes(base64: string) {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}
