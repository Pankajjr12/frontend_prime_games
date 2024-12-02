import React, { useState } from "react";
import { Button, Modal } from "@mui/material";
import AddressCard from "./AddressCard";
import Box from "@mui/material/Box";
import AddressForm from "./AddressForm";
import PricingCard from "../cart/PricingCard";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import razorImage from "../../../assests/razor.jpg";
import stripeImage from "../../../assests/strp.jpg";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const paymentGatewayList = [
  {
    value: "RAZORPAY",
    image: razorImage,
    label: "",
  },
  {
    value: "STRIPE",
    image: stripeImage,
    label: "",
  },
];
const CheckoutPage = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [paymentGateway,setPaymentGateway] = useState("RAZORPAY")

  const handlePaymentChange = (e:any) => {
    setPaymentGateway(e.target.value)
  }
  return (
    <>
      <div className="pt-10 px-5 sm:px-10 md:px-44 lg:px-60 min-h-screen">
        <div className="space-y-5 lg:space-x-0 lg:grid grid-cols-3 lg:gap-9">
          <div className="col-span-2 space-y-5">
            <div className="flex justify-between items-center">
              <h1 className="font-semibold">Select Address</h1>
              <Button onClick={handleOpen} className="font-semibold">
                Add New Address
              </Button>
            </div>

            <div className="text-xs font-medium space-y-5">
              <p>Saved Addresses</p>
              <div className="space-y-3">
                {[1, 2, 3].map((item) => (
                  <AddressCard />
                ))}
              </div>
            </div>

            <div className="py-4 px-5 rounded-md border">
              <Button onClick={handleOpen} className="font-semibold">
                Add New Address
              </Button>
            </div>
          </div>
          <div>
            <div>
              <div className="p-5 space-y-3 rounded-md">
                <h1 className="font-medium pb-2 text-center">Choose Payment Gateway</h1>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  className="flex justify-between pr-0"
                  onChange={handlePaymentChange}
                  value={paymentGateway}
                >
                  {paymentGatewayList.map((item) => (
                    <FormControlLabel
                      className="border w-[45%] pr-2 rounded-md flex justify-center"
                      value={item.value}
                      control={<Radio />}
                      label={
                        <img
                          className={`${item.value == "stripe" ? "w-14" : ""}`}
                          src={item.image}
                          alt={item.label}
                        />
                      }
                    />
                  ))}
                </RadioGroup>
              </div>
            </div>
            <div className="border rounded-md">
              <PricingCard />

              <div className="p-5">
                <Button fullWidth variant="contained" sx={{ py: "10px" }}>
                  Checkout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <AddressForm />
        </Box>
      </Modal>
    </>
  );
};

export default CheckoutPage;