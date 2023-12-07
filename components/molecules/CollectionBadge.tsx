import React from "react";
import Link from "next/link";
import CollectionInfo from "../atoms/collection/CollectionInfo";
import CollectionImage from "../atoms/collection/CollectionImage";

interface CollectionBadgeProps {
  collectionId: string;
}

const CollectionBadge: React.FC<CollectionBadgeProps> = ({ collectionId }) => {
  const collection = CollectionInfo.find(
    (c) => c.link === `/collection/${collectionId}`,
  );

  // If no collection is found, default to a placeholder
  const { name } = collection || {
    name: "Unknown Collection",
  };

  return (
    <Link href={`/collection/${collectionId}`}>
      <div className="flex h-full gap-2 items-center justify-center align-center group p-1 transition hover:shadow-lg border border-neutral-200 hover:border hover:border-neutral-900 rounded-xl pr-2">
        <div className="w-4 rounded-full overflow-hidden">
          <CollectionImage collectionId={collectionId} size="small" />
        </div>
        <p className="text-neutral-500 group-hover:text-neutral-900 transition">
          {name}
        </p>
      </div>
    </Link>
  );
};

export default CollectionBadge;
