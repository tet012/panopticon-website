// FilterPanel.js
import React, { useState } from "react";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
  AdjustmentsHorizontalIcon,
} from "@heroicons/react/24/outline";

interface Traits {
  [key: string]: string;
}

interface FilterSet {
  [key: string]: Set<string>;
}

interface SidebarProps {
  tokenCounts: { [trait: string]: { [value: string]: number } };
  filters: { [key: string]: string[] };
  toggleAttributeVisibility: (trait: string) => void;
  visibleAttributes: { [key: string]: boolean };
  activeFilters: FilterSet;
  handleFilterChange: (trait: string, value: string, isActive: boolean) => void;
  paletteColors: { [key: string]: string[] };
  columnCount: number;
  setColumnCount: React.Dispatch<React.SetStateAction<number>>;
}

const Sidebar: React.FC<SidebarProps> = ({
  filters,
  toggleAttributeVisibility,
  visibleAttributes,
  activeFilters,
  handleFilterChange,
  paletteColors,
  tokenCounts,
  columnCount,
  setColumnCount,
}) => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const getTokenCount = (trait: string, value: string) => {
    return tokenCounts[trait]?.[value] || 0;
  };

  const toggleSidebarVisibility = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const [isSelectorVisible, setIsSelectorVisible] = useState(false);

  const toggleDisplaySelector = () => {
    setIsSelectorVisible(!isSelectorVisible);
  };

  // Function to handle slider change
  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColumnCount(Number(event.target.value));
  };

  return (
    <aside
      className={`sidebar ${
        isSidebarVisible ? "w-full" : "w-full "
      } flex flex-col `}
    >
      <div
        className={`justify-between align-center ${
          isSidebarVisible
            ? "flex"
            : "flex md:flex-col justify-center align-center items-middle"
        } `}
      >
        <button
          onClick={toggleSidebarVisibility}
          className="p-4 text-lg font-semibold self-center "
        >
          {isSidebarVisible ? (
            <ArrowLeftCircleIcon className="h-5 w-5" />
          ) : (
            <ArrowRightCircleIcon className="h-5 w-5" />
          )}
        </button>

        <div className="relative hover:bg-neutral-200">
          <button onClick={toggleDisplaySelector} className="p-4 ">
            <AdjustmentsHorizontalIcon className="h-5 w-5" />
          </button>

          {isSelectorVisible && (
            <div className="popup-class backdrop-blur-sm max-md:left-[-120%] left-2 absolute bg-neutral-50/50 shadow-2xl top-full mt-1 p-4 rounded-lg">
              <div className="whitespace-nowrap px-4">
                Columns: {columnCount}
              </div>

              <input
                type="range"
                min="1"
                max="8"
                value={columnCount}
                onChange={handleSliderChange}
                className="w-full"
              />
            </div>
          )}
        </div>
      </div>

      {isSidebarVisible && (
        <>
          {Object.keys(filters).map((trait) => (
            <div className="flex flex-col" key={trait}>
              <div
                className="flex whitespace-nowrap cursor-pointer items-center justify-between gap-32 hover:bg-neutral-200 hover:transition p-4"
                onClick={() => toggleAttributeVisibility(trait)}
              >
                <label className="font-semibold">{trait}</label>
                {visibleAttributes[trait] ? (
                  <ChevronDownIcon className="h-5 w-5" />
                ) : (
                  <ChevronRightIcon className="h-5 w-5" />
                )}
              </div>
              {visibleAttributes[trait] && (
                <div className="flex flex-col gap-2 border-t bg-neutral-200 p-2">
                  {filters[trait].map((value) => (
                    <div
                      className={`rounded-lg bg-neutral-50 px-2 py-4 shadow hover:transition hover:bg-neutral-300 ${
                        activeFilters[trait]?.has(value)
                          ? "border-2 border-neutral-800 shadow border-l-8 hover:transition"
                          : "border-2 border-neutral-50 hover:transition"
                      }`}
                      key={value}
                      onClick={() =>
                        handleFilterChange(
                          trait,
                          value,
                          !activeFilters[trait]?.has(value),
                        )
                      }
                    >
                      <div className="flex flex-col">
                        <span className="flex items-center gap-1 align-middle">
                          {value}{" "}
                          <span className="ml-auto text-neutral-400">
                            {getTokenCount(trait, value)}
                          </span>
                        </span>
                        {trait === "Palette" && paletteColors[value] && (
                          <div className="flex gap-1 mt-2">
                            {paletteColors[value].map((color) => (
                              <span
                                key={color}
                                className="inline-block w-4 h-4 rounded-sm shadow-md border border-neutral-500"
                                style={{ backgroundColor: color }}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </>
      )}
    </aside>
  );
};

export default Sidebar;
