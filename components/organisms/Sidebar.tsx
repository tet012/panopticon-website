// FilterPanel.js
import React, { useState, useRef, useEffect } from "react";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
  ArrowPathRoundedSquareIcon,
  AdjustmentsHorizontalIcon,
  BarsArrowDownIcon,
  BarsArrowUpIcon,
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
  setSortOrder: React.Dispatch<React.SetStateAction<string>>;
  toggleRandomization: () => void;
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
  setSortOrder,
  toggleRandomization,
}) => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const getTokenCount = (trait: string, value: string) => {
    return tokenCounts[trait]?.[value] || 0;
  };

  const toggleSidebarVisibility = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const [isSelectorVisible, setIsSelectorVisible] = useState(false);

  const toggleDisplaySelector = (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevents the event from propagating up to the document
    setIsSelectorVisible((prev) => !prev);
  };

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColumnCount(Number(event.target.value));
  };

  const popupRef = useRef<HTMLDivElement>(null); // Specifying the type as HTMLDivElement

  const closePopup = (event: MouseEvent) => {
    if (
      popupRef.current &&
      !popupRef.current.contains(event.target as Node) &&
      event.target !== toggleButtonRef.current // Add this line
    ) {
      setIsSelectorVisible(false);
    }
  };

  // Add a ref for the toggle button
  const toggleButtonRef = useRef<HTMLButtonElement>(null);

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
      } flex flex-col gap-2 sticky top-0 z-40 `}
    >
      <div
        className={`justify-between bg-neutral-100 rounded-lg align-center ${
          isSidebarVisible
            ? "flex"
            : "flex md:flex-col justify-center align-center items-middle "
        } `}
      >
        <button
          onClick={toggleSidebarVisibility}
          className={`group p-4 text-lg font-semibold self-center hover:bg-neutral-200 transition rounded-t-lg 
          ${
            isSidebarVisible
              ? ""
              : "max-md:border-0 border-b border-neutral-300"
          } `}
        >
          <ArrowRightCircleIcon
            className={`h-5 w-5 group-hover:text-neutral-800 text-neutral-500 transition ${
              isSidebarVisible ? "rotate-180" : ""
            } `}
          />
        </button>
        <div className="hover:bg-neutral-200 transition rounded-b-lg">
          <button
            ref={toggleButtonRef}
            onClick={toggleDisplaySelector}
            className="group p-4 "
          >
            <AdjustmentsHorizontalIcon className="h-5 w-5 group-hover:text-neutral-800 text-neutral-500" />
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

      <div
        className={`justify-between bg-neutral-100 rounded-lg align-center overflow-hidden ${
          isSidebarVisible
            ? "flex "
            : "flex md:flex-col justify-center align-center items-middle "
        } `}
      >
        <button
          onClick={() => setSortOrder("ascending")}
          className={`group p-4 text-lg font-semibold self-center hover:bg-neutral-200 transition rounded-t-lg 
          ${
            isSidebarVisible
              ? ""
              : "max-md:border-0 border-b border-neutral-300"
          } `}
        >
          <BarsArrowUpIcon className="h-5 w-5 group-hover:text-neutral-800 text-neutral-500" />
        </button>
        <button
          onClick={() => setSortOrder("descending")}
          className={`group p-4 text-lg font-semibold self-center hover:bg-neutral-200 transition 
          ${
            isSidebarVisible
              ? ""
              : "max-md:border-0 border-b border-neutral-300"
          } `}
        >
          <BarsArrowDownIcon className="h-5 w-5 group-hover:text-neutral-800 text-neutral-500" />
        </button>
        <button
          onClick={toggleRandomization}
          className="group hover:bg-neutral-200 transition p-4"
        >
          <ArrowPathRoundedSquareIcon className="h-5 w-5 group-hover:text-neutral-800 text-neutral-500" />
        </button>
      </div>

      {isSidebarVisible && (
        <>
          {Object.keys(filters).map((trait) => (
            <div
              className="flex rounded-lg overflow-hidden flex-col"
              key={trait}
            >
              <div
                className="group flex whitespace-nowrap cursor-pointer bg-neutral-100 items-center justify-between gap-32 hover:bg-neutral-200 transition p-4"
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
                <div className="flex flex-col gap-2 bg-neutral-200 p-2 ">
                  {filters[trait].map((value) => (
                    <div
                      className={`group rounded-xl bg-neutral-100 px-2 py-4 shadow cursor-pointer border-2 border-neutral-50 hover:transition hover:bg-neutral-300 ${
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
