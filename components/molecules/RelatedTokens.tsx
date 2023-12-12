import React, { useState, useEffect } from "react";
import TokenThumbnail from "../atoms/token/TokenThumbnail";
import { panopticonTokens } from "../../pages/api/panopticonTokens";
import { creepzTokens } from "../../pages/api/creepzTokens";
import { raeminiscenceTokens } from "../../pages/api/raeminiscenceTokens";
import { presenceTokens } from "../../pages/api/presenceTokens";

const getRandomTokens = (tokens: any[], count: number, excludeId: any) => {
  return tokens
    .filter((token) => token.id !== excludeId)
    .sort(() => 0.5 - Math.random())
    .slice(0, count);
};

const RelatedTokens = ({
  collectionId,
  tokenId,
}: {
  collectionId: string;
  tokenId: any;
}) => {
  const [randomTokens, setRandomTokens] = useState<any[]>([]);

  useEffect(() => {
    const tokens = fetchTokensForCollection(collectionId);
    const selectedTokens = getRandomTokens([...tokens], 4, tokenId);
    setRandomTokens(selectedTokens);
  }, [collectionId, tokenId]);

  return (
    <div className="flex gap-8 max-md:grid max-md:grid-cols-2 max-md:gap-2">
      {randomTokens.map((token, index) => {
        const uniqueTokenId =
          collectionId === "creepz" ? token.tokenId : token.id;
        const key = `${collectionId}-${uniqueTokenId}-${index}`;
        return (
          <div
            key={key}
            className="transition border-4 max-md:border-0 border-neutral-100 shadow rounded-2xl hover:border-neutral-900 hover:shadow-lg"
          >
            <TokenThumbnail id={uniqueTokenId} collectionId={collectionId} />
          </div>
        );
      })}
    </div>
  );
};

const fetchTokensForCollection = (collectionId: string) => {
  switch (collectionId) {
    case "panopticon":
      return panopticonTokens;
    case "creepz":
      return creepzTokens;
    case "raeminiscence":
      return raeminiscenceTokens;
    case "presence":
      const presenceTokenIds = new Set([
        1, 7, 8, 10, 11, 12, 15, 17, 19, 20, 21, 22, 23, 24, 25, 26, 32, 33, 34,
        35, 36, 46, 47, 48, 49, 50, 51, 52,
      ]);
      return presenceTokens.filter((token) => presenceTokenIds.has(token.id));
    case "founders":
      const foundersTokenIds = new Set([
        3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 10025, 10026,
        10027, 10028, 10029, 10030, 10031, 10032, 10033, 10034, 10035, 10036,
        10037, 10038, 10039, 10040, 10043, 10044, 10045, 10046, 10047, 10048,
        10049, 10050, 10051, 10052, 10053, 10054, 10055, 10056, 10067, 10054,
        10055, 10056, 10067, 10068, 10069, 10060, 10061, 10062, 10063, 10064,
        10065, 10066, 10067, 10068, 10069, 10070, 10071, 10072, 10073, 10074,
        10075, 10076, 10077,
      ]);
      return presenceTokens.filter((token) => foundersTokenIds.has(token.id));
    default:
      return [];
  }
};

export default RelatedTokens;
