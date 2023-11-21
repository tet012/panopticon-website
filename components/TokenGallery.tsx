import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import { tokenData } from "../pages/api/tokens";
import useFilter from "../hooks/useFilter";
import palettes from "./atoms/palettes";
import Sidebar from "./molecules/Sidebar";
import Gallery from "./molecules/Gallery";

type Token = {
  image: string;
  traits: { [key: string]: string };
  id: number;
};

const TokenGallery = () => {
  const router = useRouter();
  const mutableTokenData = useMemo(() => [...tokenData], []);
  const [tokens, setTokens] = useState<Token[]>(mutableTokenData);
  const [tokenCounts, setTokenCounts] = useState<{
    [trait: string]: { [value: string]: number };
  }>({});
  const [filters, setFilters] = useState<{ [key: string]: string[] }>({});
  const [visibleAttributes, setVisibleAttributes] = useState<{
    [key: string]: boolean;
  }>({});
  const paletteColors = palettes;
  console.log("Rendering TokenGallery", { filters, visibleAttributes });

  const {
    activeFilters,
    handleFilterChange,
    tokens: filteredTokens,
  } = useFilter(mutableTokenData);

  useEffect(() => {
    const extractedFilters = mutableTokenData.reduce(
      (acc: { [key: string]: Set<string> }, token: Token) => {
        Object.keys(token.traits).forEach((trait) => {
          if (!acc[trait]) acc[trait] = new Set<string>();
          acc[trait].add(token.traits[trait]);
        });
        return acc;
      },
      {} as { [key: string]: Set<string> },
    );

    const filterArray: { [key: string]: string[] } = {};
    for (const key in extractedFilters) {
      filterArray[key] = Array.from(extractedFilters[key]);
    }

    setFilters(filterArray);
  }, []);

  useEffect(() => {
    const counts: { [trait: string]: { [value: string]: number } } = {};
    mutableTokenData.forEach((token) => {
      Object.entries(token.traits).forEach(([trait, value]) => {
        if (!counts[trait]) {
          counts[trait] = {};
        }
        if (!counts[trait][value]) {
          counts[trait][value] = 0;
        }
        counts[trait][value]++;
      });
    });

    setTokenCounts(counts);
  }, []);

  const handleTokenClick = (tokenId: number) => {
    router.push(`/token/${tokenId}`);
  };

  const toggleAttributeVisibility = (trait: string) => {
    setVisibleAttributes((prevVisibleAttributes) => ({
      ...prevVisibleAttributes,
      [trait]: !prevVisibleAttributes[trait],
    }));
  };

  const [columnCount, setColumnCount] = useState(4); // Default to 4 columns

  return (
    <div className="max-md:flex-col flex border-b border-t">
      <div className="h-content border-r">
        <Sidebar
          filters={filters}
          toggleAttributeVisibility={toggleAttributeVisibility}
          visibleAttributes={visibleAttributes}
          activeFilters={activeFilters}
          handleFilterChange={handleFilterChange}
          paletteColors={paletteColors}
          tokenCounts={tokenCounts}
          columnCount={columnCount}
          setColumnCount={setColumnCount} // Pass the setter function to Sidebar
        />
      </div>
      <Gallery
        tokens={filteredTokens} // Use filtered tokens here
        handleTokenClick={handleTokenClick}
        columnCount={columnCount} // Pass the column count to Gallery
      />
    </div>
  );
};

export default TokenGallery;
