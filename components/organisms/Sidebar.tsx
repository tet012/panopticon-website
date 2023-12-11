// FilterPanel.js
import React, { useState, useRef, useEffect } from "react";
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
    setIsSelectorVisible((prev) => !prev);
  };

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColumnCount(Number(event.target.value));
  };

  const popupRef = useRef<HTMLDivElement>(null); // Specifying the type as HTMLDivElement

  const closePopup = (event: MouseEvent) => {
    if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
      setIsSelectorVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", closePopup);
    return () => {
      document.removeEventListener("mousedown", closePopup);
    };
  }, []);

  return (
    <aside
      className={`sidebar rounded-lg 
      ${
        isSidebarVisible ? "w-full" : "w-full "
      } flex flex-col sticky top-0 z-40 `}
    >
      <div
        className={`justify-between rounded-t-lg align-center ${
          isSidebarVisible
            ? "flex border-b border-neutral-300"
            : "flex md:flex-col justify-center align-center items-middle "
        } `}
      >
        <button
          onClick={toggleSidebarVisibility}
          className={`p-4 text-lg font-semibold self-center hover:bg-neutral-200 transition rounded-t-lg 
          ${isSidebarVisible ? "" : "border-b border-neutral-300"} `}
        >
          {isSidebarVisible ? (
            <ArrowLeftCircleIcon className="h-5 w-5" />
          ) : (
            <ArrowRightCircleIcon className="h-5 w-5" />
          )}
        </button>

        <div className="relative hover:bg-neutral-200 transition rounded-b-lg">
          <button onClick={toggleDisplaySelector} className="p-4 ">
            <AdjustmentsHorizontalIcon className="h-5 w-5" />
          </button>

          {isSelectorVisible && (
            <div
              ref={popupRef}
              className="popup-class backdrop-blur-sm max-md:left-[-250%] left-2 absolute  shadow-2xl top-full mt-1 p-4 rounded-lg "
            >
              <div className="whitespace-nowrap px-4 ">
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
                className="flex whitespace-nowrap cursor-pointer border-b border-neutral-200  items-center justify-between gap-32 hover:bg-neutral-200 hover:transition p-4"
                onClick={() => toggleAttributeVisibility(trait)}
              >
                <label className="font-semibold capitalize ">{trait}</label>
                {visibleAttributes[trait] ? (
                  <ChevronDownIcon className="h-5 w-5" />
                ) : (
                  <ChevronRightIcon className="h-5 w-5" />
                )}
              </div>
              {visibleAttributes[trait] && (
                <div className="flex flex-col gap-2 border-t bg-neutral-200 p-2 ">
                  {filters[trait].map((value) => (
                    <div
                      className={`rounded-xl bg-neutral-100 px-2 py-4 shadow cursor-pointer border-2 border-neutral-50 hover:transition hover:bg-neutral-300 ${
                        activeFilters[trait]?.has(value)
                          ? "border-2 border-neutral-900 shadow border-l-8 hover:transition"
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
          <button
            onClick={toggleSidebarVisibility}
            className="md:hidden fixed bottom-2 margin-auto self-center shadow-2xl bg-blue-600 text-white p-4 rounded-xl w-11/12"
          >
            Close
          </button>
        </>
      )}
    </aside>
  );
};

export default Sidebar;
