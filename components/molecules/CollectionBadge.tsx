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
      <div className="group flex h-full gap-2 items-center justify-center align-center group p-1 transition hover:shadow-lg border border-neutral-400 hover:border hover:border-neutral-900 rounded-xl pr-2 hover:bg-neutral-900 hover:text-neutral-50">
        <div className="w-4 rounded-full overflow-hidden border border-neutral-50 shadow-lg">
          <CollectionImage collectionId={collectionId} size="small" />
        </div>
        <p className="group-hover:text-neutral-50 text-neutral-500 group-hover:text-neutral-900 transition">
          {name}
        </p>
      </div>
    </Link>
  );
};

export default CollectionBadge;
