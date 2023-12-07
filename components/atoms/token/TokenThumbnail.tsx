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
      <div className="group token-thumbnail overflow-hidden cursor-pointer flex border-8 border-neutral-50 bg-neutral-50  max-md:p-1 max-md:rounded-lg h-full w-fit shadow-xl hover:shadow-2xl rounded-xl justify-center align-center items-middle self-center transition hover:translate-y-[-8px]">
        {tokenData.image &&
        tokenData.image.startsWith("data:image/svg+xml;base64,") ? (
          <img
            src={tokenData.image as string}
            alt={`Token ${id}`}
            width={600}
            className="token-image max-md:rounded-lg rounded-lg group-hover:scale-105 transition"
          />
        ) : (
          <Image
            src={tokenData.image as string}
            alt={`Token ${id}`}
            width={600}
            height={400}
            loading="lazy"
            className="max-md:rounded-lg rounded-lg group-hover:scale-105 transition"
          />
        )}
      </div>
    </Link>
  );
};

export default TokenThumbnail;
