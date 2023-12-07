import React from "react";
import Link from "next/link";
import CollectionInfo from "../atoms/collection/CollectionInfo";
import CollectionDescription from "../atoms/collection/CollectionDescription";
import CollectionYear from "../atoms/collection/CollectionYear";
import CollectionImage from "../atoms/collection/CollectionImage";

interface CollectionCardProps {
  collectionId: string;
}

const CollectionCard: React.FC<CollectionCardProps> = ({ collectionId }) => {
  // Fetch collection data from CollectionInfo
  const collection = CollectionInfo.find(
    (c) => c.link === `/collection/${collectionId}`,
  );

  // If no collection is found, default to placeholders
  const { name, year, description, link } = collection || {
    name: "Unknown Collection",
    year: "N/A",
    description: "No description available.",
    link: "#",
  };

  return (
    <Link
      className="group bg-neutral-50 rounded-xl border p-2 text-neutral-500 hover:text-neutral-900 transition "
      href={link}
    >
      <div className="transition flex border max-md:flex-col rounded-lg overflow-hidden group-hover:shadow-2xl shadow-xl w-full group-hover:translate-y-[-4px]">
        <div className="w-1/3 max-md:w-full overflow-hidden">
          <div className="group-hover:scale-105 transition ease-in-out">
            <CollectionImage collectionId={collectionId} size="large" />
          </div>
        </div>

        <div className="flex flex-col justify-between gap-8 p-4 w-2/3 max-md:w-full">
          <div className="flex flex-col gap-4">
            <div className="h-fit">
              <CollectionYear collectionId={collectionId} />
            </div>
            <h2 className="text-7xl max-md:text-5xl">{name}</h2>
            <CollectionDescription collectionId={collectionId} />
          </div>
          <p className="self-end">Explore Collection</p>
        </div>
      </div>
    </Link>
  );
};

export default CollectionCard;
