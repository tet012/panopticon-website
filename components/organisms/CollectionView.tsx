import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import { panopticonTokens } from "../../pages/api/panopticonTokens";
import { creepzTokens } from "../../pages/api/creepzTokens";
import { raeminiscenceTokens } from "../../pages/api/raeminiscenceTokens";
import { presenceTokens } from "../../pages/api/presenceTokens";
import useTokenFilter from "../../hooks/useFilter";
import palettes from "../atoms/palettes";
import Sidebar from "./Sidebar";
import Gallery from "./Gallery";
import { foundersTokens } from "../../pages/api/foundersTokens";
import NavBar from "./NavBar";

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
  const [sortOrder, setSortOrder] = useState("ascending");
  const [isRandomized, setIsRandomized] = useState(false);

  const router = useRouter();
  const tokenData = useMemo(() => {
    switch (collectionId) {
      case "panopticon":
        return panopticonTokens;
      case "creepz":
        return creepzTokens;
      case "raeminiscence":
        return raeminiscenceTokens;
      case "presence":
        return presenceTokens;
      case "founders":
        return foundersTokens;
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
    const query = router.query;

    const filter = Array.isArray(query.filter) ? query.filter[0] : query.filter;
    const value = Array.isArray(query.value) ? query.value[0] : query.value;

    if (filter && value) {
      handleFilterChange(filter, value, true);
    }
  }, [router.query]);

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

    const initialCounts: CountType = {};

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

  const toggleRandomization = () => {
    setIsRandomized(!isRandomized);
  };

  return (
    <div className="max-md:flex-col flex gap-2">
      {shouldDisplaySidebar && (
        <div className="h-fit rounded-lg sticky top-2 z-40">
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
            setSortOrder={setSortOrder}
            toggleRandomization={toggleRandomization}
          />
        </div>
      )}
      <Gallery
        tokens={filteredTokens as Token[]}
        handleTokenClick={handleTokenClick}
        columnCount={columnCount}
        collectionId={collectionId}
        sortOrder={sortOrder}
        isRandomized={isRandomized}
      />
    </div>
  );
};

export default CollectionView;
