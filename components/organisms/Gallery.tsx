import React, { useState, useEffect, useCallback } from "react";
import Token from "../atoms/token/TokenThumbnail";
import CollectionDescription from "../atoms/collection/CollectionDescription";
import CollectionLinks from "../atoms/collection/CollectionLinks";
import CollectionYear from "../atoms/collection/CollectionYear";

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
  sortOrder: string;
  isRandomized: boolean;
}

const shuffleArray = (array: any[]) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const Gallery: React.FC<GalleryProps> = ({
  tokens,
  columnCount,
  collectionId,
  sortOrder,
  isRandomized,
}) => {
  const [visibleCount, setVisibleCount] = useState(columnCount * 3);
  const [isLoading, setIsLoading] = useState(false);
  const bufferDistance = 300;
  const rowsPerPage = 4;

  useEffect(() => {
    setVisibleCount(columnCount * rowsPerPage);
  }, [columnCount]);

  const handleLoadMore = useCallback(() => {
    if (visibleCount < tokens.length && !isLoading) {
      setIsLoading(true);
      setTimeout(() => {
        const newCount = Math.min(
          visibleCount + columnCount * rowsPerPage,
          tokens.length,
        );
        setVisibleCount(newCount);
        console.log(`Loaded tokens: ${newCount}/${tokens.length}`);
        setIsLoading(false);
      }, 500);
    }
  }, [visibleCount, isLoading, columnCount, tokens.length, rowsPerPage]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight +
        document.documentElement.scrollTop +
        bufferDistance >=
      document.documentElement.offsetHeight
    ) {
      handleLoadMore();
    }
  }, [bufferDistance, handleLoadMore]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  let sortedAndRandomizedTokens: Token[] = [...tokens];

  if (sortOrder === "ascending") {
    sortedAndRandomizedTokens.sort((a, b) => Number(a.id) - Number(b.id));
  } else if (sortOrder === "descending") {
    sortedAndRandomizedTokens.sort((a, b) => Number(b.id) - Number(a.id));
  }

  if (isRandomized) {
    sortedAndRandomizedTokens = shuffleArray(
      sortedAndRandomizedTokens,
    ) as Token[];
  }

  const displayedTokens = sortedAndRandomizedTokens.slice(0, visibleCount);

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="p-8 max-md:p-6 flex max-md:flex-col max-md:gap-8 w-full justify-between bg-neutral-100 rounded-xl">
        <div className="flex flex-col w-1/2 max-md:w-full gap-4 ">
          <CollectionYear collectionId={collectionId} />
          <h1 className="capitalize text-7xl max-md:text-4xl">
            {collectionId}
          </h1>
        </div>

        <div className="">
          <CollectionLinks collectionId={collectionId} />
        </div>
      </div>
      <div className="p-8 bg-neutral-100 rounded-xl">
        <CollectionDescription collectionId={collectionId} />
      </div>
      <div
        className="gallery grid gap-2 auto-cols-fr"
        style={{
          gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
        }}
      >
        {displayedTokens.slice(0, visibleCount).map((token) => {
          const tokenId = collectionId === "creepz" ? token.tokenId : token.id;
          if (tokenId === undefined) {
            return null;
          }

          return (
            <Token key={tokenId} id={tokenId} collectionId={collectionId} />
          );
        })}
      </div>
    </div>
  );
};

export default Gallery;
