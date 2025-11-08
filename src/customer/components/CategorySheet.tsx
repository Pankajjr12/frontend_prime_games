import React from "react";
import { pcLevelTwo } from "../../data/pc/levelTwoPc";
import { psLevelTwo } from "../../data/ps/levelTwoPs";
import { pcLevelThree } from "../../data/pc/levelThreePc";
import { psLevelThree } from "../../data/ps/levelThreePs";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { trendLevelThree } from "../../data/trending/levelThreeTrending";
import { trendingLevelTwo } from "../../data/trending/levelTwoTrending";
import { deviceTwo } from "../../data/appliances/deviceLlevelTwo";
import { deviceThree } from "../../data/appliances/deviceLevelThree";

// Category data mapping
const categoryTwo: { [key: string]: any[] } = {
  pc: pcLevelTwo,
  ps: psLevelTwo,
  trending: trendingLevelTwo,
  devices: deviceTwo, // Ensure 'deviceTwo' and 'trendingLevelTwo' are correctly mapped
};

const categoryThree: { [key: string]: any[] } = {
  pc: pcLevelThree,
  ps: psLevelThree,
  trending: trendLevelThree, // Ensure 'trendThree' and 'deviceThree' are correctly mapped
  devices: deviceThree,
};

// Function to get child categories based on parentCategoryId
const childCategory = (category: any, parentCategoryId: any) => {
  return category.filter(
    (child: any) => child.parentCategoryId === parentCategoryId
  );
};

const CategorySheet = ({ selectedCategory, setShowSheet }: any) => {
  const navigate = useNavigate();

  // Debugging log for category data
  console.log("Selected Category: ", selectedCategory);
  console.log("Category Two Data: ", categoryTwo[selectedCategory]);
  console.log("Category Three Data: ", categoryThree[selectedCategory]);

  // Conditional rendering for missing categories or data
  const categoryData = categoryTwo[selectedCategory];
  const categoryThreeData = categoryThree[selectedCategory];

  // Additional console log for debugging
  console.log("categoryData (level two): ", categoryData);
  console.log("categoryThreeData (level three): ", categoryThreeData);

  return (
    <Box
      sx={{ zIndex: 2 }}
      className="bg-white shadow-lg lg:h-[500px] overflow-y-auto"
    >
      <div className="flex text-sm flex-wrap">
        {categoryData && categoryData.length > 0 ? (
          categoryData.map((item: any, index: number) => (
            <div
              key={item.categoryId} // Added unique key based on categoryId
              className={`p-8 lg:w-[20%] ${
                index % 2 === 0 ? "bg-slate-50" : "bg-white"
              }`}
            >
              <div className="text-primary-color font-semibold mb-5">
                <div className="gradient-underline">
                  <span>{item.name}</span>
                </div>

                <ul className="space-y-3 mt-2">
                  {categoryThreeData && categoryThreeData.length > 0 ? (
                    childCategory(categoryThreeData, item.categoryId).map(
                      (childItem: any) => (
                        <li
                          key={childItem.categoryId}
                          onClick={() =>
                            navigate("/products/" + childItem.categoryId)
                          }
                          className="hover:text-primary-color text-black cursor-pointer"
                        >
                          {childItem.name}
                        </li>
                      )
                    )
                  ) : (
                    <li>No subcategories available</li>
                  )}
                </ul>
              </div>
            </div>
          ))
        ) : (
          <p>No categories available for this selection.</p>
        )}
      </div>
    </Box>
  );
};

export default CategorySheet;
