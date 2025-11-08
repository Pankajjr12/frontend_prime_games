import React, { useMemo } from "react";
import { useAppSelector } from "../../../../state/store";

const shuffleArray = (array: any[]) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const CategoryGrid = () => {
  const homePage = useAppSelector((state) => state.homePage);

  const rawGrid = homePage.homePageData?.grid;
  const grid =
    Array.isArray(rawGrid) && Array.isArray(rawGrid[1])
      ? rawGrid[1]
      : Array.isArray(rawGrid)
      ? rawGrid
      : [];

  // ✅ Shuffle only on first render
  const shuffledGrid = useMemo(() => shuffleArray(grid), [grid]);

  if (!shuffledGrid.length) {
    console.log("Grid is empty or misformatted", rawGrid);
    return <div>Loading categories...</div>;
  }

  return (
    <div className="grid gap-1 sm:gap-2 md:gap-4 grid-rows-12 grid-cols-12 sm:grid-cols-6 md:grid-cols-12 h-[300px] sm:h-[400px] md:h-[600px] px-5 sm:px-6 lg:px-10">
      <div className="col-span-3 row-span-12 text-white">
        <img className="w-full h-full object-cover rounded-md" src={shuffledGrid[3]?.image} alt={shuffledGrid[3]?.name} />
      </div>
      <div className="col-span-2 row-span-6 text-white">
        <img className="w-full h-full object-cover rounded-md" src={shuffledGrid[1]?.image} alt={shuffledGrid[1]?.name} />
      </div>
      <div className="col-span-4 row-span-6 text-white">
        <img className="w-full h-full object-cover rounded-md" src={shuffledGrid[2]?.image} alt={shuffledGrid[2]?.name} />
      </div>
      <div className="col-span-3 row-span-12 text-white">
        <img className="w-full h-full object-cover rounded-md" src={shuffledGrid[0]?.image} alt={shuffledGrid[0]?.name} />
      </div>
      <div className="col-span-4 row-span-6 text-white">
        <img className="w-full h-full object-cover rounded-md" src={shuffledGrid[4]?.image} alt={shuffledGrid[4]?.name} />
      </div>
      <div className="col-span-2 row-span-6 text-white">
        <img className="w-full h-full object-cover rounded-md" src={shuffledGrid[5]?.image} alt={shuffledGrid[5]?.name} />
      </div>
    </div>
  );
};

export default CategoryGrid;
