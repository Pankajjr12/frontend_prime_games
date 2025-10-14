import React from "react";
import { useAppSelector } from "../../../../state/store";

const CategoryGrid = () => {
// ✅ GOOD
const homePage = useAppSelector((state) => state.homePage);

  
  return (
    <div className="grid gap-1 sm:gap-2 md:gap-4 grid-rows-12 grid-cols-12 sm:grid-cols-6 md:grid-cols-12 h-[300px] sm:h-[400px] md:h-[600px] px-5 sm:px-6 lg:px-10">
      <div className="col-span-3 row-span-12 text-white">
        <img
          className="w-full h-full object-cover object-top rounded-md"
          src={homePage.homePageData?.grid[3].image}
        />
      </div>

      <div className="col-span-2 row-span-6 text-white">
        <img
          className="w-full h-full object-cover object-top rounded-md"
          src={homePage.homePageData?.grid[1].image}
        />
      </div>
      <div className="col-span-4 row-span-6 text-white">
        <img
          className="w-full h-full object-cover object-top rounded-md"
          src={homePage.homePageData?.grid[2].image}
        />
      </div>
      <div className="col-span-3 row-span-12 text-white ">
        <img
          className="w-full h-full object-cover object-top rounded-md"
          src={homePage.homePageData?.grid[0].image}
        />
      </div>
      <div className="col-span-4 row-span-6 text-white">
        <img
          className="w-full h-full object-cover object-top rounded-md"
          src={homePage.homePageData?.grid[4].image}
        />
      </div>
      <div className="col-span-2 row-span-6 text-white">
        <img
          className="w-full h-full object-cover object-top rounded-md"
          src={homePage.homePageData?.grid[5].image}
        />
      </div>
    </div>
  );
};

export default CategoryGrid;
