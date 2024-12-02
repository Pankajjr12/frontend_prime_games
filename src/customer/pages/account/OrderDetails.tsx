import { Box, Button, Divider } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import OrderStepper from "./OrderStepper";
import CreditCardIcon from "@mui/icons-material/CreditCard";

const OrderDetails = () => {
  const navigate = useNavigate();
  return (
    <Box className="space-y-5">
      <section className="flex flex-col gap-5 justify-center items-center">
        <img
          className="w-[140px] h-[100px]"
          src="https://imagesv2.desimartini.com/images/202410/alia-bhatt-1729836640.jpeg"
          alt=""
        />
        <div className="text-sm space-y-1 text-center">
          <h1 className="font-bold">{"Creed"}</h1>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem
            officia porro temporibus optio iste nulla laboriosam dolor.
          </p>
          <p>
            <strong>Size : </strong>Ubisoft
          </p>
        </div>
        <div className="hover:font-bold">
          <Button onClick={() => navigate(`/reviews/${5}/create`)}>
            Write Review
          </Button>
        </div>
      </section>

      <section className="border p-5">
        <OrderStepper orderStatus={"SHIPPED"} />
      </section>

      <div className="border p-5">
        <h1 className="font-bold pb-3">Delivery Address</h1>
        <div className="text-sm space-y-2">
          <div className="flex gap-5 font-medium">
            <p>{"Pankaj"}</p>
            <Divider flexItem orientation="vertical" />
            <p>{"987656786"}</p>
          </div>
          <p>asdfsdfsfsfgfgfsdf</p>
        </div>
      </div>
      <div className="border space-y-4">
        <div className="flex justify-between text-sm pt-5 px-5">
          <div className="space-y-1">
            <p className="font-bold">Total Item Price</p>
            <p>
              You saved{" "}
              <span className="text-primary-color font-medium text-xs">
                Rs {499}.000
              </span>{" "}
              on this item
            </p>
          </div>
          <p className="font-medium">Rs {799}.00</p>
        </div>

        <div className="px-5">
          <div className="bg-slate-50 px-5 py-2 text-xs font-medium flex items-center gap-3">
            <CreditCardIcon />
            <p className="text-black">Pay On Delivery</p>
          </div>
        </div>

        <Divider />

        <div className="px-5 pb-5">
          <p className="text-xs">
            <strong>Sold by : </strong>
            {"Creed"}
          </p>
        </div>

        <div className="p-10">
          <Button
            disabled={true}
            color="error"
            sx={{ py: "0.7rem" }}
            fullWidth
            className=""
            variant="contained"
          >
            {true ? "order cancelled" : "Cancel Order"}
          </Button>
        </div>
      </div>
    </Box>
  );
};

export default OrderDetails;
