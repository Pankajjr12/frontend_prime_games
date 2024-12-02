import React, { useState } from "react";
import SellerAccountForm from "./SellerAccountForm";
import SellerLoginForm from "./SellerLoginForm";
import { Button } from "@mui/material";

const BecomeSeller = () => {
  const [isLoginPage, setIsLoginPage] = useState(false);

  const handleShowPage = () => {
    setIsLoginPage(!isLoginPage);
  };

  return (
    <div className="grid md:gap-10 grid-cols-3 min-h-screen">
      <section className="lg:col-span-1 md:col-span-2 col-span-3 p-10 shadow-lg rounded-md">
        {!isLoginPage ? <SellerAccountForm /> : <SellerLoginForm />}
        <div className="mt-10 space-y-2">
          <h1 className="text-center text-sm font-medium">
            {isLoginPage && "Don't"} have account ?{" "}
          </h1>
          <Button
            onClick={() => setIsLoginPage(!isLoginPage)}
            fullWidth
            sx={{ py: "11px" }}
            variant="outlined"
          >
            {isLoginPage ? "Register" : "Login"}
          </Button>
        </div>
      </section>

      <section className="hidden md:col-span-1 md:flex  lg:col-span-2  justify-center items-center">
        <div className="lg:w-[70%] px-5 space-y-10">
            <div className="space-y-2 font-bold text-center">
                <p className="text-2xl">Join the Marketplace Revolution</p>
                <p className="text-lg text-teal-500"> Boost Your Sales Today</p>
            </div>
            <img className="" src={"https://images.hdqwalls.com/wallpapers/shadow-of-the-tomb-raider-hd-77.jpg"} alt="" />
        </div>

      </section>
    </div>
  );
};

export default BecomeSeller;
