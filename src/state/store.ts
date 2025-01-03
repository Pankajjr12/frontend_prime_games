import {
    configureStore,
    combineReducers,
} from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { thunk } from "redux-thunk";
import sellerSlice from "./Seller/sellerSlice";
import sellerAuthenticationSlice from "./Seller/sellerAuthenticationSlice";
import sellerProductSlice from "./Seller/sellerProductSlice";
import authSlice from "./Customer/authSlice";
import productSlice from "./Customer/productSlice";
import cartSlice from "./Customer/cartSlice";
import userSlice from "./Customer/userSlice";
import homeSlice from "./Customer/homeSlice";
import dealSlice from "./Admin/dealSlice";
import reviewSlice from './Customer/reviewSlice'
import wishlistSlice from './Customer/wishlistSlice'
import orderSlice from './Customer/orderSlice'
import chatSlice from './Customer/chatSlice'
import couponSlice from './Customer/couponSlice'
import sellerOrderSlice from './Seller/sellerOrderSlice'
import transactionSlice from './Seller/transactionSlice'
import revenueChartSlice from './Seller/revenueChartSlice'
import adminCouponSlice from './Admin/adminCouponSlice'
import adminSlice from './Admin/adminSlice'

const rootReducer = combineReducers({
    // customer
    auth: authSlice,
    products: productSlice,
    user:userSlice,
    homePage:homeSlice,
    review: reviewSlice,
    wishlist: wishlistSlice,
    cart: cartSlice,
    coupon: couponSlice,
    orders: orderSlice,
    aiChatBot: chatSlice,
    // seller
    sellers: sellerSlice,
    sellerAuth: sellerAuthenticationSlice,
    sellerProduct: sellerProductSlice,
    sellerOrder: sellerOrderSlice,
    transaction: transactionSlice,
    revenueChart: revenueChartSlice,

    //cart
    adminCoupon:adminCouponSlice,
    admin:adminSlice,
    deal:dealSlice,
})

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;