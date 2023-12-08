import { useEffect, useState } from "react";
import usePanopticonUri from "./panopticon/use-panopticon-uri";
import useCreepzUri from "./creepz/use-creepz-uri";
import useRaeminiscenceUri from "./raeminiscence/use-raeminiscence-uri";
import usePresenceUri from "./presence/use-presence-uri";
import useFoundersUri from "./founders/use-founders-uri";

interface TokenDataHookResult {
  tokenData: any;
  error: string | null;
  loading: boolean;
}

const useTokenData = (
  tokenId: number,
  collectionId: string,
): TokenDataHookResult => {
  const panopticonData = usePanopticonUri(BigInt(tokenId));
  const creepzData = useCreepzUri(BigInt(tokenId));
  const raeminiscenceData = useRaeminiscenceUri(BigInt(tokenId));
  const presenceData = usePresenceUri(BigInt(tokenId));
  const foundersData = useFoundersUri(BigInt(tokenId));

  const getCurrentData = () => {
    switch (collectionId) {
      case "panopticon":
        return panopticonData;
      case "creepz":
        return creepzData;
      case "raeminiscence":
        return raeminiscenceData;
      case "presence":
        return presenceData;
      case "founders":
        return foundersData;
      default:
        return {
          error: "Invalid collection ID",
          loading: false,
          tokenData: null,
        };
    }
  };

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const currentData = getCurrentData();

    if (currentData.error) {
      setLoading(false);
    } else if (!currentData.loading && currentData.tokenData) {
      setData(currentData.tokenData);
      setLoading(false);
    } else {
    }
  }, [tokenId, collectionId]);

  return { tokenData: data, loading, error };
};

export default useTokenData;
