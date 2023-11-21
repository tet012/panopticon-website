import React, { useState, useEffect } from "react";
import Token from "../atoms/Token";

type Token = {
  id: number;
  image: string;
};

interface GalleryProps {
  tokens: Token[];
  handleTokenClick: (tokenId: number) => void;
  columnCount: number;
}

const Gallery: React.FC<GalleryProps> = ({
  tokens,
  handleTokenClick,
  columnCount,
}) => {
  const [visibleCount, setVisibleCount] = useState(columnCount * 3); // Default to 3 rows of initial column count
  const [isLoading, setIsLoading] = useState(false);
  const bufferDistance = 300;
  const rowsPerPage = 3;

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
      <div
        className="gallery grid gap-2 auto-cols-fr p-2"
        style={{
          gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
        }}
      >
        {tokens.slice(0, visibleCount).map((token) => (
          <Token key={token.id} token={token} onClick={handleTokenClick} />
        ))}
      </div>
      {isLoading && (
        <p className="self-center text-xl p-8">Loading more tokens...</p>
      )}
    </div>
  );
};

export default Gallery;
