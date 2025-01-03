import { Divider } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../state/store";
import { sumCartItemMrpPrice, sumCartItemSellingPrice } from "../../../utils/sumCart";

const PricingCard = () => {
  const navigate = useNavigate();
  const { cart, auth } = useAppSelector((store) => store);
  
 
  return (
    <div>
      <div className="space-y-3 p-5">
        <div className="flex justify-between items-center">
          <span>Subtotal</span>
          <span>₹ {cart.cart?.totalMrpPrice.toLocaleString("en-IN")}</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Discount</span>
          <span>
            ₹{" "}
            {sumCartItemMrpPrice(cart.cart?.cartItems || []) -
              sumCartItemSellingPrice(cart.cart?.cartItems || [])}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span>Shipping</span>
          <span>₹ 55</span>
        </div>
        <div className="flex justify-between items-center">
          <span>platform fee</span>
          <span className="text-teal-600">Free</span>
        </div>
      </div>
      <Divider />

      <div className="font-medium px-5 py-2 flex justify-between items-center">
        <span>Total</span>
        <span>₹ {cart.cart?.totalSellingPrice.toLocaleString("en-IN")}</span>
      </div>
    </div>
  );
};

export default PricingCard;
