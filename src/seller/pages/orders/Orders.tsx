import React, { useEffect, useState } from "react";
import OrdersTable from "./OrdersTable";
import { CircularProgress } from "@mui/material";

const Orders = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Scroll to top when Orders page loads
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Simulate loading delay (replace with API loading if needed)
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
      <OrdersTable />
    </div>
  );
};

export default Orders;
