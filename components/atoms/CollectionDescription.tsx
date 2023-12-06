import React, { useState } from "react";
import CollectionInfo from "./CollectionInfo";

interface CollectionDescriptionProps {
  collectionId: string;
}

const CollectionDescription: React.FC<CollectionDescriptionProps> = ({
  collectionId,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const collection = CollectionInfo.find(
    (c) => c.link === `/collection/${collectionId}`,
  );

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  const truncateText = (text: string, wordLimit: number) => {
    return (
      text.split(" ").slice(0, wordLimit).join(" ") +
      (text.split(" ").length > wordLimit ? "..." : "")
    );
  };

  return (
    <div>
      {collection ? (
        <>
          <span className="text-justify inline">
            {isExpanded
              ? collection.description
              : truncateText(collection.description, 30)}
          </span>
          <button
            onClick={toggleReadMore}
            className="font-semibold text-neutral-700 hover:text-neutral-900 inline ml-2 max-md:ml-0"
          >
            {isExpanded ? "Read Less" : "Read More"}
          </button>
        </>
      ) : (
        <p>Collection description not available.</p>
      )}
    </div>
  );
};

export default CollectionDescription;
