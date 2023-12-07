import React from "react";
import CollectionInfo from "./CollectionInfo";

interface CollectionYearProps {
  collectionId: string;
}

const CollectionYear: React.FC<CollectionYearProps> = ({ collectionId }) => {
  const collection = CollectionInfo.find(
    (c) => c.link === `/collection/${collectionId}`,
  );

  return (
    <div className=" flex h-full w-fit gap-2 items-center justify-center align-center group p-1 transition border border-neutral-200  rounded-xl px-2">
      {collection ? <p>{collection.year}</p> : <p>Year not available.</p>}
    </div>
  );
};

export default CollectionYear;
