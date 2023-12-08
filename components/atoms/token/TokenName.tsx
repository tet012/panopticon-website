import React from "react";
import { creepzTokens } from "../../../pages/api/creepzTokens";
import { panopticonTokens } from "../../../pages/api/panopticonTokens";
import { raeminiscenceTokens } from "../../../pages/api/raeminiscenceTokens";
import { presenceTokens } from "../../../pages/api/presenceTokens";
import { foundersTokens } from "../../../pages/api/foundersTokens";

interface TokenNameProps {
  tokenId: number;
  collectionId: string;
}

const TokenName: React.FC<TokenNameProps> = ({ tokenId, collectionId }) => {
  const datasets: { [key: string]: any[] } = {
    creepz: [...creepzTokens],
    panopticon: [...panopticonTokens],
    raeminiscence: [...raeminiscenceTokens],
    presence: [...presenceTokens],
    founders: [...foundersTokens],
  };

  const tokenData = datasets[collectionId]?.find(
    (token) => token.id === tokenId,
  );

  let logValue;
  if (
    collectionId === "panopticon" ||
    collectionId === "creepz" ||
    collectionId === "founders"
  ) {
    logValue = `${collectionId} #${tokenId}`;
  } else if (collectionId === "raeminiscence" && tokenData.traits) {
    logValue = tokenData.traits.Name || "No Name Available";
  } else {
    logValue = tokenData.name || tokenData.Name || "No Name Available";
  }

  let displayValue = logValue;

  return (
    <h1 className="font-sans font-semibold capitalize text-neutral-600">
      {displayValue}
    </h1>
  );
};

export default TokenName;
