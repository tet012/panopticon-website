import React, { useState, useEffect } from "react";
import Token from "../atoms/token/TokenThumbnail";
import { panopticonTokens } from "../../pages/api/panopticonTokens";
import { creepzTokens } from "../../pages/api/creepzTokens";
import { raeminiscenceTokens } from "../../pages/api/raeminiscenceTokens";
import { presenceTokens } from "../../pages/api/presenceTokens";
import { foundersTokens } from "../../pages/api/foundersTokens";

type TokenInfo = {
  tokenId: number;
  collectionId: string;
};

interface RandomGalleryProps {
  columnCount: number;
}

const RandomGallery: React.FC<RandomGalleryProps> = ({ columnCount }) => {
  const maxTokens = 16; // Maximum number of tokens to display
  const [displayedTokens, setDisplayedTokens] = useState<TokenInfo[]>([]);

  useEffect(() => {
    // Randomization logic inside useEffect to ensure it runs on client side only
    const pickRandomTokens = (tokens: any[], count: number) => {
      return tokens.sort(() => 0.5 - Math.random()).slice(0, 16);
    };

    const allTokens: TokenInfo[] = [
      ...pickRandomTokens(Array.from(panopticonTokens), maxTokens / 5).map(
        (token) => ({
          tokenId: token.id,
          collectionId: "panopticon",
        }),
      ),
      ...pickRandomTokens(Array.from(creepzTokens), maxTokens / 5).map(
        (token) => ({
          tokenId: token.tokenId,
          collectionId: "creepz",
        }),
      ),
      ...pickRandomTokens(Array.from(raeminiscenceTokens), maxTokens / 5).map(
        (token) => ({
          tokenId: token.id,
          collectionId: "raeminiscence",
        }),
      ),
      ...pickRandomTokens(Array.from(presenceTokens), maxTokens / 5).map(
        (token) => ({
          tokenId: token.id,
          collectionId: "presence",
        }),
      ),
      ...pickRandomTokens(Array.from(foundersTokens), maxTokens / 5).map(
        (token) => ({
          tokenId: token.id,
          collectionId: "founders",
        }),
      ),
    ];

    const shuffledTokens = allTokens
      .sort(() => 0.5 - Math.random())
      .slice(0, maxTokens);
    setDisplayedTokens(shuffledTokens);
  }, []); // Empty dependency array to run once on mount

  return (
    <div className="flex w-full flex-col gap-2">
      <div
        className="gallery grid gap-2 auto-cols-fr"
        style={{
          gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
        }}
      >
        {displayedTokens.map((tokenInfo) => (
          <div
            key={`${tokenInfo.collectionId}-${tokenInfo.tokenId}`}
            className="shadow-lg rounded-xl"
          >
            <Token
              id={
                tokenInfo.collectionId === "creepz"
                  ? tokenInfo.tokenId
                  : tokenInfo.tokenId
              }
              collectionId={tokenInfo.collectionId}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RandomGallery;
