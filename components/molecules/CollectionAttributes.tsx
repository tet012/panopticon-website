// CollectionAttributes.js
import React from "react";

const TokenAttributes = ({
  collectionId,
  tokenData,
  onAttributeClick,
}: {
  collectionId: string;
  tokenData: any;
  onAttributeClick: any;
}) => {
  if (!["creepz", "panopticon"].includes(collectionId)) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-2">
      {tokenData.attributes.map(
        (
          attr: {
            trait_type:
              | string
              | number
              | boolean
              | React.ReactElement<
                  any,
                  string | React.JSXElementConstructor<any>
                >
              | Iterable<React.ReactNode>
              | React.ReactPortal
              | React.PromiseLikeOfReactNode
              | null
              | undefined;
            value:
              | string
              | number
              | boolean
              | React.ReactElement<
                  any,
                  string | React.JSXElementConstructor<any>
                >
              | Iterable<React.ReactNode>
              | React.ReactPortal
              | React.PromiseLikeOfReactNode
              | null
              | undefined;
          },
          index: React.Key | null | undefined,
        ) => (
          <div
            className="attribute flex flex-col p-4 text-center transition hover:shadow-lg border border-neutral-300 hover:border hover:border-neutral-900 rounded-xl cursor-pointer"
            key={index}
            onClick={() => onAttributeClick(attr.trait_type, attr.value)}
          >
            <span className="self-center attribute-name text-neutral-500">
              {attr.trait_type}
            </span>{" "}
            <span className="self-center attribute-value">{attr.value}</span>
          </div>
        ),
      )}
    </div>
  );
};

export default TokenAttributes;
