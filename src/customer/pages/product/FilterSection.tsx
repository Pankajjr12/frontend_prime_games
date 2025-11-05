import React, { useState, useEffect } from "react";
import {
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { teal } from "@mui/material/colors";
import { byYear } from "../../../data/filter/byYear";
import { price } from "../../../data/filter/price";
import { discount } from "../../../data/filter/discount";
import { useSearchParams } from "react-router-dom";
import { Product } from "../../../types/productTypes";
import { useAppSelector } from "../../../state/store";
 // Assuming you have this hook for accessing the store

const FilterSection = ({ selectedCategory, setShowSheet }: any) => {
  const [yearExpand, setYearExpand] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const { products } = useAppSelector((store) => store.products);  // Assuming `store.products` holds the product data
  // Get products from Redux store

  // Toggle year expand
  const toggleYearExpand = () => {
    setYearExpand((prev) => !prev);
  };

  // Update filter params based on user selection
  const updateFilterParams = (e: any) => {
    const { value, name } = e.target;
    if (value) {
      searchParams.set(name, value);
    } else {
      searchParams.delete(name);
    }
    setSearchParams(searchParams);
  };

  // Clear all filters
  const clearAllFilters = () => {
    searchParams.forEach((value: any, key: any) => {
      searchParams.delete(key);
    });
    setSearchParams(searchParams);
  };

  // Filter products based on current filters
  const filterProducts = () => {
    let filtered = [...products]; // Create a shallow copy of products
  
    searchParams.forEach((value, key) => {
      filtered = filtered.filter((product: Product) => {
        if (
          key === "year" &&
          ((Array.isArray(product.years) && product.years.includes(value)) ||
            product.years === value)
        ) {
          return true;
        }
        if (key === "price" && product.mrpPrice <= parseInt(value)) {
          return true;
        }
        if (key === "discount" && product.discountPercent === parseInt(value)) {
          return true;
        }
        return false;
      });
    });
  
    setFilteredProducts(filtered);
  };
  

  // Run the filtering logic whenever the products or searchParams change
  useEffect(() => {
    filterProducts();
  }, [products, searchParams]);

  // Get the count of filtered products
  const getFilteredProductsCount = () => {
    return filteredProducts.length;
  };

  return (
    <div className="z-50 space-y-5 bg-white">
      <div className="flex items-center justify-between h-[40px] px-8 lg:border-r">
        <p className="text-lg font-semibold">Filters</p>
        <Button
          size="small"
          onClick={clearAllFilters}
          className="text-teal-500 cursor-pointer font-semibold"
        >
          Clear all
        </Button>
      </div>
      <Divider />
      <div className="px-9 space-y-5">
        <section>
          <FormControl>
            <FormLabel
              sx={{
                fontSize: "15px",
                fontWeight: "bold",
                color: teal[500],
                pb: "14px",
              }}
              id="color"
              className="text-2xl font-semibold"
            >
              Year By Category
            </FormLabel>
            <RadioGroup
              aria-labelledby="year"
              defaultValue=""
              name="year"
              onChange={updateFilterParams}
            >
              {byYear
                .slice(0, yearExpand ? byYear.length : 5)
                .map((year, index) => (
                  <FormControlLabel
                    key={index}
                    value={year.value}
                    control={<Radio />}
                    label={year.label}
                  />
                ))}
            </RadioGroup>
            <Button onClick={toggleYearExpand}>
              {yearExpand ? "Show Less" : "Show More"}
            </Button>
          </FormControl>
        </section>
        <Divider />
        <section>
          <FormControl>
            <FormLabel
              sx={{
                fontSize: "15px",
                fontWeight: "bold",
                pb: "14px",
                color: teal[400],
              }}
              className="text-2xl font-semibold"
              id="price"
            >
              Price
            </FormLabel>
            <RadioGroup
              name="price"
              onChange={updateFilterParams}
              aria-labelledby="price"
              defaultValue=""
            >
              {price.map((item) => (
                <FormControlLabel
                  key={item.name}
                  value={item.value}
                  control={<Radio size="small" />}
                  label={item.name}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </section>
        <Divider />
        <section>
          <FormControl>
            <FormLabel
              sx={{
                fontSize: "15px",
                fontWeight: "bold",
                pb: "14px",
                color: teal[400],
              }}
              className="text-2xl font-semibold"
              id="discount"
            >
              Discount
            </FormLabel>
            <RadioGroup
              name="discount"
              onChange={updateFilterParams}
              aria-labelledby="discount"
              defaultValue=""
            >
              {discount.map((item) => (
                <FormControlLabel
                  key={item.name}
                  value={item.value}
                  control={<Radio size="small" />}
                  label={item.name}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </section>
      </div>
      {/* Show button with active filter count */}
      <Button
        variant="contained"
        color="primary"
        className="w-full mt-4"
        onClick={() => setShowSheet(false)} // Close the bottom sheet
      >
        Show Results ({getFilteredProductsCount()})
      </Button>
    </div>
  );
};

export default FilterSection;
