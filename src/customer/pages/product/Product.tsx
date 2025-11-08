import React, { useState, useEffect, useCallback, useMemo } from "react";
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
} from "@mui/material";
import FilterAlt from "@mui/icons-material/FilterAlt";
import { useParams, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../state/store";
import { getAllProducts } from "../../../state/Customer/productSlice";
import notfound from "../../../assests/animation.gif";

const Product = () => {
  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));
  const [sort, setSort] = useState<string>("");
  const [page, setPage] = useState(1);
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>();
  const { categoryId } = useParams();
  const dispatch = useAppDispatch();
  const [hoveredCategory, setHoveredCategory] = useState("");
  const [searchParams] = useSearchParams();

  const { products, loading, totalPages } = useAppSelector((store) => store.products);

  const handleSortChange = useCallback((event) => {
    setSort(event.target.value as string);
  }, []);

  const handlePageChange = useCallback((_: any, value: number) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleCategoryClick = useCallback((id: string) => {
    setSelectedCategory(id);
    setShowBottomSheet(true);
  }, []);

  const closeBottomSheet = useCallback(() => setShowBottomSheet(false), []);

  const filters = useMemo(() => {
    const [minPrice, maxPrice] = searchParams.get("price")?.split("-") || [];
    return {
      brand: searchParams.get("brand") || "",
      years: searchParams.get("year") || "",
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
      minDiscount: searchParams.get("discount")
        ? Number(searchParams.get("discount"))
        : undefined,
    };
  }, [searchParams]);

  // ✅ Always fetch fresh data (auto refresh on back navigation)
  useEffect(() => {
    dispatch(
      getAllProducts({
        category: categoryId,
        sort,
        pageNumber: page - 1,
        ...filters,
      })
    );
  }, [dispatch, categoryId, sort, page, filters]);

  const productList = products || [];
  const hasProducts = productList.length > 0;

  return (
    <div className="z-10 mt-10">
      <h1 className="lg:text-2xl text-lg text-center font-bold text-gray-700 uppercase min-h-[2.5rem]">
        {hoveredCategory || "\u00A0"}
      </h1>

      <div className="lg:flex">
        {isLarge && (
          <aside className="w-[20%]">
            <FilterSection />
          </aside>
        )}

        <main className="w-full lg:w-[80%]">
          <div className="flex justify-between items-center h-[40px]">
            {!isLarge && (
              <IconButton onClick={() => handleCategoryClick(categoryId!)}>
                <FilterAlt />
              </IconButton>
            )}

            <FormControl fullWidth size="small" sx={{ width: { xs: "120px", sm: "200px" } }}>
              <InputLabel id="sort-label" className="z-20">Sort By</InputLabel>
              <Select labelId="sort-label" value={sort} onChange={handleSortChange}>
                <MenuItem value="price_low">Price: Low To High</MenuItem>
                <MenuItem value="price_high">Price: High To Low</MenuItem>
              </Select>
            </FormControl>
          </div>

          <Divider sx={{ marginY: 2 }} />

          {/* ✅ Show loading while fetching */}
          {loading ? (
            <div className="flex items-center justify-center h-[60vh]">
              <h2 className="text-lg font-semibold text-gray-600 animate-pulse">
                Loading Products...
              </h2>
            </div>
          ) : hasProducts ? (
            <section className="grid sm:grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 p-5 justify-center">
              {productList.map((item) => (
                <div key={item.id} className="transition-all hover:scale-105">
                  <ProductCard item={item} onHoverCategory={setHoveredCategory} />
                </div>
              ))}
            </section>
          ) : (
            <section className="flex flex-col items-center justify-center h-[67vh] border gap-5">
              <img className="w-80" src={notfound} alt="Not Found" />
              <h1 className="font-bold text-base sm:text-xl text-center">
                Product Not Found For{" "}
                <span className="text-primary-color">
                  {categoryId?.split("_").join(" ")}
                </span>
              </h1>
            </section>
          )}

          <div className="flex justify-center py-10">
            <Pagination
              onChange={handlePageChange}
              variant="outlined"
              color="secondary"
              count={totalPages}
            />
          </div>

          {/* Bottom Filter Drawer */}
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
              },
            }}
          >
            <Box>
              <h2 className="font-bold text-lg mb-4">
                Selected Category: {selectedCategory}
              </h2>
              <FilterSection selectedCategory={selectedCategory} setShowSheet={setShowBottomSheet} />
            </Box>
          </Drawer>
        </main>
      </div>
    </div>
  );
};

export default Product;
