import { useState, useEffect, useCallback } from "react";

type Token = {
  id: number;
  image: string;
  traits?: Record<string, string>;
  attributes?: Array<{ trait_type: string; value: string }>;
};

const useFilter = (initialData: Token[]) => {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [filters, setFilters] = useState<{ [key: string]: string[] }>({});
  const [activeFilters, setActiveFilters] = useState<{
    [key: string]: Set<string>;
  }>({});

  useEffect(() => {
    const extractedFilters: { [key: string]: Set<string> } = {};

    initialData.forEach((token) => {
      const traitsOrAttributes =
        token.traits ||
        token.attributes?.reduce(
          (acc, attr) => {
            acc[attr.trait_type] = attr.value;
            return acc;
          },
          {} as Record<string, string>,
        ) ||
        {};

      Object.keys(traitsOrAttributes).forEach((trait) => {
        if (!extractedFilters[trait])
          extractedFilters[trait] = new Set<string>();
        extractedFilters[trait].add(traitsOrAttributes[trait]);
      });
    });

    const filterArray: { [key: string]: string[] } = {};
    Object.keys(extractedFilters).forEach((key) => {
      filterArray[key] = Array.from(extractedFilters[key]);
    });

    setFilters(filterArray);
  }, [initialData]);

  const applyFilters = useCallback(() => {
    let filteredData = initialData.filter((token) => {
      const traitsOrAttributes =
        token.traits ||
        token.attributes?.reduce(
          (acc, attr) => {
            acc[attr.trait_type] = attr.value;
            return acc;
          },
          {} as Record<string, string>,
        ) ||
        {};

      return Object.entries(activeFilters).every(([key, valueSet]) => {
        return valueSet.size === 0 || valueSet.has(traitsOrAttributes[key]);
      });
    });

    setTokens(filteredData);
  }, [activeFilters, initialData]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

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

  const sortTokens = useCallback((direction: "asc" | "desc") => {
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

export default useFilter;
