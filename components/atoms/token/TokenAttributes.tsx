import React from "react";
import { creepzTokens } from "../../../pages/api/creepzTokens";
import { panopticonTokens } from "../../../pages/api/panopticonTokens";

interface TokenAttributesProps {
  tokenId: number;
  collectionId: string;
  onAttributeClick: any;
}

const TokenAttributes: React.FC<TokenAttributesProps> = ({
  tokenId,
  collectionId,
  onAttributeClick,
}) => {
  const datasets: { [key: string]: any[] } = {
    creepz: [...creepzTokens],
    panopticon: [...panopticonTokens],
  };

  const tokenData = datasets[collectionId]?.find(
    (token) => token.id === tokenId || token.tokenId === tokenId,
  );

  console.log(tokenData);

  let attributes;
  if (collectionId === "panopticon") {
    attributes = tokenData?.traits
      ? Object.entries(tokenData.traits).map(([trait_type, value]) => ({
          trait_type,
          value,
        }))
      : [];
  } else {
    attributes = tokenData?.attributes || [];
  }
  return (
    <div className="grid grid-flow-row gap-2 md:grid-cols-4 lg:grid-cols-4">
      {attributes.map(
        ({ trait_type, value }: any, index: React.Key | null | undefined) => (
          <div
            className="bg-neutral-100 attribute flex flex-col p-4 text-center transition hover:shadow-lg border border-neutral-300 hover:border hover:border-neutral-900 rounded-xl cursor-pointer"
            key={index}
            onClick={() => onAttributeClick(trait_type, value)}
          >
            <span className="self-center attribute-name text-neutral-500">
              {trait_type}
            </span>
            <span className="self-center attribute-value">{value}</span>
          </div>
        ),
      )}
    </div>
  );
};

export default TokenAttributes;
