import React, { useEffect, useState } from "react";

import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { teal } from "@mui/material/colors";
import { TextField, Button, IconButton, Snackbar, Alert } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PricingCard from "./PricingCard";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../state/store";
import { fetchUserCart } from "../../../state/Customer/cartSlice";
import { CartItem } from "../../../types/cartTypes";
import CartItemCard from "./CartItemCard";
import { applyCoupon } from "../../../state/Customer/couponSlice";

const Cart = () => {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { cart, auth, coupon } = useAppSelector((store) => store);
  const [couponCode, setCouponCode] = useState("");
  const [snackbarOpen, setOpenSnackbar] = useState(false);

  useEffect(() => {
    dispatch(fetchUserCart(localStorage.getItem("jwt") || ""));
  }, [auth.jwt]);

  const handleChange = (e: any) => {
    setCouponCode(e.target.value);
  };

  const handleApllyCoupon = (apply: string) => {
    // console.log(couponCode,apply)

    var code = couponCode;

    if (apply == "false") {
      code = cart.cart?.couponCode || "";
    }

    dispatch(
      applyCoupon({
        apply,
        code,
        orderValue: cart.cart?.totalSellingPrice || 100,
        jwt: localStorage.getItem("jwt") || "",
      })
    );
  };
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  useEffect(() => {
    if (coupon.couponApplied || coupon.error) {
      setOpenSnackbar(true);
      setCouponCode("");
    }
  }, [coupon.couponApplied, coupon.error]);

  console.log("cart ", coupon);

  return (
    <>
      {cart.cart && cart.cart?.cartItems.length !== 0 ? (
        <div className="pt-10 px-5 sm:px-10 md:px-60 min-h-screen">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="cartItem lg:col-span-2 space-y-3">
              {cart.cart?.cartItems.map((item: CartItem) => (
                <CartItemCard key={item.id} item={item} />
              ))}
            </div>
            <div className="col-span-1 text-sm space-y-3">
              <div className="border rounded-md px-5 py-3 space-y-5">
                <div className="flex gap-3 text-sm items-center">
                  <div>
                    <LocalOfferIcon
                      sx={{ color: "#800011", fontSize: "16px" }}
                    />
                  </div>
                  <span>Apply Coupons</span>
                </div>

                {true ? (
                  <div className="flex justify-between items-center">
                    <TextField
                      onChange={handleChange}
                      id="outlined-basic"
                      placeholder="Coupon code"
                      size="small"
                      variant="outlined"
                    />
                    <Button sx={{ backgroundColor: "primary" }}>Apply</Button>
                  </div>
                ) : (
                  <div className="flex">
                    <div className="p-1 pl-5 pr-3 border rounded-md flex gap-2 items-center">
                      <span className="font-bold text-primary-color">
                        Applied
                      </span>
                      <IconButton>
                        <CloseIcon />
                      </IconButton>
                    </div>
                  </div>
                )}
              </div>

              <div className="border rounded-md">
                <PricingCard />

                <div className="p-5">
                  <Button
                    fullWidth
                    onClick={() => navigate("/checkout")}
                    variant="contained"
                    sx={{ py: "10px" }}
                  >
                    Buy now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-[85vh] flex justify-center items-center flex-col">
          <div className="text-center py-5">
            <h1 className="text-lg font-medium">hay its feels so light!</h1>
            <p className="text-gray-500 text-sm">
              there is nothing in your bag, lets add some items
            </p>
          </div>
          <Button variant="outlined" sx={{ py: "11px" }}>
            Add Item From Wishlist
          </Button>
        </div>
      )}

<Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={coupon.error ? "error" : "success"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {coupon.error ? coupon.error : "Coupon Applied successfully"}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Cart;
