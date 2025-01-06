import React, { useState, useEffect } from "react";
import FilterSection from "./FilterSection";
import ProductCard from "./ProductCard";
import {
  IconButton,
  useMediaQuery,
  useTheme,
  Divider,
  Drawer,
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Pagination,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import FilterAlt from "@mui/icons-material/FilterAlt";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../state/store";
import { getAllProducts } from "../../../state/Customer/productSlice";
import notfound from "../../../assests/animation.gif";

const Product = () => {
  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const [showFilter, setShowFilter] = useState(false);
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState();
  const { categoryId } = useParams();
  const dispatch = useAppDispatch();
  const [hoveredCategory, setHoveredCategory] = useState("");
  const { products } = useAppSelector((store) => store);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSortChange = (event: SelectChangeEvent) => {
    setSort(event.target.value as string);
  };

  const handlePageChange = (value: number) => {
    setPage(value);
  };

  const navigate = useNavigate();

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    setShowBottomSheet(true);
  };

  const handleBottomSheetItemClick = (item) => {
    setShowBottomSheet(false);
  };

  const closeBottomSheet = () => {
    setShowBottomSheet(false);
  };

  useEffect(() => {
    const [minPrice, maxPrice] = searchParams.get("price")?.split("-") || [];
    const newFilters = {
      brand: searchParams.get("brand") || "",
      years: searchParams.get("year") || "",
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
      pageNumber: page - 1,
      minDiscount: searchParams.get("discount")
        ? Number(searchParams.get("discount"))
        : undefined,
    };

    dispatch(getAllProducts({ category: categoryId, sort, ...newFilters }));
  }, [searchParams, categoryId, sort, page]);

  return (
    <div className="z-10 mt-10">
      <div>
        <h1
          className="lg:text-2xl text-lg text-center font-bold text-gray-700  uppercase space-x-2"
          style={{ minHeight: "2.5rem" }} // or adjust this value to match your needs
        >
          {hoveredCategory || "\u00A0"} {/* Non-breaking space if empty */}
        </h1>
      </div>

      <div className="lg:flex">
        <section className="hidden lg:block w-[20%] ">
          <FilterSection />
        </section>

        <div className="w-full lg:w-[80%]">
          <div className="w-full">
            <div className="flex justify-between items-center h-[40px]">
              <div className="relative w-[50%]">
                {!isLarge && (
                  <IconButton
                    onClick={() => {
                      handleCategoryClick(categoryId);
                    }}
                    sx={{ fontSize: "2rem", color: "text.primary" }}
                  >
                    <FilterAlt />
                  </IconButton>
                )}
                {showFilter && !isLarge && (
                  <Box sx={{ zIndex: 3 }} className="absolute top-[60px]">
                    <FilterSection />
                  </Box>
                )}
              </div>

              <FormControl
                fullWidth
                size="small"
                sx={{
                  width: { xs: "100px", sm: "200px" },
                  zIndex: 0,
                }}
              >
                <InputLabel id="sort-label">Sort By</InputLabel>
                <Select
                  labelId="sort-label"
                  id="sort-select"
                  value={sort}
                  label="Sort By"
                  onChange={handleSortChange}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        zIndex: 1,
                      },
                    },
                  }}
                >
                  <MenuItem value={"price_low"}>Price: Low To High</MenuItem>
                  <MenuItem value={"price_high"}>Price: High To Low</MenuItem>
                </Select>
              </FormControl>
            </div>

            {/* Divider with consistent styling */}
            <Divider sx={{ marginY: 2 }} />

            {products.products?.length > 0 ? (
              <section className="grid sm:grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 p-5 justify-center">
                {products.products.map((item, index) => (
                  <div key={index} className="transition-all hover:scale-105">
                    <ProductCard
                      item={item}
                      onHoverCategory={setHoveredCategory}
                    />
                  </div>
                ))}
              </section>
            ) : (
              <section className="flex flex-col items-center justify-center h-[67vh] border gap-5">
                <img className="w-80" src={notfound} alt="Not Found" />
                <h1 className="font-bold text-base sm:text-xl text-center">
                  Product Not Found For{" "}
                  <span className="text-primary-color">
                    {categoryId?.split("_").map((item, index) => (
                      <span key={index} className="whitespace-nowrap">
                        {item}
                      </span>
                    ))}
                  </span>
                </h1>
              </section>
            )}

            <div className="flex justify-center py-10">
              <Pagination
                onChange={(e, value) => handlePageChange(value)}
                variant="outlined"
                color="secondary"
                count={products?.totalPages}
                sx={{
                  "& .MuiPaginationItem-root": {
                    color: theme.palette.primary.main,
                  },
                }}
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
                  height: "60%",
                  zIndex: 2,
                },
              }}
            >
              <Box>
                <h2 className="font-bold text-lg mb-4">
                  Selected Category: {selectedCategory}
                </h2>
                <FilterSection
                  selectedCategory={selectedCategory}
                  setShowSheet={setShowBottomSheet}
                />
              </Box>
            </Drawer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
