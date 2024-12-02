import React from "react";
import {
  Alert,
  Button,
  CircularProgress,
  Snackbar,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";

const SellerLoginForm = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      otp: "",
    },

    onSubmit: (values: any) => {
      // Handle form submission

      console.log("Form data:", values);
    },
  });
  return (
    <div>
      <h1 className="text-center font-bold text-xl text-primary-color pb-5">
        Login As Seller
      </h1>
      <div className="space-y-5">
        <TextField
          fullWidth
          name="email"
          label="Enter Your Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={
            formik.touched.email ? (formik.errors.email as string) : undefined
          }
        />

        {true && (
          <div className="space-y-2">
            <TextField
              fullWidth
              name="otp"
              label="Otp"
              value={formik.values.otp}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.otp && Boolean(formik.errors.otp)}
              helperText={
                formik.touched.otp ? (formik.errors.otp as string) : undefined
              }
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerLoginForm;
