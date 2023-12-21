import React from "react";
import Link from "next/link";
import CollectionInfo from "../atoms/collection/CollectionInfo";
import CollectionDescription from "../atoms/collection/CollectionDescription";
import CollectionYear from "../atoms/collection/CollectionYear";
import CollectionImage from "../atoms/collection/CollectionImage";
import { ArrowRightIcon } from "@heroicons/react/24/solid";

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
      className="group bg-neutral-50 rounded-xl border p-2 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-800 transition "
      href={link}
    >
      <div className="transition flex max-md:flex-col rounded-lg overflow-hidden group-hover:shadow-2xl shadow-xl bg-neutral-50">
        <div className=" max-md:w-full overflow-hidden">
          <div className="group-hover:scale-105 transition ease-in-out h-full">
            <CollectionImage collectionId={collectionId} size="large" />
          </div>
        </div>

        <div className="flex flex-col justify-between gap-8 p-4 w-2/3 max-md:w-full">
          <div className="flex flex-col gap-4 w-full">
            <div className="h-fit">
              <CollectionYear collectionId={collectionId} />
            </div>
            <h2 className="text-7xl max-md:text-5xl">{name}</h2>
            <CollectionDescription collectionId={collectionId} />
          </div>
          <div className="flex transition group-hover:border-neutral-500 group-hover:bg-neutral-200 self-end border px-4 py-2 rounded-full align-center items-center justify-center gap-2">
            <p className="">Explore Collection</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CollectionCard;
