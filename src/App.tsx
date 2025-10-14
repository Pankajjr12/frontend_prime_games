import React, { useEffect } from "react";
import Navbar from "./customer/components/Navbar";
import customTheme from "./Theme/useCustomTheme";
import Home from "./customer/pages/Home";
import Product from "./customer/pages/product/Product";
import ProductDetails from "./customer/pages/details/ProductDetails";
import Review from "./customer/pages/review/WritingReview";
import Cart from "./customer/pages/cart/Cart";
import CheckoutPage from "./customer/pages/checkout/CheckoutPage";
import Account from "./customer/pages/account/Account";
import { Route, Routes, useNavigate } from "react-router-dom";
import Gallery from "./customer/pages/gallery/Gallery";
import BecomeSeller from "./customer/pages/becomeSeller/BecomeSeller";
import SellerDashboard from "./seller/pages/sellerDashboard/SellerDashboard";
import AdminDashboard from "./admin/pages/Dashboard/AdminDashboard";
import { ThemeProvider } from "@emotion/react";
import { useAppDispatch, useAppSelector } from "./state/store";
import { fetchSellerProfile } from "./state/Seller/sellerSlice";
import CustomerRoutes from "./routes/CustomerRoutes";
import { fetchUserProfile } from "./state/Customer/userSlice";
import { createHomeCategories, fetchHomePageData } from "./state/Customer/homeSlice";

function App() {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);
const sellerAuth = useAppSelector((state) => state.sellerAuth);
const sellers = useAppSelector((state) => state.sellers);
const user = useAppSelector((state) => state.user);

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      dispatch(fetchUserProfile({jwt:localStorage.getItem("jwt") || auth.jwt || "",navigate}));
      dispatch(fetchSellerProfile(localStorage.getItem("jwt") || sellerAuth.jwt))
    }

  }, [auth.jwt, sellerAuth.jwt])

  useEffect(() => {
    // dispatch(createHomeCategories(homeCategories))
    dispatch(fetchHomePageData())
  }, [dispatch])

  return (
    <div>
      <ThemeProvider theme={customTheme}>
        <Navbar />

        {/* <Account /> */}

        <Routes>

        {sellers.profile && <Route path='/seller/*' element={<SellerDashboard />} />}
          <Route path="/" element={<Home />} />
          <Route path="/products/:categoryId" element={<Product />} />
          <Route
            path="/product-details/:categoryId/:name/:productId"
            element={<ProductDetails />}
          />
          <Route path="/reviews/:productId" element={<Review />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/account/*" element={<Account />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/become-seller" element={<BecomeSeller />} />
     
          <Route path="/admin/*" element={<AdminDashboard />} />
          <Route path="*" element={<CustomerRoutes />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
