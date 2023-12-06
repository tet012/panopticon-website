import React, { useState, useEffect } from "react";
import Token from "../atoms/TokenThumbnail";
import CollectionDescription from "../atoms/CollectionDescription";
import CollectionLinks from "../atoms/CollectionLinks";
import CollectionYear from "../atoms/CollectionYear";

type Token = {
  tokenId: any;
  id: number;
  image: string;
};

interface GalleryProps {
  tokens: Token[];
  handleTokenClick: (tokenId: number) => void;
  columnCount: number;
  collectionId: string;
}

const Gallery: React.FC<GalleryProps> = ({
  tokens,
  columnCount,
  collectionId,
}) => {
  const [visibleCount, setVisibleCount] = useState(columnCount * 3);
  const [isLoading, setIsLoading] = useState(false);
  const bufferDistance = 300;
  const rowsPerPage = 4;

  useEffect(() => {
    setVisibleCount(columnCount * rowsPerPage);
  }, [columnCount]);

  const handleLoadMore = () => {
    if (visibleCount < tokens.length && !isLoading) {
      setIsLoading(true);
      setTimeout(() => {
        setVisibleCount((prevCount) =>
          Math.min(prevCount + columnCount * rowsPerPage, tokens.length),
        );
        setIsLoading(false);
      }, 500);
    }
  };

  const handleScroll = () => {
    if (
      window.innerHeight +
        document.documentElement.scrollTop +
        bufferDistance >=
      document.documentElement.offsetHeight
    ) {
      handleLoadMore();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [visibleCount, tokens.length, isLoading]);

  return (
    <div className="flex w-full flex-col">
      <div className="p-16 max-md:p-6 flex max-md:flex-col max-md:gap-8 w-full justify-between bg-neutral-100 border-b border-neutral-200">
        <div className="flex flex-col w-1/2 max-md:w-full gap-4">
          <CollectionYear collectionId={collectionId} />
          <h1 className="capitalize text-7xl">{collectionId}</h1>
          <CollectionDescription collectionId={collectionId} />
        </div>
        <div className="">
          <CollectionLinks collectionId={collectionId} />
        </div>
      </div>
      <div
        className="gallery grid gap-2 auto-cols-fr p-4"
        style={{
          gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
        }}
      >
        {tokens.slice(0, visibleCount).map((token) => {
          // Use either `token.tokenId` or `token.id` as the key
          const tokenId = collectionId === "creepz" ? token.tokenId : token.id;
          if (tokenId === undefined) {
            console.warn("Undefined token ID", token);
            return null;
          }

          // Use the `tokenId` as the key directly
          return (
            <Token key={tokenId} id={tokenId} collectionId={collectionId} />
          );
        })}
      </div>
    </div>
  );
};

export default Gallery;
