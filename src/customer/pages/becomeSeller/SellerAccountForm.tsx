import React, { useState } from "react";
import {
  Button,
  CircularProgress,
  Step,
  StepLabel,
  Stepper,
} from "@mui/material";
import BecomeSellerFormStep1 from "./BecomeSellerFormStep1";
import BecomeSellerFormStep2 from "./BecomeSellerFormStep2";
import BecomeSellerFormStep3 from "./BecomeSellerFormStep3";
import BecomeSellerFormStep4 from "./BecomeSellerFormStep4";
import { useFormik } from "formik";

const steps = [
  "Tax Details & Mobile",
  "Pickup Address",
  "Bank Details",
  "Supplier Details",
];
const SellerAccountForm = () => {
  const [activeStep, setActiveStep] = useState(0);

  const [otp, setOpt] = useState<any>();

  const handleStep = (value: number) => {
    (activeStep < steps.length - 1 || (activeStep > 0 && value == -1)) &&
      setActiveStep(activeStep + value);
    activeStep === steps.length - 1 && handleCreateAccount();
  };

  const handleOtpChange = (otpValue: string) => {
    setOpt(otpValue);
    console.log(otpValue);
    // formik.setFieldValue("opt",otpValue)
  };

  const formik = useFormik({
    initialValues: {
      mobile: "",
      otp: "",
      gstin: "",
      pickupAddress: {
        name: "",
        mobile: "",
        pincode: "",
        address: "",
        locality: "",
        city: "",
        state: "",
      },
      bankDetails: {
        accountNumber: "",
        ifscCode: "",
        accountHolderName: "",
      },
      sellerName: "",
      email: "",
      businessDetails: {
        businessName: "",
        businessEmail: "",
        businessMobile: "",
        logo: "",
        banner: "",
        businessAddress: "",
      },
      password: "",
    },
    // validationSchema: FormSchema,
    onSubmit: (values) => {
      console.log(values, "formik submitted");
      console.log("active step ", activeStep);
    },
  });

  const handleCreateAccount = () => {
    console.log("create account");
  };

  return (
    <div>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <section>
        <div className="mt-20 space-y-10">
          <div>
            {activeStep === 0 ? (
              <BecomeSellerFormStep1
                formik={formik}
                handleOtpChange={handleOtpChange}
              />
            ) : activeStep === 1 ? (
              <BecomeSellerFormStep2 formik={formik} />
            ) : activeStep === 2 ? (
              <BecomeSellerFormStep3 formik={formik} />
            ) : (
              <BecomeSellerFormStep4 formik={formik} />
            )}
          </div>

          <div className="flex items-center justify-between ">
            <Button
              disabled={activeStep === 0}
              onClick={() => handleStep(-1)}
              variant="contained"
            >
              Back
            </Button>
            <Button onClick={() => handleStep(1)} variant="contained">
              {activeStep == steps.length - 1 ? "Create account" : "continue"}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SellerAccountForm;
