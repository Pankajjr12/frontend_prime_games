import React from "react";
import { Route, Routes } from "react-router-dom";
import GridTable from "../admin/pages/Homepage/GridTable";

import ElectronicsTable from "../admin/pages/Homepage/ElectronicsTable";
import Deal from "../admin/pages/Homepage/Deal";

import Coupon from "../admin/pages/Homepage/Coupon";
import ShopByCategoryTable from "../admin/pages/Homepage/ShopByCategoryTable";
import CouponForm from "../admin/pages/Coupon/CouponForm";
import Auth from "../customer/pages/auth/Auth";

const AdminRoute = () => {
  return (
    <div>
      <Routes>
       
        <Route path="/coupon" element={<Coupon />} />
        <Route path="/add-coupon" element={<CouponForm />} />
        <Route path="/home-grid" element={<GridTable />} />
        <Route path="/electronics-category" element={<ElectronicsTable />} />
        <Route path="/shop-by-category" element={<ShopByCategoryTable />} />
        <Route path="/deals" element={<Deal />} />
       
      </Routes>
    </div>
  );
};

export default AdminRoute;
