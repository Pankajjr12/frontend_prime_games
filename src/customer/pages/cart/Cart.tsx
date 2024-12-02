import React from "react";
import CartItem from "./CartItem";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { teal } from "@mui/material/colors";
import { TextField, Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PricingCard from "./PricingCard";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const handleChange = () => {};
  const navigate = useNavigate()
  return (
    <div className="pt-10 px-5 sm:px-10 md:px-60 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="cartItem lg:col-span-2 space-y-3">
          {[1, 1, 1, 1, 1, 2].map((item) => (
            <CartItem />
          ))}
        </div>
        <div className="col-span-1 text-sm space-y-3">
          <div className="border rounded-md px-5 py-3 space-y-5">
            <div className="flex gap-3 text-sm items-center">
              <div>
                <LocalOfferIcon sx={{ color: "#800011", fontSize: "16px" }} />
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
                  <span className="font-bold text-primary-color">Applied</span>
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
              <Button fullWidth onClick={()=>navigate('/checkout')} variant="contained" sx={{ py: "10px" }}>
                Buy now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
