import React from "react";
import { creepzTokens } from "../../../pages/api/creepzTokens";
import { panopticonTokens } from "../../../pages/api/panopticonTokens";

const TokenAttributes = ({
  tokenId,
  collectionId,
  onAttributeClick,
}: {
  tokenId: number;
  collectionId: string;
  onAttributeClick: any;
}) => {
  // Spread the imported data into new arrays to create mutable copies
  const datasets: { [key: string]: any[] } = {
    creepz: [...creepzTokens],
    panopticon: [...panopticonTokens],
  };

  const tokenData = datasets[collectionId]?.find(
    (token) => token.id === tokenId,
  );

  if (!tokenData) {
    console.log("Token data not found for tokenId:", tokenId);
    return <div>Token data not found</div>;
  }

  let attributes;
  if (collectionId === "panopticon") {
    attributes = tokenData.traits
      ? Object.entries(tokenData.traits).map(([trait_type, value]) => ({
          trait_type,
          value,
        }))
      : null;
  } else {
    attributes = tokenData.attributes;
  }

  if (!attributes) {
    console.log("Attributes not found for tokenId:", tokenId);
    return <div>Loading attributes...</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-2">
      {attributes.map(
        (
          { trait_type, value }: { trait_type: string; value: any },
          index: number,
        ) => (
          <div
            className="attribute flex flex-col p-4 text-center transition hover:shadow-lg border border-neutral-300 hover:border hover:border-neutral-900 rounded-xl cursor-pointer"
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
