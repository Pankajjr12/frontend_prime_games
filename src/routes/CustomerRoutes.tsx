import React from "react";
import Auth from "../customer/pages/auth/Auth";
import { Route, Routes } from "react-router-dom";
import Navbar from "../customer/components/Navbar";
import SearchProducts from "../customer/pages/search/SearchProducts";
import Product from "../customer/pages/product/Product";
import ProductDetails from "../customer/pages/details/ProductDetails";
import { Reviews } from "@mui/icons-material";
import WritingReview from "../customer/pages/review/WritingReview";
import Cart from "../customer/pages/cart/Cart";
import Address from "../customer/pages/account/Address";
import Wishlist from "../customer/pages/wish/Wishlist";
import Home from "../customer/pages/Home";
import Account from "../customer/pages/account/Account";
import PaymentSuccessHandler from "../customer/pages/payment/PaymentSuccessHandler";
import NotFound from "../customer/pages/notFound/NotFound";

const CustomerRoutes = () => {
  return (
    <>
      <Routes>
    
        <Route path='/' element={<Home />} />
        {/* <Route path='/chat-bot' element={<ChatBot />} /> */}
        <Route path='/products/:categoryId' element={<Product />} />
        <Route path='/search-products' element={<SearchProducts />} />
        <Route path='/reviews/:productId' element={<Reviews />} />
        <Route path='/reviews/:productId/create' element={<WritingReview/>} />
        <Route path='/product-details/:categoryId/:name/:productId' element={<ProductDetails />} />
        <Route path='/cart' element={<Cart />} />

        <Route path='/wishlist' element={<Wishlist />} />
        <Route path='/checkout/address' element={<Address />} />
        <Route path='/account/*' element={<Account />} />
        <Route path='/login' element={<Auth/>} />
        <Route path='/payment-success/:orderId' element={<PaymentSuccessHandler/>} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
};

export default CustomerRoutes;
