import { useState, useEffect, useCallback } from "react";

type Token = {
  id: number;
  image: string;
  traits: { [key: string]: string };
};

const useTokenFilter = (initialData: Token[]) => {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [filters, setFilters] = useState<{ [key: string]: string[] }>({});
  const [activeFilters, setActiveFilters] = useState<{
    [key: string]: Set<string>;
  }>({});

  // Extract filters from initial data
  useEffect(() => {
    const extractedFilters = initialData.reduce(
      (acc: { [key: string]: Set<string> }, token) => {
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
  }, [initialData]);

  // Apply filters to data
  const applyFilters = useCallback(() => {
    let filteredData = initialData.filter((item) => {
      return Object.entries(activeFilters).every(([key, valueSet]) => {
        return valueSet.size === 0 || valueSet.has(item.traits[key]);
      });
    });

    setTokens(filteredData);
  }, [activeFilters, initialData]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  // Functions to handle active filters
  const handleFilterChange = useCallback(
    (trait: string, value: string, isActive: boolean) => {
      setActiveFilters((prevFilters) => {
        const newFilters = { ...prevFilters };
        if (isActive) {
          if (!newFilters[trait]) newFilters[trait] = new Set();
          newFilters[trait].add(value);
        } else {
          newFilters[trait]?.delete(value);
          if (newFilters[trait]?.size === 0) delete newFilters[trait];
        }
        return newFilters;
      });
    },
    [],
  );

  const removeFilter = useCallback((trait: string) => {
    setActiveFilters((prevFilters) => {
      const newFilters = { ...prevFilters };
      delete newFilters[trait];
      return newFilters;
    });
  }, []);

  const clearAllFilters = useCallback(() => {
    setActiveFilters({});
  }, []);

  // Sorting functionality
  const sortTokens = useCallback((direction: string) => {
    setTokens((prevTokens) => {
      return [...prevTokens].sort((a, b) => {
        return direction === "asc" ? a.id - b.id : b.id - a.id;
      });
    });
  }, []);

  return {
    tokens,
    filters,
    activeFilters,
    handleFilterChange,
    removeFilter,
    clearAllFilters,
    sortTokens,
  };
};

export default useTokenFilter;
