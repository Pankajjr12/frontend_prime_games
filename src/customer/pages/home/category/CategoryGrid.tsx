import React from "react";
import { useAppSelector } from "../../../../state/store";

const CategoryGrid = () => {
  const homePage = useAppSelector((state) => state.homePage);

  // 🔧 Normalize structure
  const rawGrid = homePage.homePageData?.grid;
  const grid =
    Array.isArray(rawGrid) && Array.isArray(rawGrid[1])
      ? rawGrid[1] // pick the inner array
      : Array.isArray(rawGrid)
      ? rawGrid
      : [];

  if (!grid.length) {
    console.log("Grid is empty or misformatted", rawGrid);
    return <div>Loading categories...</div>;
  }

  return (
    <div className="grid gap-1 sm:gap-2 md:gap-4 grid-rows-12 grid-cols-12 sm:grid-cols-6 md:grid-cols-12 h-[300px] sm:h-[400px] md:h-[600px] px-5 sm:px-6 lg:px-10">
      <div className="col-span-3 row-span-12 text-white">
        <img className="w-full h-full object-cover rounded-md" src={grid[3]?.image} alt={grid[3]?.name} />
      </div>
      <div className="col-span-2 row-span-6 text-white">
        <img className="w-full h-full object-cover rounded-md" src={grid[1]?.image} alt={grid[1]?.name} />
      </div>
      <div className="col-span-4 row-span-6 text-white">
        <img className="w-full h-full object-cover rounded-md" src={grid[2]?.image} alt={grid[2]?.name} />
      </div>
      <div className="col-span-3 row-span-12 text-white">
        <img className="w-full h-full object-cover rounded-md" src={grid[0]?.image} alt={grid[0]?.name} />
      </div>
      <div className="col-span-4 row-span-6 text-white">
        <img className="w-full h-full object-cover rounded-md" src={grid[4]?.image} alt={grid[4]?.name} />
      </div>
      <div className="col-span-2 row-span-6 text-white">
        <img className="w-full h-full object-cover rounded-md" src={grid[5]?.image} alt={grid[5]?.name} />
      </div>
    </div>
  );
};

export default CategoryGrid;
