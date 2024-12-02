import { Divider } from "@mui/material";
import React from "react";

const PricingCard = () => {
  return (
    <>
      <div className="space-y-5 p-5">
        <div className="flex justify-between items-center">
          <span>Subtotal</span>
          <span>Rs. 899</span>
        </div>

        <div className="flex justify-between items-center">
          <span>Discount</span>
          <span>Rs. 699</span>
        </div>

        <div className="flex justify-between items-center">
          <span>Shipping</span>
          <span>Rs. 90</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Platform</span>
          <span className="text-primary-color font-medium">Free</span>
        </div>
      </div>
      <Divider />

      <div className="flex justify-between items-center p-5">
        <span>Total</span>
        <span className="text-primary-color font-medium">989</span>
      </div>
    </>
  );
};

export default PricingCard;
