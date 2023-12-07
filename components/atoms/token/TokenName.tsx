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

  if (!tokenData) {
    console.log("Token data not found for tokenId:", tokenId);
    return <div>Token data not found</div>;
  }

  let logValue;
  if (collectionId === "panopticon") {
    logValue = tokenData.id;
  } else {
    logValue = tokenData.name || tokenData.Name || "No Name Available";
  }

  let displayValue;
  if (collectionId === "panopticon" || collectionId === "creepz") {
    displayValue = `${collectionId} #${tokenId}`;
  } else {
    displayValue = tokenData.name || tokenData.Name || "No Name Available";
  }

  return <h1 className="font-sans capitalize">{displayValue}</h1>;
};

export default TokenName;
