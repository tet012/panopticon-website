import React from "react";
import CollectionInfo from "./CollectionInfo";
import Image from "next/image";

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
    <Image
      src={imageUrl}
      width={size === "small" ? 100 : size === "medium" ? 200 : 300}
      height={size === "small" ? 100 : size === "medium" ? 200 : 300}
      alt={collection?.name || "Collection Image"}
      className={`collection-image-${size} h-full object-cover max-md:w-full`}
    />
  );
};

export default CollectionImage;
