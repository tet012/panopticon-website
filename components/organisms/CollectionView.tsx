import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import { panopticonTokens } from "../../pages/api/panopticonTokens";
import { creepzTokens } from "../../pages/api/creepzTokens";
import { raeminiscenceTokens } from "../../pages/api/raeminiscenceTokens";
import { presenceTokens } from "../../pages/api/presenceTokens";
import { loopzTokens } from "../../pages/api/loopzTokens";
import useTokenFilter from "../../hooks/useFilter";
import palettes from "../atoms/Palettes";
import Sidebar from "./Sidebar";
import Gallery from "./Gallery";

type Token = {
  tokenId: number;
  id: number;
  image: string;
  traits?: { [key: string]: string };
  attributes?: { trait_type: string; value: string }[];
};

interface CollectionProps {
  collectionId: string;
}

type CountType = Record<string, Record<string, number>>;

const CollectionView: React.FC<CollectionProps> = ({ collectionId }) => {
  const router = useRouter();
  const tokenData = useMemo(() => {
    switch (collectionId) {
      case "panopticon":
        return panopticonTokens;
      case "creepz":
        return creepzTokens;
      case "raeminiscence":
        return raeminiscenceTokens;
      case "loopz":
        return loopzTokens;
      case "presence":
        const presenceTokenIds = new Set([
          1, 7, 8, 10, 11, 12, 15, 17, 19, 20, 21, 22, 23, 24, 25, 26, 32, 33,
          34, 35, 36, 46, 47, 48, 49, 50, 51, 52,
        ]);
        return presenceTokens.filter((token) => presenceTokenIds.has(token.id));
      case "founders":
        const foundersTokenIds = new Set([
          3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 10025,
          10026, 10027, 10028, 10029, 10030, 10031, 10032, 10033, 10034, 10035,
          10036, 10037, 10038, 10039, 10040, 10043, 10044, 10045, 10046, 10047,
          10048, 10049, 10050, 10051, 10052, 10053, 10054, 10055, 10056, 10067,
          10054, 10055, 10056, 10067, 10068, 10069, 10060, 10061, 10062, 10063,
          10064, 10065, 10066, 10067, 10068, 10069, 10070, 10071, 10072, 10073,
          10074, 10075, 10076, 10077,
        ]);
        return presenceTokens.filter((token) => foundersTokenIds.has(token.id));
      default:
        return [];
    }
  }, [collectionId]);

  const mutableTokenData = useMemo(() => [...tokenData], [tokenData]);
  const [visibleAttributes, setVisibleAttributes] = useState<{
    [key: string]: boolean;
  }>({});
  const paletteColors = palettes;

  const [tokenCounts, setTokenCounts] = useState<{
    [trait: string]: { [value: string]: number };
  }>({});

  const {
    tokens: filteredTokens,
    filters,
    activeFilters,
    handleFilterChange,
  } = useTokenFilter(mutableTokenData as unknown as Token[]); // Using the updated hook

  useEffect(() => {
    const standardizedTraits = tokenData.map((token) => {
      if (collectionId === "panopticon" && "traits" in token) {
        return Object.entries(token.traits).map(([trait_type, value]) => ({
          trait_type,
          value,
        }));
      } else if ("attributes" in token) {
        return token.attributes;
      }
      return [];
    });

    // Define the initial type for counts
    const initialCounts: CountType = {};

    // Calculate the token counts
    const counts = standardizedTraits
      .flat()
      .reduce((acc: CountType, { trait_type, value }) => {
        acc[trait_type] = acc[trait_type] || {};
        acc[trait_type][value] = (acc[trait_type][value] || 0) + 1;
        return acc;
      }, initialCounts);

    // Set the token counts state
    setTokenCounts(counts);
  }, [tokenData, collectionId]);

  const toggleAttributeVisibility = (trait: string) => {
    setVisibleAttributes((prevVisibleAttributes) => ({
      ...prevVisibleAttributes,
      [trait]: !prevVisibleAttributes[trait],
    }));
  };

  const handleTokenClick = (tokenId: number) => {
    router.push(`${collectionId}/token/${tokenId}`);
  };

  const [columnCount, setColumnCount] = useState(4); // Default to 4 columns

  const shouldDisplaySidebar = useMemo(
    () => collectionId === "creepz" || collectionId === "panopticon",
    [collectionId],
  );

  return (
    <div className="max-md:flex-col flex border-b border-t">
      {shouldDisplaySidebar && (
        <div className="h-content border-r sticky top-0 bg-neutral-50">
          <Sidebar
            filters={filters}
            toggleAttributeVisibility={toggleAttributeVisibility}
            visibleAttributes={visibleAttributes}
            activeFilters={activeFilters}
            handleFilterChange={handleFilterChange}
            paletteColors={paletteColors}
            tokenCounts={tokenCounts}
            columnCount={columnCount}
            setColumnCount={setColumnCount}
          />
        </div>
      )}
      <Gallery
        tokens={filteredTokens as Token[]} // Cast filteredTokens to Token[]
        handleTokenClick={handleTokenClick}
        columnCount={columnCount}
        collectionId={collectionId}
      />
    </div>
  );
};

export default CollectionView;
