import React, { useState } from "react";
import FilterSection from "./FilterSection";
import ProductCard from "./ProductCard";
import { IconButton, useMediaQuery, useTheme, Divider, Drawer } from "@mui/material";
import FilterAlt from "@mui/icons-material/FilterAlt";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Pagination from "@mui/material/Pagination";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useNavigate, useParams } from "react-router-dom";

const Product = () => {
  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));
  const [sort, setSort] = useState();
  const [page, setPage] = useState(1);
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState();
  const { categoryId } = useParams();
  const handlePageChange = (value: number) => {
    setPage(value);
  };

  const navigate = useNavigate();

  const handleSortChange = () => {};

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    setShowBottomSheet(true);
  };

  const handleBottomSheetItemClick = (item) => {
    console.log("Bottom sheet item clicked:", item);

    // Close the bottom sheet when an item is clicked
    setShowBottomSheet(false);
  };

  const closeBottomSheet = () => {
    setShowBottomSheet(false);
  };

  return (
    <div className="z-10 mt-10">
      <div>
        <h1 className="text-xl sm:text-3xl text-center font-bold text-gray-700 pb-5 px-9 uppercase space-x-2">
          {categoryId}
        </h1>
      </div>

      <div className="lg:flex">
        <section className="hidden lg:block w-[20%]">
          <FilterSection />
        </section>
        <div className=" w-full lg:w-[80%]">
          <div className="w-full space-y-5">
            <div className="flex justify-between items-center px-3 h-[40px]">
              <div className=" relative w-[50%]">
                {!isLarge && (
                  <IconButton  onClick={() => {
                    handleCategoryClick(categoryId)
                  }}>
                    <FilterAlt />
                  </IconButton>
                )}
              </div>

              <FormControl
                fullWidth
                size="small"
                sx={{
                  width: { xs: "100px", sm: "200px" }, // 100% width on small screens, 200px on larger screens
                }}
              >
                <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={sort}
                  label="Sort By"
                  onChange={handleSortChange}
                >
                  <MenuItem value={"price_low"}>Price: Low To High</MenuItem>
                  <MenuItem value={"price_high"}>Price: High To Low</MenuItem>
                </Select>
              </FormControl>
            </div>
            <Divider />
            <section className="products_section grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-5 px-5 justify-center">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 2, 3, 4, 5, 6, 7, 8].map(
                (item) => (
                  <div onClick={() => navigate("/product-details/1/name/1")}>
                    <ProductCard key={item} />
                  </div>
                )
              )}
            </section>
            <div className="flex justify-center py-10">
              <Pagination
                onChange={(e, value) => handlePageChange(value)}
                variant="outlined"
                count={10}
                color="secondary"
              />
            </div>

            <Drawer
              anchor="bottom"
              open={showBottomSheet}
              onClose={closeBottomSheet}
              sx={{
                "& .MuiDrawer-paper": {
                  borderTopLeftRadius: 16,
                  borderTopRightRadius: 16,
                  padding: 2,
                  height: "90%", // Adjust height as needed
                },
              }}
            >
              <Box>
                <h2 className="font-bold text-lg mb-4">
                  Selected Category: {selectedCategory}
                </h2>
                {/* Pass closeBottomSheet function to CategorySheet */}
                <FilterSection selectedCategory={selectedCategory} />
              </Box>
            </Drawer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
