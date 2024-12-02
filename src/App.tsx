import React from "react";
import Navbar from "./customer/components/Navbar";
import customTheme from "./Theme/useCustomTheme";
import Home from "./customer/pages/Home";
import Product from "./customer/pages/product/Product";
import ProductDetails from "./customer/pages/details/ProductDetails";
import Review from "./customer/pages/review/Review";
import Cart from "./customer/pages/cart/Cart";
import CheckoutPage from "./customer/pages/checkout/CheckoutPage";
import Account from "./customer/pages/account/Account";
import { Route, Routes } from "react-router-dom";
import Gallery from "./customer/pages/gallery/Gallery";
import BecomeSeller from "./customer/pages/becomeSeller/BecomeSeller";
import SellerDashboard from "./seller/pages/sellerDashboard/SellerDashboard";
import AdminDashboard from "./admin/pages/Dashboard/AdminDashboard";



function App() {
  return (
 
      <div>
        <Navbar />
   

        {/* <Account /> */}

        <Routes>
          <Route path="/" element={<Home />}  />
          <Route path="/products/:categoryId" element={<Product />}  />
          <Route path="/product-details/:categoryId/:name/:productId" element={<ProductDetails />}  />
          <Route path="/reviews/:productId" element={<Review  />}  />
          <Route path="/cart" element={<Cart />}  />
          <Route path="/checkout" element={<CheckoutPage  />}  />
          <Route path="/account/*" element={<Account  />}  />
          <Route path="/gallery" element={<Gallery  />}  />
          <Route path="/become-seller" element={<BecomeSeller  />}  />
          <Route path="/seller/*" element={<SellerDashboard  />}  />
          <Route path="/admin/*" element={<AdminDashboard  />}  />
          
    
        </Routes>
      </div>
  );
}

export default App;
