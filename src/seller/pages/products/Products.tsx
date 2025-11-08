import React, { useEffect, useState } from "react";
import ProductsTable from "./ProductsTable";
import { CircularProgress } from "@mui/material";

const Products = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Scroll to top whenever this page opens
    window.scrollTo({ top: 0, behavior: "smooth" });

    // You can replace this timeout with API call if loading data
    setTimeout(() => setLoading(false), 600);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div>
      <ProductsTable />
    </div>
  );
};

export default Products;
