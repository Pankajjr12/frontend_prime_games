import React from "react";
import { pcLevelTwo } from "../../data/pc/levelTwoPc";
import { psLevelTwo } from "../../data/ps/levelTwoPs";
import { pcLevelThree } from "../../data/pc/levelThreePc";
import { psLevelThree } from "../../data/ps/levelThreePs";
import { Box } from "@mui/material";
import zIndex from "@mui/material/styles/zIndex";
import { useNavigate } from "react-router-dom";

const categoryThree: { [key: string]: any[] } = {
  pc: pcLevelThree,
  ps: psLevelThree,
};

const categoryTwo: { [key: string]: any[] } = {
  pc: pcLevelTwo,
  ps: psLevelTwo,
};

const childCategory = (category: any, parentCategoryId: any) => {
  return category.filter(
    (child: any) => child.parentCategoryId == parentCategoryId
  );
};

const CategorySheet = ({ selectedCategory, setShowSheet }: any) => {

  const navigate = useNavigate();
  return (
    <Box
      sx={{ zIndex: 2 }}
      className="bg-white shadow-lg lg:h-[500px] overflow-y-auto"
    >
      <div className="flex text-sm flex-wrap">
        {categoryTwo[selectedCategory]?.map((item: any, index) => (
          <div
            className={`p-8 lg:w-[20%] ${
              index % 2 == 0 ? "bg-slate-50" : "bg-white"
            }`}
          >
            <p className="text-primary-color font-semibold mb-5">
              <div className="gradient-underline">
                <span>{item.name}</span>
              </div>

              <ul className="space-y-3 mt-2">
                {childCategory(
                  categoryThree[selectedCategory],
                  item.categoryId
                ).map((item: any) => (
                  <div>
                    <li onClick={()=>navigate("/products/"+item.categoryId)} className="hover:text-primary-color text-black cursor-pointer">
                      {item.name}
                    </li>
                  </div>
                ))}
              </ul>
            </p>
          </div>
        ))}
      </div>
    </Box>
  );
};

export default CategorySheet;
