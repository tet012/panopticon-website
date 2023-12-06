import { useState, useEffect } from "react";
import usePanopticonUri from "./panopticon/use-panopticon-uri";
import useCreepzUri from "./creepz/use-creepz-uri";
import useRaeminiscenceUri from "./raeminiscence/use-raeminiscence-uri";
import usePresenceUri from "./presence/use-presence-uri";
import useFoundersUri from "./founders/use-founders-uri";

const presenceTokenIds = new Set([
  1, 7, 8, 10, 11, 12, 15, 17, 19, 20, 21, 22, 23, 24, 25, 26, 32, 33, 34, 35,
  36, 46, 47, 48, 49, 50, 51, 52,
]);

const foundersTokenIds = new Set([
  3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 10025, 10026, 10027,
  10028, 10029, 10030, 10031, 10032, 10033, 10034, 10035, 10036, 10037, 10038,
  10039, 10040, 10043, 10044, 10045, 10046, 10047, 10048, 10049, 10050, 10051,
  10052, 10053, 10054, 10055, 10056, 10067, 10054, 10055, 10056, 10067, 10068,
  10069, 10060, 10061, 10062, 10063, 10064, 10065, 10066, 10067, 10068, 10069,
  10070, 10071, 10072, 10073, 10074, 10075, 10076, 10077,
]);

const useTokenData = (tokenId: bigint, collectionId: string) => {
  let tokenDataHook: unknown;

  // Function to validate token ID for specific collections
  const isValidTokenId = (id: bigint, collection: string) => {
    if (collection === "presence") {
      return presenceTokenIds.has(Number(id));
    } else if (collection === "founders") {
      return foundersTokenIds.has(Number(id));
    }
    return true; // For other collections, assume the ID is valid
  };

  if (!isValidTokenId(tokenId, collectionId)) {
    return { tokenData: null, error: "Invalid token ID", loading: false };
  }

  // Hook logic based on collectionId
  switch (collectionId) {
    case "panopticon":
      tokenDataHook = usePanopticonUri(tokenId);
      break;
    case "creepz":
      tokenDataHook = useCreepzUri(tokenId);
      break;
    case "raeminiscence":
      tokenDataHook = useRaeminiscenceUri(tokenId);
      break;
    case "presence":
      tokenDataHook = usePresenceUri(tokenId);
      break;
    case "founders":
      tokenDataHook = useFoundersUri(tokenId);
      break;
    default:
      tokenDataHook = { tokenData: null, error: null, loading: false };
  }

  // State for the processed token data
  const [decodedData, setDecodedData] = useState(null);

  // Effect to process and set the decoded data
  useEffect(() => {
    const { tokenData, error, loading } = tokenDataHook as any;

    if (!loading && !error && tokenData) {
      if (
        (collectionId === "presence" || collectionId === "founders") &&
        tokenData.image
      ) {
        const ipfsUrl = tokenData.image.replace(
          /^ipfs:\/\/ipfs\//,
          "https://ipfs.io/ipfs/",
        );
        setDecodedData({ ...tokenData, image: ipfsUrl });
      } else {
        setDecodedData(tokenData);
      }
    }
  }, [tokenDataHook, collectionId]);

  return decodedData;
};

export default useTokenData;
