import React from "react";
import CollectionInfo from "../atoms/CollectionInfo";

interface CollectionImageProps {
  collectionId: string;
  size: "small" | "medium" | "large";
}

const CollectionImage: React.FC<CollectionImageProps> = ({
  collectionId,
  size,
}) => {
  const collection = CollectionInfo.find(
    (c) => c.link === `/collection/${collectionId}`,
  );
  const imageUrl = collection?.images[size] || "/default-image.jpg"; // Fallback to a default image

  return (
    <img
      src={imageUrl}
      alt={collection?.name || "Collection Image"}
      className={`collection-image-${size} h-full object-cover max-md:w-full`}
    />
  );
};

export default CollectionImage;
