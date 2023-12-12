import React from "react";
import Image from "next/image";
import Link from "next/link";
import useCollectionUri from "../../../web3/use-collection-uri";

type TokenProps = {
  id: number;
  collectionId: string;
};

const TokenThumbnail: React.FC<TokenProps> = ({ id, collectionId }) => {
  const { tokenData, loading, error } = useCollectionUri(id, collectionId);

  if (loading) return <div>Loading...</div>;
  if (error || !tokenData) return <div>Error or no data available.</div>;

  return (
    <Link href={`/collection/${collectionId}/${id}`}>
      <div className="group overflow-hidden cursor-pointer flex max-md:border max-md:p-0 max-md:rounded-lg h-full rounded-xl justify-center align-center items-middle self-center transition ">
        {tokenData.image &&
        tokenData.image.startsWith("data:image/svg+xml;base64,") ? (
          <div className="h-full w-full">
            <img
              src={tokenData.image as string}
              alt={`Token ${id}`}
              className="h-full w-full object-cover rounded-lg"
            />
          </div>
        ) : (
          <Image
            src={tokenData.image as string}
            alt={`Token ${id}`}
            width={600}
            height={400}
            loading="lazy"
            className="max-md:rounded-lg bg-cover rounded-lg"
          />
        )}
      </div>
    </Link>
  );
};

export default TokenThumbnail;
